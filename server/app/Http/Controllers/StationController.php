<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Station;
use Illuminate\Http\Request;

class StationController extends Controller
{
    public function index()
    {
        return Station::with('users')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:departments,name',
            'description' => 'nullable|string',
        ]);

        $department = Station::create($validated);
        return response()->json($department, 201);
    }

    public function show(Station $department)
    {
        return $department->load('users');
    }

    public function update(Request $request, Station $department)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|unique:departments,name,' . $department->id,
            'description' => 'nullable|string',
        ]);

        $department->update($validated);
        return response()->json($department);
    }

    public function destroy(Station $department)
    {
        $department->delete();
        return response()->noContent();
    }
}

