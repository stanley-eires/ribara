<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{

    public function readAll(Request $request)
    {
        $request->user()->unreadNotifications()->update(['read_at' => now()]);
        return back();
    }
    public function read(Request $request)
    {
        $request->user()->unreadNotifications()->where('id', $request->id)->update(['read_at' => now()]);
        return back();
    }
}
