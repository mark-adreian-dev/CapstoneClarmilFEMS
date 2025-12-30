<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class AddUserRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255|min:1',
            'suffix' => 'nullable|string|max:255',
            'sex' => ['required', Rule::in(['male', 'female'])],
            'contact_number' => 'required|string|max:11|min:11',
            'email' => 'required|email|unique:users,email',
            'role' => ['required', Rule::in(['measuring_worker', 'receiving_worker', 'manager', 'admin'])],
            'birthdate' => 'required|date',
            'password' =>  'sometimes|string',
        ];
    }
}
