<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateIngridientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|in:base,additional',
            'image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'stock_quantity' => 'sometimes|numeric|min:0',
            'reorder_level' => 'sometimes|numeric|min:0',
            'unit' => 'sometimes|string|max:20',
            'unit_cost' => 'sometimes|nullable|numeric|min:0',
            'expiration_date' => 'sometimes|nullable|date|after_or_equal:today',
            'description' => 'sometimes|nullable|string|max:1000',
        ];
    }
}
