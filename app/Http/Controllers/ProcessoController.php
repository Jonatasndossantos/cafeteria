<?php

namespace App\Http\Controllers;

use App\Models\Processo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setor;
use Illuminate\Support\Facades\Auth;
use App\Models\Arquivo;

class ProcessoController extends Controller
{
    public function store(Request $request)
    {
        try {
            //\Log::info('ProcessoController@store - Iniciando criação de processo', $request->all());

            $validated = $request->validate([
                'numero_processo' => 'required|string|unique:processos',
                'modalidade' => 'nullable|string',
                'data' => 'required|date',
                'objeto' => 'required|string',
                'setor_id' => 'required|exists:setores,id',
                'tipo' => 'nullable|string',
                'status' => 'required|string',
                'tags' => 'nullable|array',
                'autenticidade' => 'nullable|array',
                'valor' => 'required|numeric',
                'is_draft' => 'boolean'
            ]);

            //\Log::info('ProcessoController@store - Dados validados', $validated);

            $processo = Processo::create([
                'numero_processo' => $validated['numero_processo'],
                'modalidade' => $validated['modalidade'],
                'data' => $validated['data'],
                'objeto' => $validated['objeto'],
                'setor_id' => $validated['setor_id'],
                'usuario_id' => Auth::id(),
                'tipo' => $validated['tipo'],
                'status' => $validated['status'],
                'valor' => $validated['valor'],
                'tags' => $validated['tags'] ?? [],
                'autenticidade' => $validated['autenticidade'] ?? [
                    'nivel' => 'Pendente',
                    'assinaturaDigital' => false
                ]
            ]);

           // \Log::info('ProcessoController@store - Processo criado com sucesso', ['id' => $processo->id]);

            $arquivos = Arquivo::where('processo_id', $processo->id)->get();
            $arquivos = $arquivos->load('usuario');

            $processo = $processo->load('setor', 'usuario');

            return Inertia::render('Processo/Processos/Show', [
                'processo' => $processo,
                'arquivos' => $arquivos,
                'auth' => [
                    'user' => auth()->user()
                ],
                'setor' => Setor::all()
            ]);

        } catch (\Exception $e) {
            \Log::error('ProcessoController@store - Erro ao criar processo', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->back()->with('error', 'Erro ao criar processo: ' . $e->getMessage());

        }
    }

    public function index()
    {
        try {
            // \Log::info('ProcessoController@index - Iniciando busca de processos');

            $processos = Processo::with('setor')
                ->orderBy('created_at', 'desc')
                ->get();

            // \Log::info('ProcessoController@index - Processos encontrados:', ['count' => $processos->count()]);

            return Inertia::render('Processo/Processos', [
                'processos' => $processos,
                'auth' => [
                    'user' => auth()->user()
                ],
                'setores' => Setor::all()
            ]);
        } catch (\Exception $e) {
            \Log::error('ProcessoController@index - Erro:', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function ambienteServidor()
    {
        try {

            $processos = Processo::with('setor')
                ->orderBy('created_at', 'desc')
                ->get();


            return Inertia::render('AmbienteServidor/AmbienteServidor', [
                'processos' => $processos,
                'auth' => [
                    'user' => auth()->user()
                ],
                'setor' => Setor::all()
            ]);
        } catch (\Exception $e) {
            \Log::error('ProcessoController@index - Erro:', ['error' => $e->getMessage()]);
            throw $e;
        }
    }
    public function show($numeroProcesso)
    {
        $processo = Processo::where('id', $numeroProcesso)->first();
        $arquivos = Arquivo::where('processo_id', $numeroProcesso)->get();
        $arquivos = $arquivos->load('usuario');
        $arquivosAtual = Arquivo::where('processo_id', $numeroProcesso)->orderBy('created_at', 'desc')->first();
        $processo = $processo->load('usuario');

        // dd($processo);
        return Inertia::render('Processo/Processos/Show', [
            'processo' => $processo,
            'arquivos' => $arquivos,
            'arquivosAtual' => $arquivosAtual,
            'auth' => [
                'user' => auth()->user()
            ],
            'setor' => Setor::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Processo/Processos', [
            'auth' => [
                'user' => auth()->user()
            ],
            'setor' => Setor::all()
        ]);
    }




}