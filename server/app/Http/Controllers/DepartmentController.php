<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        return Department::with('users')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:departments,name',
            'description' => 'nullable|string',
        ]);

        $department = Department::create($validated);
        return response()->json($department, 201);
    }

    public function show(Department $department)
    {
        return $department->load('users');
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|unique:departments,name,' . $department->id,
            'description' => 'nullable|string',
        ]);

        $department->update($validated);
        return response()->json($department);
    }

    public function destroy(Department $department)
    {
        $department->delete();
        return response()->noContent();
    }
}

