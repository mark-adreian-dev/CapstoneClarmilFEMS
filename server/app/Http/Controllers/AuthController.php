<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('employee_id', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $request->session()->regenerate();

        $user = auth()->user();

        $contextRoleMap = [
            'worker' => ['measuring_worker', 'receiving_worker'],
            'manager' => ['manager'],
            'admin' => ['admin'],
        ];

        if (!in_array($user->role, $contextRoleMap[$request->context])) {
            Auth::logout();
            return response()->json([
                'message' => 'Invalid Credentials'
            ], 403);
        }

        return response()->json([
            'message' => 'Login successful',
            'role' => $user->role,
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function loadUser ()  {
        return response()->json([
            'user' => Auth::user()
        ]);
    }
}
