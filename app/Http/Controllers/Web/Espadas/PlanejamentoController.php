<?php

namespace App\Http\Controllers\Web\Espadas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Arquivo;
use App\Models\Processo;
use App\Models\Setor;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\DocumentResource;

class PlanejamentoController extends Controller
{
    /**
     * Cria ou atualiza um documento
     */
    public function store(Request $request)
    {
        // Log::info('PlanejamentoController@store', $request->all());
        $validated = $request->validate([
            'id' => 'nullable|integer',
            'processo_id' => 'nullable|integer',
            'document_type' => 'required|string',
            //
            'name' => 'nullable|string|max:255',
            'metadata' => 'nullable|json',
            'description' => 'nullable|string',
            'vinculacoes' => 'nullable|array'
        ]);


        //=================store==============================
        $metadata = $validated['metadata'] ? json_decode($validated['metadata'], true) : [];

        if ($validated['document_type'] == 'Planejamento') {
            $processo = Processo::find($validated['processo_id']);
            // dd('processo', ['processo' => $processo->objeto]);
            $metadata['objeto'] = [
                'objetoContratacao' => $processo->objeto,
                'tipoObjeto' => $metadata['tipoObjeto'] ?? 'itens',
            ];
        }

        // Log::info('testando2');
        // Cria novo documento apenas se não existir
        $arquivo = Arquivo::create([
            'processo_id' => $validated['processo_id'],
            'document_type' => $validated['document_type'],
            'name' => $validated['name'] ?? null,
            'description' => $validated['description'] ?? null,
            'metadata' => $metadata,
            'status' => 'em andamento',
            'usuario_id' => Auth::id(),
            'vinculacoes' => $validated['vinculacoes'] ?? null,
        ]);
        // Log::info('Arquivo criado com sucesso');

        return redirect()->route('planejamento.show', $arquivo->id);
    }

    public function show($id)
    {
        $arquivo = Arquivo::find($id);
        return Inertia::render("Espadas/Planejamento/Create", [
            'auth' => [
                'user' => Auth::user()
            ],
            'setor' => Setor::all()->toArray(),
            'document' => $arquivo
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'processo_id' => 'nullable|integer',
            'document_type' => 'nullable|string',
            'name' => 'nullable|string|max:255',
            'metadata' => 'nullable|json',
            'description' => 'nullable|string',
            'vinculacoes' => 'nullable|array'
        ]);

        // Decodifica metadata JSON se presente
        if (isset($validated['metadata'])) {
            $validated['metadata'] = json_decode($validated['metadata'], true);
        }

        $arquivo = Arquivo::find($id);
        $arquivo->update($validated);

        return redirect()->route('planejamento.show', $id);
    }
}
