<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddIngridientRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:ingridients,name',
            'type' => 'required|in:base,additional',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'stock_quantity' => 'required|numeric|min:0',
            'reorder_level' => 'required|numeric|min:0',
            'unit' => 'required|string|max:20',
            'unit_cost' => 'nullable|numeric|min:0',
            'expiration_date' => 'nullable|date|after_or_equal:today',
            'description' => 'nullable|string|max:1000',
        ];
    }
}
