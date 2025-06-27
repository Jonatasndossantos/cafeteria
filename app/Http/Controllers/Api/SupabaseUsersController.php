<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SupabaseAuthService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class SupabaseUsersController extends Controller
{
    protected $supabaseAuth;

    public function __construct(SupabaseAuthService $supabaseAuth)
    {
        $this->supabaseAuth = $supabaseAuth;
    }

    /**
     * Listar usuários
     */
    public function index(Request $request): JsonResponse
    {
        $limit = $request->get('limit', 50);
        $page = $request->get('page', 1);
        $search = $request->get('search');

        if ($search) {
            $result = $this->supabaseAuth->searchUsersByEmail($search);
        } else {
            $result = $this->supabaseAuth->listUsers($limit, $page);
        }

        if (!$result['success']) {
            return response()->json([
                'error' => $result['error'],
                'message' => $result['message'] ?? null
            ], 500);
        }

        return response()->json($result['data']);
    }

    /**
     * Buscar usuário específico
     */
    public function show($id): JsonResponse
    {
        $result = $this->supabaseAuth->getUser($id);

        if (!$result['success']) {
            return response()->json([
                'error' => $result['error'],
                'message' => $result['message'] ?? null
            ], $result['status'] ?? 500);
        }

        return response()->json($result['data']);
    }

    /**
     * Criar novo usuário
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'password' => 'nullable|string|min:8',
                'user_metadata' => 'nullable|array',
                'app_metadata' => 'nullable|array',
                'email_confirm' => 'nullable|boolean',
            ]);

            $result = $this->supabaseAuth->createUser($validated);

            if (!$result['success']) {
                return response()->json([
                    'error' => $result['error'],
                    'message' => $result['message'] ?? null
                ], 400);
            }

            return response()->json($result['data'], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Dados inválidos',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Atualizar usuário
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'email' => 'nullable|email',
                'password' => 'nullable|string|min:8',
                'user_metadata' => 'nullable|array',
                'app_metadata' => 'nullable|array',
                'email_confirm' => 'nullable|boolean',
                'phone_confirm' => 'nullable|boolean',
                'ban_duration' => 'nullable|string',
            ]);

            // Remove campos vazios
            $validated = array_filter($validated, function($value) {
                return $value !== null && $value !== '';
            });

            $result = $this->supabaseAuth->updateUser($id, $validated);

            if (!$result['success']) {
                return response()->json([
                    'error' => $result['error'],
                    'message' => $result['message'] ?? null
                ], 400);
            }

            return response()->json($result['data']);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Dados inválidos',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Deletar usuário
     */
    public function destroy($id): JsonResponse
    {
        $result = $this->supabaseAuth->deleteUser($id);

        if (!$result['success']) {
            return response()->json([
                'error' => $result['error'],
                'message' => $result['message'] ?? null
            ], 400);
        }

        return response()->json(['message' => 'Usuário deletado com sucesso']);
    }

    /**
     * Banir usuário
     */
    public function ban(Request $request, $id): JsonResponse
    {
        $duration = $request->get('duration', '24h');

        $result = $this->supabaseAuth->banUser($id, $duration);

        if (!$result['success']) {
            return response()->json([
                'error' => $result['error'],
                'message' => $result['message'] ?? null
            ], 400);
        }

        return response()->json([
            'message' => 'Usuário banido com sucesso',
            'data' => $result['data']
        ]);
    }

    /**
     * Desbanir usuário
     */
    public function unban($id): JsonResponse
    {
        $result = $this->supabaseAuth->unbanUser($id);

        if (!$result['success']) {
            return response()->json([
                'error' => $result['error'],
                'message' => $result['message'] ?? null
            ], 400);
        }

        return response()->json([
            'message' => 'Usuário desbanido com sucesso',
            'data' => $result['data']
        ]);
    }

    /**
     * Confirmar email do usuário
     */
    public function confirmEmail($id): JsonResponse
    {
        $result = $this->supabaseAuth->confirmUserEmail($id);

        if (!$result['success']) {
            return response()->json([
                'error' => $result['error'],
                'message' => $result['message'] ?? null
            ], 400);
        }

        return response()->json([
            'message' => 'Email confirmado com sucesso',
            'data' => $result['data']
        ]);
    }
}
