<?php

namespace App\Http\Controllers;

use App\Models\Arquivo;
use App\Models\Processo;
use App\Models\Setor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Http\Resources\DocumentResource;

class DocumentController extends Controller
{
    public function show(string $type, Request $request)
    {
        $processo_id = $request->input('processo_id');
        Log::info('processo_id', ['processo_id' => $processo_id]);
        $document = Arquivo::where('document_type', $type)->where('processo_id', $processo_id)->first();
        $capitalizedType = ucfirst($type);
        return Inertia::render("Espadas/{$capitalizedType}/Create", [
            'auth' => [
                'user' => Auth::user()
            ],
            'setor' => Setor::all(),
            'document' => $document ? new DocumentResource($document) : null
        ]);
    }

    /**
     * Cria ou atualiza um documento
     */
    public function store(Request $request)
    {
        Log::info('DocumentController@store', $request->all());
        $validated = $request->validate([
            'id' => 'nullable|integer',
            'processo_id' => 'nullable|integer',
            'document_type' => 'required|string',
            //
            'name' => 'nullable|string|max:255',
            'metadata' => 'nullable|array',
            'description' => 'nullable|string',
            'vinculacoes' => 'nullable|array'
        ]);
        Log::info('testando');

        // Corrigir a estrutura dos items se foram achatados pelo form data
        if (isset($validated['metadata']['items']) && is_array($validated['metadata']['items'])) {
            $validated['metadata']['items'] = $this->reconstructItems($validated['metadata']['items']);
        }
        //=================update==============================
        if (isset($validated['id']) && $validated['id']) {
            $arquivo = Arquivo::find($validated['id']);
            if ($arquivo) {
                Log::info('id', ['id' => $validated['id']]);
                $request->merge(['id' => $validated['id'], 'processo_id' => $validated['processo_id']]);
                return $this->show($validated['document_type'], $request);

            }
        }

        //=================create==============================
        $metadata = $validated['metadata'] ?? [];
        
        if ($validated['document_type'] == 'Planejamento') {
            $processo = Processo::find($validated['processo_id']);
            // dd('processo', ['processo' => $processo->objeto]);
            $metadata['objeto'] = [
                'objetoContratacao' => $processo->objeto,
                'tipoObjeto' => $metadata['tipoObjeto'] ?? 'itens',
            ];
        }
        
        Log::info('testando2');
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
        Log::info('Arquivo criado com sucesso');

        return Inertia::render("Espadas/{$validated['document_type']}/Create", [
            'auth' => [
                'user' => Auth::user()
            ],
            'setor' => Setor::all()->toArray(),
            'document' => new DocumentResource($arquivo)
        ]);
    }
    
    /**
     * Exclui um documento
     */
    public function destroy(Arquivo $arquivo)
    {
        $arquivo->delete();
        return response()->json(['message' => 'Documento excluído com sucesso']);
    }

    public function edit(Arquivo $arquivo)
    {
        return Inertia::render('Documents/Edit', [
            'document' => $arquivo
        ]);
    }

    /**
     * Get, create or update a document for a specific type
     */
    public function getOrCreateDocument(string $type, Request $request)
    {
        // Get parameters from request
        $processo_id = $request->input('processo_id');
        $id = $request->input('id');
        
        // ==================get==============================
        if ($processo_id) {
            $document = Arquivo::where('processo_id', $processo_id)
                ->where('document_type', $type)
                ->first();
            if ($document) {
                return Inertia::render("Espadas/{$type}/Create", [
                    'auth' => [
                        'user' => Auth::user()
                    ],
                    'setor' => Setor::all()->toArray(),
                    'document' => new DocumentResource($document)
                ]);
            }
        }

        // ==================create==============================
        return $this->store($request);
    }


















/**
     * Reconstrói a estrutura dos items que foram achatados pelo form data
     */
    private function reconstructItems(array $items): array
    {
        Log::info('Processando items:', $items);
        
        // Se já está estruturado corretamente (array de objetos), retorna como está
        if (isset($items[0]) && is_array($items[0]) && isset($items[0]['id'])) {
            Log::info('Items já estruturados corretamente');
            return $items;
        }

        // Se é um array simples com índices numéricos, pode estar correto também
        if (count($items) > 0 && is_numeric(array_keys($items)[0])) {
            $allAreObjects = true;
            foreach ($items as $item) {
                if (!is_array($item)) {
                    $allAreObjects = false;
                    break;
                }
            }
            if ($allAreObjects) {
                Log::info('Items são array de objetos');
                return $items;
            }
        }

        // Se os items foram achatados pelo form data, reconstrói
        Log::info('Reconstruindo items achatados');
        $reconstructed = [];
        $currentItem = [];
        $itemKeys = ['id', 'item', 'codigo', 'descricao', 'catmat', 'unidade', 'quantidade', 
                     'valorUnitario', 'valorTotal', 'precoUnitario', 'precoComBDI', 'total'];

        foreach ($items as $key => $value) {
            if ($key === 'id' && !empty($currentItem)) {
                // Salvar o item anterior e começar um novo
                $reconstructed[] = $currentItem;
                $currentItem = ['id' => $value];
            } elseif (in_array($key, $itemKeys) || is_numeric($key)) {
                if (is_numeric($key)) {
                    // Se a chave é numérica, pode ser um item completo
                    if (is_array($value)) {
                        $reconstructed[] = $value;
                    }
                } else {
                    $currentItem[$key] = $value;
                }
            }
        }

        // Adicionar o último item se não estiver vazio
        if (!empty($currentItem)) {
            $reconstructed[] = $currentItem;
        }

        Log::info('Items reconstruídos:', [
            'original_count' => count($items),
            'reconstructed_count' => count($reconstructed),
            'reconstructed' => $reconstructed
        ]);

        return $reconstructed;
    }
}