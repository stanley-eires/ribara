<?php

namespace App\Http\Controllers;

use App\Models\UserExperience;
use Illuminate\Http\Request;

class UserExperienceController extends Controller
{
    public function index(Request $request, $slug)
    {
        $data['experiences'] = UserExperience::join('users', 'users.id', '=', 'user_experiences.user_id')->where('users.slug', $slug)->select('user_experiences.*')->get();
        return inertia("Profile/Experience", $data);
    }
    public function create()
    {
        $data['title'] = "Add Experience";
        return inertia("Profile/ExperienceForm", $data);
    }
    public function edit(Request $request, $id)
    {
        $data['experience'] = UserExperience::where(['user_id' => $request->user()->id, 'id' => $id])->firstOrFail();
        $data['title'] = "Edit Experience";
        return inertia("Profile/ExperienceForm", $data);
    }
    public function save(Request $request)
    {
        if ($request->id) {
            UserExperience::where('id', $request->id)->update($request->post());
        } else {
            UserExperience::create($request->post());
        }
        return to_route('profile.experience', $request->user()->slug);
    }
    public function destroy(Request $request)
    {
        UserExperience::where('id', $request->id)->delete();
        return to_route('profile.experience', $request->user()->slug);
    }
}
