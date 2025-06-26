<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::with('setor')->get();
        return response()->json($usuarios);
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'nome' => 'required|string|max:255',
                'cpf' => 'required|string|max:14|unique:gestaoUsuarios',
                'dataNasc' => 'required|date',
                'matricula' => 'required|string|max:255|unique:gestaoUsuarios',
                'cargo' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:gestaoUsuarios',
                'celular' => 'nullable|string|max:20',
                'senha' => 'required|string|min:6',
                'setor_id' => 'nullable|exists:setores,id',
                'perfilAcesso' => 'required|string|in:secretarias,setores'
            ]);

            $validated['senha'] = Hash::make($validated['senha']);

            $usuario = Usuario::create($validated);

            DB::commit();

            return response()->json($usuario->load('setor'), 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erro ao criar usuário',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Usuario $usuario)
    {
        return response()->json($usuario->load('setor'));
    }

    public function update(Request $request, Usuario $usuario)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'nome' => 'sometimes|required|string|max:255',
                'cpf' => ['sometimes', 'required', 'string', 'max:14', Rule::unique('gestaoUsuarios')->ignore($usuario->id)],
                'dataNasc' => 'sometimes|required|date',
                'matricula' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('gestaoUsuarios')->ignore($usuario->id)],
                'cargo' => 'sometimes|required|string|max:255',
                'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique('gestaoUsuarios')->ignore($usuario->id)],
                'celular' => 'nullable|string|max:20',
                'senha' => 'sometimes|required|string|min:6',
                'setor_id' => 'nullable|exists:setores,id',
                'perfilAcesso' => 'sometimes|required|string|in:secretarias,setores'
            ]);

            if (isset($validated['senha'])) {
                $validated['senha'] = Hash::make($validated['senha']);
            }

            $usuario->update($validated);

            DB::commit();

            return response()->json($usuario->load('setor'));
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erro ao atualizar usuário',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Usuario $usuario)
    {
        try {
            DB::beginTransaction();
            $usuario->delete();
            DB::commit();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erro ao excluir usuário',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 