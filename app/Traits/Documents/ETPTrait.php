<?php

namespace App\Traits\Documents;

trait ETPTrait
{
    /**
     * Retorna a estrutura padrão do ETP
     */
    public function getETPStructure(): array
    {
        return [
            'especificacoes' => [
                'objeto' => '',
                'requisitos' => [],
                'criterios' => [],
            ],
            'tecnica' => [
                'solucao' => '',
                'alternativas' => [],
                'recomendacao' => '',
            ],
        ];
    }

    /**
     * Transforma dados do processo para estrutura do ETP
     */
    public function transformProcessoToETP(array $processoData): array
    {
        $structure = $this->getETPStructure();
        
        // Mapeia campos do processo para ETP
        $structure['especificacoes']['objeto'] = $processoData['objeto'] ?? '';
        $structure['tecnica']['solucao'] = $processoData['descricaoNecessidade'] ?? '';
        
        return $structure;
    }

    /**
     * Transforma dados existentes para estrutura do ETP
     */
    public function transformToETP(array $metadata): array
    {
        $structure = $this->getETPStructure();
        
        return array_merge($structure, $metadata);
    }
} 