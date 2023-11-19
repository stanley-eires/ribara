<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $data['jobs'] = Job::orderBy('title')->paginate(30);
        if ($request->hasHeader('via-axios')) {
            return $data['jobs'];
        }
        $data['title'] = "Internship Opportunities";
        return inertia('Jobs', $data);
    }
    public function generate()
    {
        Artisan::call("db:seed --class=JobSeeder --force");
        return to_route("internship-opportunities");
    }
}
