<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Notifications\AppNotification;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function show(Request $request)
    {

        return (Comment::with('user')->withCount('replies')->where($request->input())->latest()->get()->reverse()->values());
    }

    public function store(Request $request)
    {
        $post = $request->post();
        if ($request->commentmeta && $request->commentmeta['type'] == 'image') {
            $post['commentmeta']['url'] =  (function ($file) {
                $imagename = str()->random(10) . '.' . $file->getClientOriginalExtension();
                $img = \Intervention\Image\Facades\Image::make($file->getRealPath());
                $destinationPath = 'assets/images/posts';
                $img->save($destinationPath . '/'  . $imagename, 50, 'JPEG');
                return  '/' . $destinationPath . '/' . $imagename;
            })($request->commentmeta['url']);
        }
        Comment::create($post);
        $post_author = Post::findOrFail($request->commentable_id)->user;
        if ($post_author->id != $request->user()->id) {
            $user_link = "/{$request->user()->slug}";
            $post_link = "/post/{$request->post_id}";
            $post_author->notify(new AppNotification([
                'image' => $request->user()->avatar,
                'content' => "<a href='$user_link' class='fw-bold text-dark'>{$request->user()->fullname}</a> commented <a href='$post_link' class='text-muted'><span class='text-decoration-none'>on your post</span></a>"
            ]));
        }
        return back()->with("message", ['status' => 'success', 'content' => 'Comment posted']);
    }

    public function destroy(Request $request)
    {
        $comment = Comment::select('id', 'commentmeta', 'content')->withOut(['user', 'likes', 'replies'])->findOrFail($request->id);
        if ($comment->commentmeta && $comment->commentmeta['type'] == 'image' && $comment->commentmeta['url']) {
            @unlink(public_path($comment->commentmeta['url']));
        }
        $comment->delete();
        return back()->with("message", ['status' => 'success', 'content' => 'Comment removed']);
    }

    public function update(Request $request)
    {
        Comment::where('id', $request->id)->update($request->post());
        return back();
    }

    public function likeOrDislikeComment(Request $request)
    {
        $inp = collect($request->post())->merge(['likeable_type' => 'App\Models\Comment']);

        $opposite_reaction = $request->reaction == 'like' ? 'dislike' : 'like';
        $input2 = $inp->merge(['reaction' => $opposite_reaction, 'likeable_type' => 'App\Models\Comment'])->toArray();
        $comment = Like::where($inp->toArray())->count();
        if ($comment) {
            Like::where($inp->toArray())->delete();
        } else {
            Like::where($input2)->delete();
            Like::create($inp->toArray());
        }
        return back();
    }

    public function reply(Request $request)
    {
        Comment::create($request->post());
        return back();
    }
}
