<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use App\Notifications\AppNotification;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{

    public function index(Request $request)
    {
        $segment = $request->get('segment', 'active');
        $upcoming = Appointment::where(['status' => 'accepted'])->where('appointment_timestamp', '>=', time())->where(fn ($query) => $query->where('host', $request->user()->id)->orWhere('friend', $request->user()->id));
        $requests = Appointment::where(['status' => 'pending'])->where('appointment_timestamp', '>=', time())->where('friend', $request->user()->id);
        $active = Appointment::where('appointment_timestamp', '>=', time())->where(fn ($query) => $query->where('host', $request->user()->id)->orWhere('friend', $request->user()->id));
        $archived = Appointment::where('status', '!=', 'pending')->where('appointment_timestamp', '<=', time())->where(fn ($query) => $query->where('host', $request->user()->id)->orWhere('friend', $request->user()->id));
        $expired = Appointment::where('status', 'pending')->where('appointment_timestamp', '<=', time())->where(fn ($query) => $query->where('host', $request->user()->id)->orWhere('friend', $request->user()->id));
        $data['stats'] = [
            'upcoming' => $upcoming->count(),
            'requests' => $requests->count(),
            'active' => $active->count(),
            'archived' => $archived->count(),
            'expired' => $expired->count(),
        ];

        if ($segment == "upcoming") {
            $appointments = $upcoming;
        } elseif ($segment == "requests") {
            $appointments = $requests;
        } elseif ($segment == "active") {
            $appointments = $active;
        } elseif ($segment == "archived") {
            $appointments = $archived;
        } elseif ($segment == "expired") {
            $appointments = $expired;
        }


        $data['appointments'] = $appointments->orderBy('appointment_timestamp')->get();
        $data['segment'] = $segment;
        $data['title'] = "Upcoming Appointments";
        return inertia('Appointments/Index', $data);
    }
    public function schedule(Request $request)
    {
        $data['title'] = "Scheduling Appointment";
        $data['user']  = $request->user();
        return inertia('Appointments/Schedule', $data);
    }
    public function store(Request $request)
    {
        if ($request->friend == $request->user()->id) {
            return back()->with('message', [
                'content' => "You cannot book an appointment with your self",
                'status' => 'error'
            ]);
        }
        $user = User::find($request->friend);
        Appointment::create($request->post());
        $user->notify(new AppNotification([
            'icon' => 'fa fa-calendar-plus text-primary',
            'content' => "<a href='{$request->user()->slug}' class='fw-bold text-dark'>{$request->user()->fullname}</a> is requesting an appointment with you at <a href='/appointments' class='small'>{$request->appointment_date} {$request->appointment_time}</a></b>"
        ]));
        return back()->with('message', [
            'content' => "Your appointment request has been sent to <b>{$user->fullname}</b>",
            'status' => 'success'
        ]);
    }

    public function destroy(Request $request)
    {
        Appointment::where('id', $request->id)->delete();
        return back();
    }

    public function actions(Request $request)
    {
        Appointment::where('id', $request->id)->update(['status' => $request->status]);
        return back();
    }

    public function getAppointments(Request $request)
    {
        return Appointment::where(['status' => 'accepted'])->where(fn ($query) => $query->where('host', $request->user()->id)->orWhere('friend', $request->user()->id))->orderBy('appointment_timestamp')->get();
    }
}
