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
    /**
     * Exibe um documento específico
     */
    public function show(string $type, Request $request)
    {
        $processo_id = $request->input('processo_id');
        Log::info('Buscando documento', ['processo_id' => $processo_id, 'type' => $type]);
        
        $document = Arquivo::where('document_type', $type)
                          ->where('processo_id', $processo_id)
                          ->first();
        
        if (!$document) {
            return response()->json(['message' => 'Documento não encontrado'], 404);
        }
        
        return response()->json(new DocumentResource($document));
    }

    /**
     * Cria ou atualiza um documento
     */
    public function store(Request $request)
    {
        Log::info('DocumentController@store', $request->all());
        
        $validated = $request->validate([
            'id' => 'nullable|integer',
            'processo_id' => 'required|integer',
            'document_type' => 'required|string',
            'name' => 'nullable|string|max:255',
            'metadata' => 'nullable|array',
            'description' => 'nullable|string',
            'vinculacoes' => 'nullable|array'
        ]);

        // Se tem ID, é uma atualização
        if (isset($validated['id']) && $validated['id']) {
            $arquivo = Arquivo::find($validated['id']);
            if ($arquivo) {
                Log::info('Atualizando documento existente', ['id' => $validated['id']]);
                
                $arquivo->update([
                    'name' => $validated['name'] ?? $arquivo->name,
                    'description' => $validated['description'] ?? $arquivo->description,
                    'metadata' => $validated['metadata'] ?? $arquivo->metadata,
                    'vinculacoes' => $validated['vinculacoes'] ?? $arquivo->vinculacoes,
                ]);
                
                return response()->json([
                    'message' => 'Documento atualizado com sucesso',
                    'document' => new DocumentResource($arquivo)
                ]);
            }
        }

        // Cria novo documento
        Log::info('Criando novo documento');
        
        $arquivo = Arquivo::create([
            'processo_id' => $validated['processo_id'],
            'document_type' => $validated['document_type'],
            'name' => $validated['name'] ?? null,
            'description' => $validated['description'] ?? null,
            'metadata' => $validated['metadata'] ?? [],
            'status' => 'em andamento',
            'usuario_id' => Auth::id(),
            'vinculacoes' => $validated['vinculacoes'] ?? null,
        ]);
        
        Log::info('Documento criado com sucesso', ['id' => $arquivo->id]);
        
        return response()->json([
            'message' => 'Documento criado com sucesso',
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

    /**
     * Edita um documento
     */
    public function edit(Arquivo $arquivo)
    {
        return Inertia::render('Documents/Edit', [
            'document' => $arquivo
        ]);
    }

    /**
     * Busca ou cria um documento para um tipo específico
     */
    public function getOrCreateDocument(string $type, Request $request)
    {
        $processo_id = $request->input('processo_id');
        
        if (!$processo_id) {
            return response()->json(['message' => 'processo_id é obrigatório'], 400);
        }
        
        // Busca documento existente
        $document = Arquivo::where('processo_id', $processo_id)
                          ->where('document_type', $type)
                          ->first();
        
        if ($document) {
            Log::info('Documento encontrado', ['id' => $document->id, 'type' => $type]);
            return response()->json([
                'message' => 'Documento encontrado',
                'document' => new DocumentResource($document)
            ]);
        }
        
        // Cria novo documento se não existir
        Log::info('Criando novo documento', ['type' => $type, 'processo_id' => $processo_id]);
        return $this->store($request);
    }

    /**
     * Lista documentos por processo
     */
    public function listByProcesso(Request $request)
    {
        $processo_id = $request->input('processo_id');
        
        if (!$processo_id) {
            return response()->json(['message' => 'processo_id é obrigatório'], 400);
        }
        
        $documentos = Arquivo::where('processo_id', $processo_id)
                           ->with('usuario')
                           ->get();
        
        return response()->json([
            'documentos' => DocumentResource::collection($documentos)
        ]);
    }
}