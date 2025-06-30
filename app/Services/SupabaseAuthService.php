<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SupabaseAuthService
{
    protected $baseUrl;
    protected $serviceKey;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('services.supabase.url'), '/');
        $this->serviceKey = config('services.supabase.service_role');
    }

    protected function request()
    {
        return Http::withHeaders([
            'apikey' => $this->serviceKey,
            'Authorization' => 'Bearer ' . $this->serviceKey
        ])
        ->acceptJson()
        ->baseUrl("{$this->baseUrl}/auth/v1");
    }

    /**
     * Listar usuários com paginação
     */
    public function listUsers($limit = 50, $page = 1)
    {
        try {
            $response = $this->request()->get('/admin/users', [
                'per_page' => $limit,
                'page' => $page,
            ]);

            return [
                'success' => true,
                'data' => $response->json(),
                'status' => $response->status()
            ];
        } catch (\Exception $e) {
            Log::error('Erro ao listar usuários Supabase: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => 'Erro ao buscar usuários',
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Buscar usuário por ID
     */
    public function getUser($id)
    {
        try {
            $response = $this->request()->get("/admin/users/{$id}");

            return [
                'success' => true,
                'data' => $response->json(),
                'status' => $response->status()
            ];
        } catch (\Exception $e) {
            Log::error('Erro ao buscar usuário Supabase: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => 'Erro ao buscar usuário',
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Criar novo usuário
     */
    public function createUser(array $data)
    {
        try {
            $payload = [
                'email' => $data['email'],
                'password' => $data['password'] ?? null,
                'email_confirm' => $data['email_confirm'] ?? true,
                'user_metadata' => $data['user_metadata'] ?? [],
                'app_metadata' => $data['app_metadata'] ?? [],
            ];

            // Remove campos vazios
            $payload = array_filter($payload, function($value) {
                return $value !== null && $value !== '';
            });

            $response = $this->request()->post('/admin/users', $payload);

            return [
                'success' => true,
                'data' => $response->json(),
                'status' => $response->status()
            ];
        } catch (\Exception $e) {
            Log::error('Erro ao criar usuário Supabase: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => 'Erro ao criar usuário',
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Atualizar usuário
     */
    public function updateUser($id, array $data)
    {
        try {
            $payload = [];

            // Campos permitidos para atualização
            if (isset($data['email'])) {
                $payload['email'] = $data['email'];
            }
            if (isset($data['password'])) {
                $payload['password'] = $data['password'];
            }
            if (isset($data['user_metadata'])) {
                $payload['user_metadata'] = $data['user_metadata'];
            }
            if (isset($data['app_metadata'])) {
                $payload['app_metadata'] = $data['app_metadata'];
            }
            if (isset($data['email_confirm'])) {
                $payload['email_confirm'] = $data['email_confirm'];
            }
            if (isset($data['phone_confirm'])) {
                $payload['phone_confirm'] = $data['phone_confirm'];
            }
            if (isset($data['ban_duration'])) {
                $payload['ban_duration'] = $data['ban_duration'];
            }

            $response = $this->request()->put("/admin/users/{$id}", $payload);

            return [
                'success' => true,
                'data' => $response->json(),
                'status' => $response->status()
            ];
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar usuário Supabase: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => 'Erro ao atualizar usuário',
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Deletar usuário
     */
    public function deleteUser($id)
    {
        try {
            $response = $this->request()->delete("/admin/users/{$id}");

            return [
                'success' => true,
                'data' => $response->json(),
                'status' => $response->status()
            ];
        } catch (\Exception $e) {
            Log::error('Erro ao deletar usuário Supabase: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => 'Erro ao deletar usuário',
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Banir usuário temporariamente
     */
    public function banUser($id, $duration = '24h')
    {
        return $this->updateUser($id, [
            'ban_duration' => $duration
        ]);
    }

    /**
     * Desbanir usuário
     */
    public function unbanUser($id)
    {
        return $this->updateUser($id, [
            'ban_duration' => 'none'
        ]);
    }

    /**
     * Confirmar email do usuário
     */
    public function confirmUserEmail($id)
    {
        return $this->updateUser($id, [
            'email_confirm' => true
        ]);
    }

    /**
     * Buscar usuários por email
     */
    public function searchUsersByEmail($email)
    {
        try {
            $response = $this->request()->get('/admin/users', [
                'filter' => "email.ilike.%{$email}%"
            ]);

            return [
                'success' => true,
                'data' => $response->json(),
                'status' => $response->status()
            ];
        } catch (\Exception $e) {
            Log::error('Erro ao buscar usuários por email: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => 'Erro ao buscar usuários',
                'message' => $e->getMessage()
            ];
        }
    }
}
