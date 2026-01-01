<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ingridients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();

            // Classification: Base vs Additional
            $table->enum('type', ['base', 'additional'])->default('base');
            $table->string('image_path')->nullable();
            // Inventory Tracking
            $table->decimal('stock_quantity', 10, 2)->default(0); // Current amount in stock
            $table->decimal('reorder_level', 10, 2)->default(1.00); // Alert when stock falls below this
            $table->string('unit')->default('kg');
            $table->decimal('unit_cost', 10, 2)->nullable(); // Cost per unit for pricing cakes

            // Storage Information
            $table->date('expiration_date')->nullable();
            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingridients');
    }
};
