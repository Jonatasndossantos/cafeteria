<?php

namespace App\Http\Resources;

use App\Traits\Documents\PlanejamentoTrait;
use App\Traits\Documents\DFDTrait;
use App\Traits\Documents\ETPTrait;
use App\Traits\Documents\TRTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    use PlanejamentoTrait, DFDTrait, ETPTrait, TRTrait;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $baseData = [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'document_type' => $this->document_type,
            'status' => $this->status,
            'processo_id' => $this->processo_id,
            'usuario_id' => $this->usuario_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        // Garante estrutura consistente baseada no tipo de documento
        $transformedMetadata = $this->transformMetadataByType($this->document_type, $this->metadata ?? []);
        
        return array_merge($baseData, [
            'metadata' => $transformedMetadata,
            'vinculacoes' => $this->vinculacoes ?? [],
        ]);
    }

    /**
     * Transforma metadata baseado no tipo de documento
     */
    private function transformMetadataByType(string $type, array $metadata): array
    {
        return match ($type) {
            'Planejamento' => $this->transformToPlanejamento($metadata),
            'DFD' => $this->transformToDFD($metadata),
            'ETP' => $this->transformToETP($metadata),
            'TR' => $this->transformToTR($metadata),
            default => $metadata,
        };
    }
    
    private function transformToPlanejamento(array $metadata): array
    {
        // Estrutura padrão do Planejamento baseada no PlanejamentoTrait
        //{"numero_processo":"PA-2025\/2","modalidade":null,"data":"2025-06-20","numero_documento":"DOC-2025\/1","objeto":"testando2","setor_id":"1","tipo":"processo","status":"Em andamento","autenticidade":{"nivel":"Pendente","assinaturaDigital":"false"},"valor":"0","is_draft":"false","unidadeIniciadora":"2"}
        $structure = [
            'objeto' => [
                'objetoContratacao' => $metadata['objeto'] ?? '',
                'tipoObjeto' => $metadata['tipoObjeto'] ?? 'itens',
            ],
            'detalhamento' => [
                'justificativaTecnica' => $metadata['descricaoNecessidade'] ?? '',
                'beneficiosEsperados' => $metadata['beneficiosEsperados'] ?? '',
                'riscosIdentificados' => $metadata['riscosIdentificados'] ?? '',
                'alternativasAnalisadas' => $metadata['alternativasAnalisadas'] ?? '',
                'mesEstimado' => $metadata['mesEstimado'] ?? '',
                'grauImportancia' => $metadata['grauImportancia'] ?? '',
                'historicoConsumo' => $metadata['historicoConsumo'] ?? '',
                'criteriosSustentabilidade' => $metadata['criteriosSustentabilidade'] ?? false,
                'detalheSustentabilidade' => $metadata['detalheSustentabilidade'] ?? '',
                'normasTecnicas' => $metadata['normasTecnicas'] ?? '',
            ],
            'tipoContratacao' => $metadata['tipoContratacao'] ?? 'itens',
            'vinculacoes' => [
                // 'ppa' => ($metadata['vinculacoes'] ?? [])['ppa'] ?? '',
                // 'ldo' => ($metadata['vinculacoes'] ?? [])['ldo'] ?? '',
                // 'loa' => ($metadata['vinculacoes'] ?? [])['loa'] ?? '',
            ],
            // 'demandasCorrelatas' => [
            //     'vinculacaoOutrasDemandas' => ($metadata['demandasCorrelatas'] ?? [])['vinculacaoOutrasDemandas'] ?? false,
            //     'justificativaVinculacao' => ($metadata['demandasCorrelatas'] ?? [])['justificativaVinculacao'] ?? '',
            //     'impactosEsperados' => ($metadata['demandasCorrelatas'] ?? [])['impactosEsperados'] ?? '',
            //     'riscosPreliminares' => ($metadata['demandasCorrelatas'] ?? [])['riscosPreliminares'] ?? '',
            // ],
            // Campos adicionais do formData que podem vir do processo
            'identificacao' => [
                'unidadeIniciadora' => $metadata['unidadeIniciadora'] ?? '',
                'responsavelNome' => $metadata['responsavelNome'] ?? '',
                'responsavelCargo' => $metadata['responsavelCargo'] ?? '',
                'responsavelSetor' => $metadata['responsavelSetor'] ?? '',
                'descricaoNecessidade' => $metadata['descricaoNecessidade'] ?? '',
                'statusPlanejamento' => $metadata['statusPlanejamento'] ?? '',
            ],
            // 'numero_processo' => $metadata['numero_processo'] ?? '',
            // 'modalidade' => $metadata['modalidade'] ?? '',
            // 'data' => $metadata['data'] ?? '',
            // 'dataInicio' => $metadata['dataInicio'] ?? '',
            // 'setor_id' => $metadata['setor_id'] ?? '',
            // 'valor' => $metadata['valor'] ?? 0,
            // 'tipo' => $metadata['tipo'] ?? '',
            // 'secretaria' => $metadata['secretaria'] ?? '',
            // 'numero_documento' => $metadata['numero_documento'] ?? '',
            // 'tags' => $metadata['tags'] ?? [],
            // 'autenticidade' => $metadata['autenticidade'] ?? [
            //     'nivel' => 'Pendente',
            //     'assinaturaDigital' => false
            // ],
            // 'is_draft' => $metadata['is_draft'] ?? false,
            // // Campos específicos do processo
            // 'status' => $metadata['status'] ?? 'Em andamento',
            // 'responsavelNome' => $metadata['responsavelNome'] ?? '',
            // 'responsavelCargo' => $metadata['responsavelCargo'] ?? '',
            // 'responsavelSetor' => $metadata['responsavelSetor'] ?? '',
        ];
        
        // Faz merge dos dados existentes com a estrutura padrão
        return array_merge($structure, $metadata);
    }

    private function transformToDFD(array $metadata): array
    {
        return $metadata;
    }

    private function transformToETP(array $metadata): array
    {
        return $metadata;
    }

    private function transformToTR(array $metadata): array
    {
        return $metadata;
    }
}
