<?php

namespace App\Http\Controllers\Web\Espadas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Setor;
use Inertia\Inertia;
use App\Models\Arquivo;

class Espada1Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dfd/Create', [
            'auth' => [
                'user' => Auth::user()->load('setor'),
            ],
            'setor' => DB::table('setores')->get()->toArray(),
        ]);
    }

    /**
     * Display the Espada1 creation form with example data
     */
    public function create()
    {
        return Inertia::render('Espadas/Espada1/Create', [
            'auth' => [
                'user' => Auth::user()->load('setor'),
            ],
            'setor' => Setor::all()->toArray(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'document_type' => 'nullable|string',
            'metadata' => 'nullable|array',
            'processo_id' => 'required|integer'
        ]);

        $planejamento = Arquivo::where('processo_id', $validated['processo_id'])
            ->where('document_type', 'Planejamento')
            ->first();

        $metadata = $validated['metadata'] ?? [];
        $metadata['objeto'] = [
            'objetoContratacao' => $planejamento->metadata['objeto']['objetoContratacao'] ?? '',
            'tipoObjeto' => $metadata['tipoObjeto'] ?? 'itens',
        ];

        $arquivo = Arquivo::create([
            'name' => 'Espada1',
            'description' => $validated['description'] ?? null,
            'document_type' => $validated['document_type'],
            'metadata' => $metadata,
            'status' => 'em andamento ',
            'usuario_id' => auth()->id(),
            'processo_id' => $validated['processo_id']
        ]);

        return redirect()->route('espada1.show', $arquivo);
    }

    /**
     * Display the specified resource.
     */
    public function show(Arquivo $arquivo)
    {
        return Inertia::render('Espadas/Espada1/Show', [
            'auth' => [
                'user' => Auth::user()->load('setor'),
            ],
            'setor' => Setor::all()->toArray(),
            'arquivo' => $arquivo,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Arquivo $arquivo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Arquivo $arquivo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Arquivo $arquivo)
    {
        //
    }
}
