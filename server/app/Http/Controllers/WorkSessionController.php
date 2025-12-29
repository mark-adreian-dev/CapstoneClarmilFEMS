<?php

namespace App\Http\Controllers;

use App\Models\WorkSession;
use Illuminate\Http\Request;

class WorkSessionController extends Controller
{
    public function index()
    {
        return WorkSession::with('user')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date|after_or_equal:start_time',
            'actual_work_duration_minutes' => 'required|integer|min:0',
            'idle_minutes' => 'required|integer|min:0',
            'total_output' => 'required|integer|min:0',
        ]);

        $session = WorkSession::create($validated);
        return response()->json($session, 201);
    }

    public function show(WorkSession $workSession)
    {
        return $workSession->load('user');
    }

    public function update(Request $request, WorkSession $workSession)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'nullable|date|after_or_equal:start_time',
            'actual_work_duration_minutes' => 'sometimes|required|integer|min:0',
            'idle_minutes' => 'sometimes|required|integer|min:0',
            'total_output' => 'sometimes|required|integer|min:0',
        ]);

        $workSession->update($validated);
        return response()->json($workSession);
    }

    public function destroy(WorkSession $workSession)
    {
        $workSession->delete();
        return response()->noContent();
    }
}

