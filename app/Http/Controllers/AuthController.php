<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\Connection;
use App\Models\Sessions;
use App\Models\User;
use App\Notifications\AppNotification;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    /**
     * Display the login view.
     */
    public function showLogin()
    {
        $data['title'] = "Log in";
        return inertia('Auth/Login', $data);
    }
    /**
     * Handle an incoming authentication request.
     */
    public function handleLogin(LoginRequest $request)
    {
        $request->authenticate();
        $user_agents = $request->user()->user_agents ?? [];

        if (!in_array($request->server('HTTP_USER_AGENT'), $user_agents)) {
            $request->user()->notify(new AppNotification([
                'icon' => 'fas fa-sign-in text-warning',
                'content' => 'There was a login to your account from a new device. Kindly review'
            ]));
            $user_agents[] = $request->server('HTTP_USER_AGENT');
            User::where('id', $request->user()->id)->update(['user_agents' => array_unique($user_agents)]);
        }
        $request->session()->regenerate();
        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Display the registration view.
     */
    public function showRegister(Request $request)
    {
        if ($request->session()->has('create-account.phone_verified_at')) {
            $data['title'] = "Create Password";
            return inertia('Auth/CreatePassword', $data);
        } elseif ($request->session()->has('create-account.token')) {
            $data['title'] = "Account Verification";
            $data['token'] = session('create-account.token');
            return inertia('Auth/VerifyPhone', $data);
        } elseif ($request->session()->has('create-account.email')) {
            $data['title'] = "Enter Phone Number";
            $data['stage'] = 'phone';
            $data['country'] = session('create-account.country');
            return inertia('Auth/Register', $data);
        } else {
            $data['title'] = "Create Account";
            $data['stage'] = 'create';
            if ($connection = json_decode(base64_decode($request->get('hook')), true)) {
                $data['connection'] = $connection;
            }
            return inertia('Auth/Register', $data);
        }
        $request->session()->forget('create-account');
        return back();
    }
    public function storeRegister(Request $request)
    {
        if ($request->email) {
            $request->validate([
                'firstname' => 'required|string|max:255',
                'lastname' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:' . User::class,
                'country' => 'required|string|max:255',
            ]);
            $request->session()->put('create-account', $request->post());
        } elseif ($request->phone) {
            $request->validate([
                'phone' => 'required|string|max:255|unique:' . User::class,
            ]);
            $request->session()->put('create-account.phone', $request->post('phone'));
            $token = mt_rand(1000, 9999);
            //TODO: SEND TOKEN TO USER
            $request->session()->put('create-account.token', $token);
        } elseif ($request->token) {
            $request->validate([
                'token' => 'required|string|max:4'
            ]);
            if ($request->token != session('create-account.token')) {
                return back()->withErrors(['token' => 'Invalid Token. Please kindly Resend to generate new token']);
            } else {
                $request->session()->put('create-account.phone_verified_at', now()->toDateTimeString());
            }
        } elseif ($request->password) {
            $request->validate([
                'password' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()],
            ]);
            $user =  User::create([
                'firstname' => session('create-account.firstname'),
                'lastname' => session('create-account.lastname'),
                'slug' => str()->slug(session('create-account.firstname') . " " . session('create-account.lastname'), '-'),
                'email' => session('create-account.email'),
                'phone' => session('create-account.phone'),
                'phone_verified_at' => session('create-account.phone_verified_at'),
                'password' => Hash::make($request->password),
                'usermeta' => ['country' => session('create-account.country'), 'avatar' => null, "headline" => null]
            ]);
            event(new Registered($user));
            if (session()->has('create-account.connection')) {
                $user_conn_type = session('create-account.connection.type');
                Connection::updateOrInsert(
                    ['user_id' => $user_conn_type == 'mentor' ? session('create-account.connection.user_id') : $user->id, 'friend_id' => $user_conn_type == 'mentor' ?  $user->id : session('create-account.connection.user_id')],
                    [
                        'status' => 'accepted', 'type' => session('create-account.connection.type'), 'created_at' => now(),
                        'updated_at' => now()
                    ]
                );
                User::find(session('create-account.connection.user_id'))->notify(new AppNotification([
                    'icon' => "fa fa-user-plus text-dark",
                    'content' => "<a href='/{$user->slug}' class='fw-bold text-dark'>{$user->fullname}</a> just registered on the platform as your <strong>" . session('create-account.connection.type') . "</strong> using your invitation link."
                ]));
            }
            $request->session()->forget('create-account');
            Auth::login($user);
            return redirect()->intended(RouteServiceProvider::HOME);
        }
        return to_route('register');
    }

    public function resendCode(Request $request)
    {
        $token = mt_rand(1000, 9999);
        //TODO: SEND TOKEN TO USER
        $request->session()->put('create-account.token', $token);
        return to_route('register');
    }

    public function redirectToSocialLoginPage($type = 'google')
    {
        return Socialite::driver($type)->redirect();
    }

    public function handleCallback($type = 'google')
    {
        try {
            $user = Socialite::driver($type)->user();
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Unable to login with Google.');
        }

        $existingUser = User::where('email', $user->email)->first();

        if ($existingUser) {
            auth()->login($existingUser);
        } else {
            $newUser = new User();
            $newUser->firstname = $user->user['given_name'];
            $newUser->lastname = $user->user['family_name'];
            $newUser->email = $user->email;
            $newUser->slug = str()->slug($user->name);
            $newUser->password = Hash::make($user->id);
            $newUser->email_verified_at = now();
            $newUser->save();
            auth()->login($newUser);
        }
        // Redirect to the desired page after login
        return redirect(RouteServiceProvider::HOME);
    }
}
