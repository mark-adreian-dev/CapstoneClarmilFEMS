<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique();
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('suffix')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('plain_password');
            $table->date('birthdate');
            $table->enum('role', ['measuring_worker', 'receiving_worker', 'manager', 'admin'])->default('measuring_worker');
            $table->enum('sex', ['male', 'female']);
            $table->string('contact_number')->nullable(); 
            $table->text('address')->nullable();
            $table->foreignId('station_id')->nullable()->constrained('stations')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
