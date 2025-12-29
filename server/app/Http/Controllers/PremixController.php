<?php

namespace App\Http\Controllers;

use App\Models\Premix;
use Illuminate\Http\Request;

class PremixController extends Controller
{
    public function index()
    {
        return Premix::with('barcodes')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:premixes,name',
            'description' => 'nullable|string',
            'unit' => 'required|string',
        ]);

        $premix = Premix::create($validated);
        return response()->json($premix, 201);
    }

    public function show(Premix $premix)
    {
        return $premix->load('barcodes');
    }

    public function update(Request $request, Premix $premix)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|unique:premixes,name,' . $premix->id,
            'description' => 'nullable|string',
            'unit' => 'sometimes|required|string',
        ]);

        $premix->update($validated);
        return response()->json($premix);
    }

    public function destroy(Premix $premix)
    {
        $premix->delete();
        return response()->noContent();
    }
}

