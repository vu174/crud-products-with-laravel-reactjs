<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('add_product', [ProductController::class, 'store']);
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{product}/edit', [ProductController::class, 'edit']);
Route::post('products/{product}/update', [ProductController::class, 'update']);
Route::get('products/{product}/delete', [ProductController::class, 'delete']);