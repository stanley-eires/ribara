<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\User;
use App\Notifications\AppNotification;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class ConnectionController extends Controller
{
    public function index(Request $request)
    {
        $stream = $request->get('stream');
        if ($stream) {
            $data['title'] = ucfirst($stream) . " Connections";
            if ($stream == 'mentor') {
                $data['users'] =  User::mentors($request->user()->id);
            } elseif ($stream == 'protege') {
                $data['users'] =  User::proteges($request->user()->id);
            } elseif ($stream == 'peer') {
                $data['users'] =  User::peers($request->user()->id);
            } else {
                $data['title'] = "Connection Requests";
                $data['users'] =  User::pendingRequests($request->user()->id);
            }
        } else {
            $data['title'] = "All Connections";
            $data['users'] =  User::userConnectedFriends($request->user()->id);
        }
        $data['stats'] = User::connectionStats($request->user()->id);
        $data['stream'] = $stream;
        return inertia('Connections', $data);
    }
    public function connect(Request $request)
    {
        $user_link = route('profile.index', ['slug' => $request->user()->slug]);
        $request_url = route('connections', ['stream' => 'requests']);
        $user = User::find($request->user_id);
        $message = "";
        switch ($request->connection_type) {
            case 'mentor':
                $message = "wants to be your <a href='{$request_url}'>protege on ribara.</a>";
                break;
            case 'protege':
                $message = "is requesting <a href='{$request_url}'>mentoring you on ribara.</a>";
                break;
            case 'peer':
                $message = "is requesting to be your <a href='{$request_url}'>peer on ribara.</a>";
                break;
            default:
                break;
        }
        $user->notify(new AppNotification(db: [
            'image' => $request->user()->avatar,
            'content' => "<a href='$user_link' class='fw-bold text-dark'>{$request->user()->fullname}</a> {$message}"
        ], mail: [
            'subject' => 'New Connection Request.',
            'message' => "<a href='$user_link'>{$request->user()->fullname}</a> {$message}",
        ]));
        Connection::create($request->post());
        return back()->with('message', [
            'content' => "A request has been sent to <a href='/{$user->slug}'>{$user->fullname}</a>",
            'status' => 'success'
        ]);
    }
    public function disconnect(Request $request)
    {
        Connection::where(fn ($query) => $query->where(['connected_user_id' => $request->connected_user_id, 'user_id' => $request->user()->id]))
            ->orWhere(fn ($query) => $query->where(['user_id' => $request->connected_user_id, 'connected_user_id' => $request->user()->id]))->delete();

        return back()->with('message', [
            'content' => "Your have successfully been disconnected from user",
            'status' => 'success'
        ]);
    }
    public function accept(Request $request)
    {
        Connection::where(fn ($query) => $query->where(['connected_user_id' => $request->connected_user_id, 'user_id' => $request->user()->id]))
            ->orWhere(fn ($query) => $query->where(['user_id' => $request->connected_user_id, 'connected_user_id' => $request->user()->id]))->update(['status' => 'accepted']);
        $user = User::find($request->connected_user_id);
        $user->notify(new AppNotification([
            'image' => $request->user()->avatar,
            'content' => "<a href='{$request->user()->slug}' class='fw-bold text-dark'>{$request->user()->fullname}</a> has accepted your request to connect as your <b>{$request->type}</b> on the platform</b>"
        ]));
        return back()->with('message', [
            'content' => "You are now connected with <b>{$user->fullname}</b>",
            'status' => 'success'
        ]);
    }
    public function connections(Request $request, $id)
    {
        return User::select('slug', 'firstname', 'lastname', 'avatar', 'headline', 'id')->with('connections')->findOrFail($id);
    }

    public function connectionSuggestions(Request $request)
    {
        return User::select('firstname', 'lastname', 'slug', 'id', 'avatar', 'headline')->whereNotIn('id', User::userConnectedFriends($request->user()->id)->pluck('id'))
            ->whereNot('id', $request->user()->id)
            ->inRandomOrder()->take($request->get('limit', 15))->get();
    }
    public function invitation(Request $request)
    {
        $data['title'] = "Invite Others";
        return inertia('Invitation', $data);
    }
    public function sendInvitation(Request $request)
    {
        foreach ($request->email as $email) {
            Notification::route('mail', $email)
                ->notify(new AppNotification(mail: [
                    'subject' => ucwords($request->type . " Invitation @Ribara"),
                    'message' => $request->message
                ]));
        }
        return back()->with('message', ['content' => 'Message Sent', 'status' => 'success']);
    }
}
