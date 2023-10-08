<?php

namespace App\Http\Controllers;

use App\Models\UserEducation;
use Illuminate\Http\Request;

class UserEducationController extends Controller
{
    public function index(Request $request, $slug)
    {
        $data['educations'] = UserEducation::join('users', 'users.id', '=', 'user_education.user_id')->where('users.slug', $slug)->select('user_education.*')->get();
        return inertia("Profile/Education", $data);
    }
    public function create()
    {
        $data['title'] = "Add Education";
        return inertia("Profile/EducationForm", $data);
    }
    public function edit(Request $request, $id)
    {
        $data['education'] = UserEducation::where(['user_id' => $request->user()->id, 'id' => $id])->firstOrFail();
        $data['title'] = "Edit Education";
        return inertia("Profile/EducationForm", $data);
    }
    public function save(Request $request)
    {
        if ($request->id) {
            UserEducation::where('id', $request->id)->update($request->post());
        } else {
            UserEducation::create($request->post());
        }
        return to_route('profile.education', $request->user()->slug);
    }

    public function destroy(Request $request)
    {
        UserEducation::where('id', $request->id)->delete();
        return to_route('profile.education', $request->user()->slug);
    }
}
