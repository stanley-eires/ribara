<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Connection;
use App\Models\Post;
use App\Models\User;
use App\Models\UserEducation;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

    public function index(Request $request, $slug, $page = null)
    {
        $data['user'] = User::where('slug', $slug);
        $data['page'] = $page;
        if ($page) {
            if ($page == 'connections') {
                $stream = $request->get('stream');
                $data['user'] = $data['user']->firstOrFail();
                if ($stream) {
                    if ($stream == 'mentor') {
                        $data['user']->connections =  User::mentors($data['user']->id);
                    } elseif ($stream == 'protege') {
                        $data['user']->connections =  User::proteges($data['user']->id);
                    } elseif ($stream == 'peer') {
                        $data['user']->connections =  User::peers($data['user']->id);
                    } else {
                        $data['user']->connections =  User::userConnectedFriends($data['user']->id);
                    }
                } else {
                    $data['user']->connections =  User::userConnectedFriends($data['user']->id);
                }
                $data['stream'] = $stream;
                $data['stats'] = User::connectionStats($data['user']->id);
            } elseif ($page == 'schedule') {
                $data['user'] = $data['user']->firstOrFail();
            }
        } else {
            $data['user'] = $data['user']->with('education', 'experience', 'certification')->firstOrFail();
            $data['user']->post = Post::join('users', 'users.id', '=', 'posts.user_id')->withCount('comments')->where(['user_id' => $data['user']->id])->latest()->paginate(10)->withQueryString();
            if ($request->hasHeader('via-axios')) {
                return $data['user']->post;
            }
            $connections = User::userConnectedFriends($data['user']->id)->slice(0, 6);
            $data['user']->connections = $connections;
            $data['title'] =  $data['user']->fullname;
        }

        $data['user']->connection_stats = User::connectionStats($data['user']->id, ['mentor', 'protege', 'peer']);
        return Inertia::render('Profile/Index', $data);
    }
    /**
     * Display the user's profile form.
     */

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        $request->user()->fill($request->post());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        if ($request->user()->isDirty('phone')) {
            $request->user()->phone_verified_at = null;
        }

        $request->user()->save();

        return back();
    }
    public function updateAvatar(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'avatar' => 'required|mimes:jpg,png,jpeg|max:5000',
        ]);
        $image = $request->file('avatar');
        $imagename = $user->slug . '.' . $image->getClientOriginalExtension();
        $img = \Intervention\Image\Facades\Image::make($image->getRealPath());
        $destinationPath = 'assets/images/avatars';
        $img->fit(300, 300)->save($destinationPath . '/'  . $imagename, 50, 'JPEG');
        $avatar = '/' . $destinationPath . '/' . $imagename;
        User::where('id', $user->id)->update([
            'avatar' => $avatar
        ]);
        return back();
    }

    public function removeAvatar(Request $request)
    {
        @unlink(public_path($request->avatar));
        User::where('id', $request->user()->id)->update(["avatar" => null]);
        return back();
    }
}
