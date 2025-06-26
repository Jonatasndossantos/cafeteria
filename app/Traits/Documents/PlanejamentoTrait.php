<?php

namespace App\Traits\Documents;

trait PlanejamentoTrait
{
    /**
     * Retorna a estrutura padrão do Planejamento
     */
    public function getPlanejamentoStructure(): array
    {
        return [
            'objeto' => [
                'objetoContratacao' => '',
                'tipoObjeto' => 'bens',
            ],
            'detalhamento' => [
                'justificativaTecnica' => '',
                'beneficiosEsperados' => '',
                'riscosIdentificados' => '',
                'alternativasAnalisadas' => '',
                'mesEstimado' => '',
                'grauImportancia' => '',
                'historicoConsumo' => '',
                'criteriosSustentabilidade' => false,
                'detalheSustentabilidade' => '',
                'normasTecnicas' => '',
            ],
            'compartilhamento' => [
                'podeCompartilhar' => false,
                'outrasUnidades' => [],
                'justificativaCompartilhamento' => '',
            ],
            'vinculacoes' => [
                'ppa' => '',
                'ldo' => '',
                'loa' => '',
            ],
            'pca' => [
                'items' => [],
                'selectedItems' => [],
            ],
            'duplicidade' => [
                'demandasSimilares' => [],
                'analiseCompleta' => false,
            ],
            'demandasCorrelatas' => [
                'vinculacaoOutrasDemandas' => false,
                'justificativaVinculacao' => '',
                'impactosEsperados' => '',
                'riscosPreliminares' => '',
            ],
        ];
    }

    /**
     * Transforma dados do processo para estrutura do Planejamento
     */
    public function transformProcessoToPlanejamento(array $processoData): array
    {
        $structure = $this->getPlanejamentoStructure();
        
        // Mapeia campos do processo para planejamento
        $structure['objeto']['objetoContratacao'] = $processoData['objeto'] ?? '';
        $structure['detalhamento']['justificativaTecnica'] = $processoData['descricaoNecessidade'] ?? '';
        
        return $structure;
    }

    /**
     * Transforma dados existentes para estrutura do Planejamento
     */
    public function transformToPlanejamento(array $metadata): array
    {
        $structure = $this->getPlanejamentoStructure();
        
        // Faz merge dos dados existentes com a estrutura padrão
        return array_merge($structure, $metadata);
    }
} 