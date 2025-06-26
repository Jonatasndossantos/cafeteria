<?php

namespace App\Traits\Documents;

trait DFDTrait
{
    /**
     * Retorna a estrutura padrão do DFD
     */
    public function getDFDStructure(): array
    {
        return [
            'analise' => [
                'descricaoNecessidade' => '',
                'justificativa' => '',
                'beneficios' => '',
                'impactos' => '',
            ],
            'fluxo' => [
                'processos' => [],
                'decisoes' => [],
                'dados' => [],
            ],
            'anexos' => [
                'documentos' => [],
                'classificacao' => [],
            ],
        ];
    }

    /**
     * Transforma dados do processo para estrutura do DFD
     */
    public function transformProcessoToDFD(array $processoData): array
    {
        $structure = $this->getDFDStructure();
        
        // Mapeia campos do processo para DFD
        $structure['analise']['descricaoNecessidade'] = $processoData['objeto'] ?? '';
        $structure['analise']['justificativa'] = $processoData['descricaoNecessidade'] ?? '';
        
        return $structure;
    }

    /**
     * Transforma dados existentes para estrutura do DFD
     */
    public function transformToDFD(array $metadata): array
    {
        $structure = $this->getDFDStructure();
        
        return array_merge($structure, $metadata);
    }
} 