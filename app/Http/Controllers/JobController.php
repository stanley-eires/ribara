<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class JobController extends Controller
{
    public function index()
    {
        $data['jobs'] = Job::orderBy('title')->paginate(200);
        $data['title'] = $data['jobs']['total'] . " Internship Opportunities you may like";
        return inertia('Jobs', $data);
    }
    public function generate()
    {
        Artisan::call("db:seed --class=JobSeeder --force");
        return to_route("jobs");
    }
}
