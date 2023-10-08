<?php

namespace App\Http\Controllers;

use App\Models\UserCertification;
use Illuminate\Http\Request;

class UserCertificationController extends Controller
{
    public function index(Request $request, $slug)
    {
        $data['certifications'] = UserCertification::join('users', 'users.id', '=', 'user_certifications.user_id')->where('users.slug', $slug)->select('user_certifications.*')->get();
        return inertia("Profile/Certification", $data);
    }
    public function create()
    {
        $data['title'] = "Add Certificate";
        return inertia("Profile/CertificationForm", $data);
    }
    public function edit(Request $request, $id)
    {
        $data['certification'] = UserCertification::where(['user_id' => $request->user()->id, 'id' => $id])->firstOrFail();
        $data['title'] = "Edit Certification";
        return inertia("Profile/CertificationForm", $data);
    }
    public function save(Request $request)
    {
        if ($request->id) {
            UserCertification::where('id', $request->id)->update($request->post());
        } else {
            UserCertification::create($request->post());
        }
        return to_route('profile.certification', $request->user()->slug);
    }
    public function destroy(Request $request)
    {
        UserCertification::where('id', $request->id)->delete();
        return to_route('profile.certification', $request->user()->slug);
    }
}
