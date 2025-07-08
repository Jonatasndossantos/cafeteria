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
use App\Http\Controllers\Api\SupabaseUsersController;
use App\Http\Controllers\Api\AiInvokeController;
use App\Http\Controllers\Api\DFDController;
use App\Http\Controllers\Api\GerarDadosController;
use App\Http\Controllers\Api\BaseDocumentController;

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

// Rota de teste para verificar autenticação
Route::middleware('auth:sanctum')->get('/test-auth', function (Request $request) {
    return response()->json([
        'authenticated' => true,
        'user' => $request->user(),
        'message' => 'Usuário autenticado com sucesso'
    ]);
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
Route::get('setores/{id}/usuarios', [SetorController::class, 'usuarios']);

// Rota para sugestões
Route::get('/suggestions', Controllers\Api\SuggestionController::class);


// Exemplo de rota protegida por autenticação e limite de requisições (throttle)
// Route::middleware(['auth:sanctum', 'throttle:30,1'])->get('/secure-suggestions', [SuggestionController::class, 'index']);

Route::post('/ai/invoke', Controllers\Api\AiInvokeController::class);

Route::get('/teste', Controllers\TesteController::class);

// Rotas que mandam dados do usuario (web)     ops(isso foi configurado no sanctum)
    // Documentos
Route::middleware(['auth:sanctum'])->group(function () {
    Route::resource('documents', DocumentController::class);
});

Route::middleware('auth:sanctum')->group(function () {
    // Processos routes
    Route::post('/processos', [ProcessoController::class, 'store']);
    Route::get('/processos', [ProcessoController::class, 'index']);

    // Rotas para administração de usuários do Supabase (TEMP: sem autenticação para testes)
    Route::prefix('supabase')->group(function () {
        Route::get('/users', [SupabaseUsersController::class, 'index']);
        Route::post('/users', [SupabaseUsersController::class, 'store']);
        Route::get('/users/{id}', [SupabaseUsersController::class, 'show']);
        Route::put('/users/{id}', [SupabaseUsersController::class, 'update']);
        Route::delete('/users/{id}', [SupabaseUsersController::class, 'destroy']);
        Route::post('/users/{id}/ban', [SupabaseUsersController::class, 'banUser']);
        Route::post('/users/{id}/unban', [SupabaseUsersController::class, 'unbanUser']);
        Route::post('/users/{id}/confirm-email', [SupabaseUsersController::class, 'confirmEmail']);
    });

    Route::post('/ai/invoke', [AiInvokeController::class, 'invoke']);
    Route::post('/dfd', [DFDController::class, 'generateDFD']);
    Route::post('/generate-data', [GerarDadosController::class, 'generateData']);
    Route::post('/suggestions', [SuggestionController::class, 'getSuggestions']);
    Route::post('/documents/base', [BaseDocumentController::class, 'generateBaseDocument']);

    // Orders API routes
    Route::prefix('orders')->group(function () {
        Route::get('/', function (Request $request) {
            // Mock data with sample orders for testing
            $mockOrders = [
                [
                    'id' => '550e8400-e29b-41d4-a716-446655440001',
                    'user_id' => 'user_123',
                    'user_email' => 'cliente@exemplo.com',
                    'user_name' => 'João Silva',
                    'status' => 'pending',
                    'payment_status' => 'paid',
                    'payment_method' => 'stripe',
                    'stripe_payment_intent_id' => 'pi_1234567890',
                    'total_amount' => 2500, // R$ 25,00 em centavos
                    'currency' => 'BRL',
                    'created_at' => now()->subHours(2)->toISOString(),
                    'updated_at' => now()->subHours(2)->toISOString(),
                    'items' => [
                        [
                            'id' => 'item_1',
                            'produto_id' => 1,
                            'produto' => ['id' => 1, 'nome' => 'Café Expresso', 'preco' => 800],
                            'quantidade' => 2,
                            'preco_unitario' => 800,
                            'subtotal' => 1600
                        ],
                        [
                            'id' => 'item_2',
                            'produto_id' => 2,
                            'produto' => ['id' => 2, 'nome' => 'Croissant', 'preco' => 900],
                            'quantidade' => 1,
                            'preco_unitario' => 900,
                            'subtotal' => 900
                        ]
                    ]
                ],
                [
                    'id' => '550e8400-e29b-41d4-a716-446655440002',
                    'user_id' => 'user_456',
                    'user_email' => 'maria@exemplo.com',
                    'user_name' => 'Maria Santos',
                    'status' => 'completed',
                    'payment_status' => 'paid',
                    'payment_method' => 'stripe',
                    'stripe_payment_intent_id' => 'pi_0987654321',
                    'total_amount' => 1200,
                    'currency' => 'BRL',
                    'created_at' => now()->subDays(1)->toISOString(),
                    'updated_at' => now()->subHours(1)->toISOString(),
                    'items' => [
                        [
                            'id' => 'item_3',
                            'produto_id' => 3,
                            'produto' => ['id' => 3, 'nome' => 'Cappuccino', 'preco' => 1200],
                            'quantidade' => 1,
                            'preco_unitario' => 1200,
                            'subtotal' => 1200
                        ]
                    ]
                ],
                [
                    'id' => '550e8400-e29b-41d4-a716-446655440003',
                    'user_id' => 'user_789',
                    'user_email' => 'pedro@exemplo.com',
                    'user_name' => 'Pedro Costa',
                    'status' => 'processing',
                    'payment_status' => 'paid',
                    'payment_method' => 'pix',
                    'total_amount' => 3500,
                    'currency' => 'BRL',
                    'created_at' => now()->subMinutes(30)->toISOString(),
                    'updated_at' => now()->subMinutes(15)->toISOString(),
                    'items' => [
                        [
                            'id' => 'item_4',
                            'produto_id' => 4,
                            'produto' => ['id' => 4, 'nome' => 'Sanduíche Natural', 'preco' => 1500],
                            'quantidade' => 1,
                            'preco_unitario' => 1500,
                            'subtotal' => 1500
                        ],
                        [
                            'id' => 'item_5',
                            'produto_id' => 5,
                            'produto' => ['id' => 5, 'nome' => 'Suco de Laranja', 'preco' => 1000],
                            'quantidade' => 2,
                            'preco_unitario' => 1000,
                            'subtotal' => 2000
                        ]
                    ]
                ]
            ];

            return response()->json([
                'orders' => $mockOrders,
                'total' => count($mockOrders)
            ]);
        });

        Route::get('/stats', function () {
            // Mock stats with sample data
            return response()->json([
                'total_orders' => 156,
                'total_revenue' => 15600000, // R$ 156.000,00 em centavos
                'pending_orders' => 8,
                'completed_orders' => 142,
                'today_orders' => 12,
                'today_revenue' => 4800000 // R$ 48.000,00 em centavos
            ]);
        });

        Route::get('/{id}', function ($id) {
            return response()->json(['message' => 'Order details for ID: ' . $id]);
        });

        Route::patch('/{id}/status', function ($id, Request $request) {
            return response()->json(['message' => 'Order status updated for ID: ' . $id]);
        });

        Route::patch('/{id}/payment-status', function ($id, Request $request) {
            return response()->json(['message' => 'Payment status updated for ID: ' . $id]);
        });
    });
});

// Rota para download de PDF de documentos
Route::get('/documentos/{id}/pdf', [DocumentoPdfController::class, 'downloadPdf']);

