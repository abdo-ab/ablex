<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ProtectFilamentAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {

            return redirect('/dashboard')->with('forbidden', true);
        }

        if (Auth::user()->Role !== 'admin') {

            return redirect('/forbidden');
        }

        return $next($request);
    }
}
