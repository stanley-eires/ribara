<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FeedController extends Controller
{
    public function index(Request $request, $isAjax = false)
    {
        $post = Post::join('users', 'users.id', '=', 'posts.user_id');
        $stream = $request->get('stream', 'network');
        if ($stream == 'author' && $request->get('author')) {
            $post = $post->where('users.slug', $request->get('author'));
        } elseif ($stream == 'promoted') {
            $post = $post->where('is_promoted', 1);
        } else {
            $post = $post->whereIn(
                'posts.user_id',
                User::userConnectedFriends($request->user()->id)->pluck('id')
            )
                ->orWhere(
                    'posts.user_id',
                    $request->user()->id
                );
        }
        $post = $post->withCount('comments')->latest()->paginate(10)->withQueryString();

        $data['posts'] = $post;
        if ($request->hasHeader('via-axios')) {
            return $data['posts'];
        }
        $data['stream'] = $stream;
        return inertia('Dashboard', $data);
    }
}
