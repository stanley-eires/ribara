<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function show(Request $request)
    {
        return (Like::join('users', 'users.id', 'likes.user_id')->select('reaction', 'firstname', 'lastname', 'avatar', 'headline', 'slug')->where($request->input())->get());
    }

    public function store(Request $request)
    {
        Like::create($request->post());
        return back()->with('message', ['status' => 'info', 'content' => 'You reacted to content']);
    }
    public function destroy(Request $request)
    {
        Like::where($request->post())->delete();
        return back()->with('message', ['status' => 'info', 'content' => 'Reaction removed']);;
    }
}
