<?php

namespace App\Http\Controllers;

use App\Models\OperationConfig;
use Illuminate\Http\Request;

class OperationConfigController extends Controller
{
    public function index()
    {
        return OperationConfig::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time',
            'daily_quota' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $config = OperationConfig::create($validated);
        return response()->json($config, 201);
    }

    public function show(OperationConfig $operationConfig)
    {
        return $operationConfig;
    }

    public function update(Request $request, OperationConfig $operationConfig)
    {
        $validated = $request->validate([
            'start_time' => 'sometimes|required|date_format:H:i:s',
            'end_time' => 'sometimes|required|date_format:H:i:s|after:start_time',
            'daily_quota' => 'sometimes|required|integer|min:0',
            'is_active' => 'sometimes|required|boolean',
        ]);

        $operationConfig->update($validated);
        return response()->json($operationConfig);
    }

    public function destroy(OperationConfig $operationConfig)
    {
        $operationConfig->delete();
        return response()->noContent();
    }
}

