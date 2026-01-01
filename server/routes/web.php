<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IngridientController;
use App\Http\Controllers\BarcodeController;
use App\Http\Controllers\WorkSessionController;
use App\Http\Controllers\OperationConfigController;

Route::prefix('api')->post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:web'])->prefix('api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'loadUser']);
});

Route::middleware(['auth', 'role:admin'])->prefix('api')->group(function () {
    Route::delete('users/bulk', [UserController::class, 'removeMultipleEmployees']);
    Route::apiResource('users', UserController::class);
   
    Route::apiResource('stations', StationController::class);
    Route::apiResource('ingridients', IngridientController::class);
});

Route::middleware(['auth'])->prefix('api')->group(function () {
    Route::apiResource('barcodes', BarcodeController::class);
    Route::apiResource('work-sessions', WorkSessionController::class);
    Route::apiResource('operation-configs', OperationConfigController::class);

});



