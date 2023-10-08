<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Connection;
use App\Models\User;
use App\Notifications\AppNotification;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        $data['title'] = "Register";
        if ($connection = json_decode(base64_decode($request->get('hook')), true)) {
            $data['connection'] = $connection;
        }
        return Inertia::render('Auth/RegisterSimple', $data);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            // 'phone' => 'required|string|max:255|unique:' . User::class,
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', Rules\Password::defaults()],
            'country' => 'required|string|max:255',
        ]);

        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'slug' => str()->slug($request->firstname . " " . $request->lastname, '-'),
            'email' => $request->email,
            // 'phone' => $request->phone,
            'usermeta' => ['country' => $request->country, 'avatar' => '', "headline" => ''],
            'password' => Hash::make($request->password),
            'invited_by' => $request->connection ? $request->connection['user_id'] : null
        ]);

        event(new Registered($user));
        if ($connection = $request->connection) {
            Connection::updateOrInsert(
                [
                    'user_id' => $user->id,
                    'connected_user_id' =>  $request->connection['user_id']
                ],
                [
                    'status' => 'accepted',
                    'connection_type' => $connection['type'], 'created_at' => now(),
                    'updated_at' => now()
                ]
            );
            User::find($connection['user_id'])->notify(new AppNotification([
                'icon' => "fa fa-user-plus text-dark",
                'content' => "<a href='/{$user->slug}' class='fw-bold text-dark'>{$user->fullname}</a> just registered on the platform as your <strong>" . $connection['type'] . "</strong> using your invitation link."
            ]));
        }

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
