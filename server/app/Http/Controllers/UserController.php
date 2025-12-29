<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        return User::with('department')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|unique:users,employee_id',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => ['required', Rule::in(['measuring_worker', 'receiving_worker', 'manager', 'admin'])],
            'department_id' => 'nullable|exists:departments,id'
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        return $user->load('department');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'employee_id' => 'sometimes|required|unique:users,employee_id,' . $user->id,
            'name' => 'sometimes|required|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'role' => ['sometimes', 'required', Rule::in(['measuring_worker', 'receiving_worker', 'manager', 'admin'])],
            'department_id' => 'nullable|exists:departments,id'
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent();
    }
}

