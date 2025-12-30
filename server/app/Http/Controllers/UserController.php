<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Http\Requests\AddUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        return User::with('station')
            ->get()
            ->makeHidden('station_id'); 
    }

    public function store(AddUserRequest $request)
    {
        $validated = $request->validated();

        $user = DB::transaction(function () use ($validated) {

            $prefix = now()->format('ym'); // YYMM (e.g. 2509)

            // Lock rows to prevent duplicates
            $lastEmployeeId = DB::table('users')
                ->where('employee_id', 'like', $prefix . '%')
                ->lockForUpdate()
                ->max('employee_id');

            if ($lastEmployeeId) {
                $sequence = (int) substr($lastEmployeeId, -3) + 1;
            } else {
                $sequence = 1;
            }

            $employee_id = $prefix . str_pad($sequence, 3, '0', STR_PAD_LEFT);

            // Password pattern: clarmil-<seq>-<YYMMDD>
            $passwordPlain =
                'clarmil-' .
                substr($employee_id, -3) . '-' .
                date('ymd', strtotime($validated['birthdate']));

            $newUser = User::create([
                'employee_id' => $employee_id,
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'address' => $validated['address'],
                'middle_name' => $validated['middle_name'],
                'sex' => $validated['sex'],
                'contact_number' => $validated['contact_number'],
                'email' => $validated['email'],
                'role' => $validated['role'],
                'birthdate' => $validated['birthdate'],
                'password' => Hash::make($passwordPlain),
                'plain_password' => $passwordPlain,
            ]);

            return [
                'new_user' => $newUser,
                'plain_password' => $passwordPlain
            ];
        });

        return response()->json([
            'message' => 'Employee created successfully.',
            'user' => $user['new_user']->loadStation(),
        ], 201);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();

        if (isset($validated['password'])) {
            $validated['plain_password'] = $validated['password'];
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json($user->loadStation());
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent();
    }

    public function removeMultipleEmployees(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id',
        ]);

        $deletedCount = User::whereIn('id', $validated['ids'])->delete();

        return response()->json([
            'message' => "Successfully deleted {$deletedCount} employees.",
        ], 200);
    }
}

