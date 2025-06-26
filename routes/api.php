<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\SetorController;
use App\Http\Controllers\UsuarioController;

use App\Http\Controllers\Api\SuggestionController;
use App\Http\Controllers;

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ProcessoController;
use App\Http\Controllers\DocumentoPdfController;

use App\Models\Setor;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rota pública para buscar setores (usada no frontend) - SEM middleware
Route::get('/setores-public', function () {
    return response()->json(Setor::all());
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});







// Usuários routes
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::get('/usuarios/{usuario}', [UsuarioController::class, 'show']);
Route::put('/usuarios/{usuario}', [UsuarioController::class, 'update']);
Route::delete('/usuarios/{usuario}', [UsuarioController::class, 'destroy']);

// Setores routes
Route::apiResource('setores', SetorController::class);
Route::get('setores/{id}/usuarios', [SetorController::class, 'usuarios']);

// Rota para sugestões 
Route::get('/suggestions', Controllers\Api\SuggestionController::class);


// Exemplo de rota protegida por autenticação e limite de requisições (throttle)
// Route::middleware(['auth:sanctum', 'throttle:30,1'])->get('/secure-suggestions', [SuggestionController::class, 'index']);

Route::post('/ai/invoke', Controllers\Api\AiInvokeController::class);

Route::get('/teste', Controllers\TesteController::class);

// Rotas que mandam dados do usuario (web)     ops(isso foi configurado no sanctum)
    // Documentos
Route::middleware(['auth:sanctum', 'web'])->group(function () {
    Route::resource('documents', DocumentController::class);
});

Route::middleware('auth:sanctum')->group(function () {
    // Processos routes
    Route::post('/processos', [ProcessoController::class, 'store']);
    Route::get('/processos', [ProcessoController::class, 'index']);
});

// Rota para download de PDF de documentos
Route::get('/documentos/{id}/pdf', [DocumentoPdfController::class, 'downloadPdf']);

