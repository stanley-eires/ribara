<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request, $tab = 'people')
    {
        $keyword = $request->get('q');
        if ($tab == 'people') {
            return User::select('firstname', 'lastname', 'slug', 'avatar', 'id')->where("firstname", 'like', "%{$keyword}%")->orWhere("lastname", 'like', "%{$keyword}%")->limit(7)->get();
        }
    }

    public function searchResult(Request $request, $tab = 'top')
    {
        $keyword = $request->get('q');
        $data['tab'] = $tab;
        $data['keyword'] = $keyword;
        $people = User::select('firstname', 'lastname', 'slug', 'avatar', 'id', 'headline')->where("firstname", 'like', "%{$keyword}%")->orWhere("lastname", 'like', "%{$keyword}%");
        $posts = Post::where(fn ($query) => $query->where("content", 'like', "%{$keyword}%"));

        if ($tab == 'people') {
            $data['people'] = $people->with('connections')->orderBy('firstname')->paginate(12)->withQueryString();
            if ($request->hasHeader('via-axios')) {
                return $data['people'];
            }
        } elseif ($tab == 'posts') {
            $data['posts'] = $posts->withCount('comments')->latest()->paginate(12)->withQueryString();
            if ($request->hasHeader('via-axios')) {
                return $data['posts'];
            }
        } else {
            $data['people'] = $people->inRandomOrder()->limit(7)->get();
            $data['posts'] = Post::join('users', 'users.id', 'posts.user_id')->where(fn ($query) => $query->where("users.firstname", 'like', "%{$keyword}"))->orWhere("users.lastname", 'like', "%{$keyword}")->withCount('comments')->latest()->limit(10)->get();
        }
        $data['title'] = "Search results";
        return inertia("Search", $data);
    }

    // public function people(Request $request, $isAjax = false)
    // {
    //     $data['users'] = User::select('slug', 'firstname', 'lastname', 'avatar', 'headline', 'id')->with('connections')->where('users.id', '!=', $request->user()->id)->orderBy('firstname')->paginate(12);
    //     $data['title'] = "Search Results (People)";
    //     if ($isAjax) {
    //         return $data['users'];
    //     }
    //     return inertia('People', $data);
    // }
}
