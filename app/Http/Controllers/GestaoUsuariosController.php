<?php

namespace App\Http\Controllers;

use App\Models\Setor;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class GestaoUsuariosController extends Controller
{
    public function index()
    {
        $setores = Setor::all();
        $usuarios = Usuario::with('setor')->get();

        return Inertia::render('GestaoUsuarios/GestaoUsuarios', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'setores' => $setores,
            'usuarios' => $usuarios
        ]);
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
                'perfilAcesso' => 'required|string|in:secretarias,setores,admin'
            ]);
            Log::info($validated);

            // Mapear senha para password
            $validated['password'] = Hash::make($validated['senha']);
            unset($validated['senha']);

            $usuario = Usuario::create($validated);

            DB::commit();

            return redirect()->route('gestao-usuarios.index')->with('success', 'Usuário cadastrado com sucesso!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::info($e->errors());
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());
            return back()->with('error', 'Erro ao cadastrar usuário: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'cpf' => 'required|string|max:14',
            'dataNasc' => 'required|date',
            'matricula' => 'required|string|max:20',
            'cargo' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'celular' => 'nullable|string|max:20',
            'setor_id' => 'required|exists:setores,id'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        }

        try {
            $usuario = Usuario::findOrFail($id);
            $usuario->update($request->all());
            return redirect()->route('gestao-usuarios.index')->with('success', 'Usuário atualizado com sucesso!');
        } catch (\Exception $e) {
            return back()->with('error', 'Erro ao atualizar usuário: ' . $e->getMessage());
        }
    }

    public function destroy(Usuario $usuario)
    {
        try {
            // Verificar se o usuário não está tentando excluir a si mesmo
            if ($usuario->id === Auth::id()) {
                return back()->with('error', 'Você não pode excluir seu próprio usuário.');
            }

            $usuario->delete();
            
            return redirect()->route('gestao-usuarios.index')->with('success', 'Usuário excluído com sucesso!');
        } catch (\Exception $e) {
            return back()->with('error', 'Erro ao excluir usuário: ' . $e->getMessage());
        }
    }
}
