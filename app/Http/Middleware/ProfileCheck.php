<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProfileCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $action = 'avatar'): Response
    {
        if ($action == 'avatar') {
            if (!$request->user()->avatar) {
                return to_route('profile.index', $request->user()->slug);
            }
        }
        return $next($request);
    }
}
