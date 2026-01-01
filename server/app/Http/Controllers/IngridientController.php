<?php

namespace App\Http\Controllers;

use App\Models\Ingridient;
use App\Http\Requests\AddIngridientRequest;
use App\Http\Requests\UpdateIngridientRequest;
use Illuminate\Support\Facades\Storage;

class IngridientController extends Controller
{
    public function index()
    {
        return Ingridient::all();
    }

    public function store(AddIngridientRequest $request)
    {
      
        // 1. Get the validated data (this will include other fields)
        $validated = $request->validated();

        // 2. Handle the Image Upload
        if ($request->hasFile('image')) {
            // Store the file in 'storage/app/public/ingredients'
            // 'public' refers to the disk defined in config/filesystems.php
            $path = $request->file('image')->store('ingredients', 'public');

            // 3. Save the path string to the database column 'image_path'
            $validated['image_path'] = $path;
        }

        // 4. Create the record
        $ingridient = Ingridient::create($validated);

        return response()->json($ingridient, 201);
    }

    public function show(Ingridient $ingridient)
    {
        return $ingridient;
    }

    public function update(UpdateIngridientRequest $request, Ingridient $ingridient)
    {
        $validated = $request->validated();

        // 1. Handle Image Upload
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($ingridient->image_path) {
                Storage::disk('public')->delete($ingridient->image_path);
            }

            // Store the new image in the 'ingredients' directory on the 'public' disk
            $path = $request->file('image')->store('ingredients', 'public');

            // Map the new path to the database column 'image_path'
            $validated['image_path'] = $path;
        }

        // 2. Remove 'image' from the validated array so it doesn't 
        // conflict with the 'image_path' column in the DB
        unset($validated['image']);

        // 3. Update the model with the remaining validated data
        $ingridient->update($validated);

        return response()->json($ingridient);
    }

    public function destroy(Ingridient $ingridient)
    {
        $ingridient->delete();
        return response()->noContent();
    }
}

