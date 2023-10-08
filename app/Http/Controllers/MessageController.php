<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Message;
use App\Models\MessageConversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function index(Request $request, $id = null)
    {
        $data['messages'] =  Message::select('id', 'user_id', 'friend_id')->where(fn ($query) => $query->where('user_id', $request->user()->id)->orWhere('friend_id', $request->user()->id))->withWhereHas('lastConversation')->get();
        $data['title'] = "Messages";

        $data['friends'] = User::userConnectedFriends($request->user()->id);

        if ($id && $obj = json_decode(base64_decode($id), true)) {
            if ($obj['type'] == "message") {
                MessageConversation::where(['message_id' => $obj['id'], 'receiver' => $request->user()->id])->update(['read_at' => now()]);
                $data['conversation'] = MessageConversation::where('message_id', $obj['id'])->with('receiver')->latest()->get();
            } elseif ($obj['type'] == "user") {
                $prev = Message::select('id')->where(['user_id' => $obj['id'], 'friend_id' => $request->user()->id])->orWhere(fn ($query) => $query->where(['friend_id' => $obj['id'], 'user_id' => $request->user()->id]))->withOut(['sender', 'receiver'])->first();
                if ($prev) {
                    MessageConversation::where(['message_id' => $prev->id, 'receiver' => $request->user()->id])->update(['read_at' => now()]);
                    $data['conversation'] = MessageConversation::where('message_id', $prev->id)->with('receiver')->latest()->get();
                } else {
                    $data['conversation'] = [
                        ['receiver' => User::select('id', 'firstname', 'lastname', 'slug', 'avatar')->find($obj['id'])]
                    ];
                }
            }
        }
        return inertia('Messages/Index', $data);
    }
    public function store(Request $request)
    {
        $conversation = $request->post();
        if (!$request->message_id) {
            $m = Message::create([
                'user_id' => $request->user()->id,
                'friend_id' => $request->receiver,
            ]);
            $conversation['message_id'] = $m->id;
        }
        $conversation = MessageConversation::create($conversation);
        if ($request->message_id) {
            return back();
        } else {
            return to_route('messages.index', base64_encode(json_encode(['type' => 'message', 'id' => $request->message_id])));
        }
    }
    public function destroyConversation(Request $request)
    {
        MessageConversation::where('id', $request->id)->delete();
        return back();
    }
}
