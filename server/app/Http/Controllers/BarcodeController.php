<?php
namespace App\Http\Controllers;

use App\Models\Barcode;
use Illuminate\Http\Request;

class BarcodeController extends Controller
{
    public function index()
    {
        return Barcode::with(['premix', 'scannedBy', 'verifiedBy', 'department'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'barcode_value' => 'required|unique:barcodes,barcode_value',
            'premix_id' => 'required|exists:premixes,id',
            'status' => 'required|in:generated,scanned,verified,voided',
            'qr_image_path' => 'nullable|string',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        $barcode = Barcode::create($validated);
        return response()->json($barcode, 201);
    }

    public function show(Barcode $barcode)
    {
        return $barcode->load(['premix', 'scannedBy', 'verifiedBy', 'department']);
    }

    public function update(Request $request, Barcode $barcode)
    {
        $validated = $request->validate([
            'barcode_value' => 'sometimes|required|unique:barcodes,barcode_value,' . $barcode->id,
            'premix_id' => 'sometimes|required|exists:premixes,id',
            'status' => 'sometimes|required|in:generated,scanned,verified,voided',
            'qr_image_path' => 'nullable|string',
            'scanned_at' => 'nullable|date',
            'scanned_by' => 'nullable|exists:users,id',
            'verified_at' => 'nullable|date',
            'verified_by' => 'nullable|exists:users,id',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        $barcode->update($validated);
        return response()->json($barcode);
    }

    public function destroy(Barcode $barcode)
    {
        $barcode->delete();
        return response()->noContent();
    }
}
