<?php

namespace App\Http\Middleware;

use App\Models\Connection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'connections' => $request->user() ? Connection::select('user_id', 'connected_user_id', 'status', 'connection_type')->where('user_id', '=', $request->user()->id)->orWhere('connected_user_id', '=', $request->user()->id)->get() : [],
                'unread_notifications' => Auth::check() ? Auth::user()->unreadNotifications()->limit(6)->get() : []
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
