<?php

namespace App\Http\Controllers\Administrator;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdministratorController extends Controller
{
    public function index(Request $request)
    {
        $data['stats'] = [
            'posts' => Post::count(), 'comments' => Comment::count(), 'users' => User::count(), 'appointments' => Appointment::count()
        ];
        $data['engagements'] = [
            "posts" => Post::select('user_id', DB::raw("count(*) as total"))->withOut(['likes'])->groupBy("user_id")->orderBy('total', 'DESC')->limit(10)->get(),
            "comments" => Comment::select('user_id', DB::raw("count(*) as total"))->withOut(['likes'])->groupBy("user_id")->orderBy('total', 'DESC')->limit(10)->get(),
            "invited" => User::select('firstname', 'lastname', 'slug', 'avatar', 'id', 'invited_by', DB::raw("count(*) as total"))->groupBy("invited_by")->orderBy('total', 'DESC')->limit(5)->get()->toArray()
        ];

        $data['title'] = "Dashboard";
        return inertia("Admin/Dashboard", $data);
    }
}
