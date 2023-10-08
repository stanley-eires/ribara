<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Connection;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use App\Notifications\AppNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class PostController extends Controller
{

    public function show($id)
    {
        $data['post'] = Post::withCount('comments')->findOrFail($id);
        $data['comments'] = $data['post']->comments()->withCount('replies')->latest()->paginate(20);
        return inertia('Feeds/Post', $data);
    }
    public function edit(Request $request, $id)
    {
        $data['post'] = Post::select('id', 'content', 'postmeta', 'type', 'audience')->withOut(['user', 'likes'])->where(['id' => $id, 'user_id' => $request->user()->id])->firstOrFail();
        return inertia('Feeds/PostEdit', $data);
    }
    public function update(Request $request)
    {
        $post = $request->except(['_method']);
        if ($request->post('type') == 'post' && $request->postmeta['type'] == 'image') {
            $images = [];
            foreach ($request->postmeta['images'] as $file) {
                if (gettype($file) == 'object') {
                    $images[] = $this->_savePostAttachments($file);
                } else {
                    $images[] = $file;
                }
            }
            $post['postmeta']['images'] = $images;
        }
        Post::where('id', $request->id)->update($post);
        return to_route('post.show', ['id' => $request->id])->with("message", ['status' => 'success', 'content' => 'Updated Successful']);
    }

    public function simpleUpdate(Request $request)
    {
        Post::where('id', $request->id)->update($request->post());
        return back()->with("message", ['status' => 'success', 'content' => 'Update Successful']);
    }

    public function save(Request $request)
    {
        $post = $request->post();
        if ($request->post('type') == 'post' && $request->postmeta['type'] == 'image' && !empty($request->postmeta['images'])) {
            $images = [];
            foreach ($request->postmeta['images'] as $file) {
                $images[] = $this->_savePostAttachments($file);
            }
            $post['postmeta']['images'] = $images;
        }
        $post['user_id'] = $request->user()->id;
        $post = Post::create($post);
        $user_link = route("profile.index", $request->user()->slug);
        $post_link = route("post.show", ['id' => $post->id]);
        $connections = User::userConnectedFriends($request->user()->id);
        DB::table('notifications')->insert($connections->pluck('id')
            ->map(
                fn ($item) => [
                    'id' =>  (string) str()->uuid(),
                    'type' => "App\Notifications\AppNotification",
                    'notifiable_type' => 'App\Models\User',
                    'notifiable_id' => $item,
                    'data' => json_encode([
                        'image' => $request->user()->avatar,
                        'content' => "<a href='$user_link' class='fw-bold text-dark'>{$request->user()->fullname}</a> added a new <a href='$post_link' class='text-muted'>{$post->type}</a>"
                    ]),
                    'created_at' => now()->toDateTimeString(),
                    'updated_at' => now()->toDateTimeString()
                ]
            )->toArray());
        foreach ($connections->pluck('email')->toArray() as $email) {
            Notification::route('mail', $email)
                ->notify(new AppNotification(mail: [
                    'subject' => "New Post from {$request->user()->fullname}",
                    'message' => "Your connection: <a href='$user_link' class='fw-bold text-dark'>{$request->user()->fullname}</a> just added a new <a href='$post_link' class='text-muted'>{$post->type}</a>"
                ]));
        }
        return back()->with('message', ['content' => "Posted Successfully", 'status' => 'success']);
    }

    public function _savePostAttachments($file)
    {
        $imagename = str()->random(10) . '.' . $file->getClientOriginalExtension();
        $img = \Intervention\Image\Facades\Image::make($file->getRealPath());
        $destinationPath = 'assets/images/posts';
        $img->resize(600, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        })->save($destinationPath . '/'  . $imagename, 80, 'JPEG');
        return  '/' . $destinationPath . '/' . $imagename;
    }
    public function destroy(Request $request)
    {
        $post = Post::findOrFail($request->id);
        if ($post->type == 'post' && $post->postmeta['type'] == 'image' && !empty($post->postmeta['images'])) {
            foreach ($post->postmeta['images'] as $file) {
                @unlink(public_path($file));
            }
        }
        $post->delete();
        if ($request->return_path) {
            return to_route($request->return_path)->with('message', ['content' => "Post and related attachments removed", 'status' => 'success']);
        }
        return back()->with('message', ['content' => "Post and related attachments removed", 'status' => 'success']);
    }
}
