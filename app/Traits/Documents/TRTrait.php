<?php

namespace App\Traits\Documents;

trait TRTrait
{
    /**
     * Retorna a estrutura padrão do TR
     */
    public function getTRStructure(): array
    {
        return [
            'metadata' => [
                'numeroTR' => '',
                'numeroETP' => '',
                'numeroDFD' => '',
                'tipoObjeto' => '',
                'modalidadeSugerida' => '',
                'status' => '',
            ],
            'objeto' => [
                'definicao' => '',
                'catmat' => '',
                'regime' => '',
                'justificativa' => '',
                'beneficios' => '',
                'detalhamentoSolucao' => '',
                'justificativaSolucao' => '',
                'referenciaETP' => '',
                'requisitosNecessarios' => '',
                'criteriosSustentabilidade' => '',
                'duracaoInicial' => [
                    'quantidade' => 0,
                    'unidade' => 'meses',
                ],
                'possibilidadeProrrogacao' => '',
                'rotinasExecucao' => '',
                'cronogramaServicos' => '',
                'unidadeRequisitante' => '',
                'responsavelTecnico' => [
                    'nome' => '',
                    'cargo' => '',
                    'setor' => '',
                    'email' => '',
                    'telefone' => '',
                ],
                'atoresEnvolvidos' => '',
                'mecanismosComunicacao' => '',
                'formaAcompanhamento' => '',
                'formaMedicao' => '',
                'periodicidadeMedicao' => '',
                'criteriosAceitacao' => '',
                'prazosPagamento' => '',
                'modalidadeLicitacao' => '',
                'criterioJulgamento' => '',
                'requisitosHabilitacao' => '',
                'qualificacaoTecnicaEconomica' => '',
                'praticasSustentabilidade' => '',
                'criteriosAcessibilidade' => '',
                'rastreabilidadeCertificacoes' => '',
                'valorEstimado' => '',
                'memoriaCalculo' => '',
                'metodologiaPrecos' => '',
                'dotacaoOrcamentaria' => '',
                'compatibilidadeLDO' => '',
                'riscosContratuais' => '',
                'alocacaoRiscos' => '',
                'medidasMitigadoras' => '',
                'responsavelElaboracao' => '',
                'aprovacaoAutoridade' => '',
                'estruturaGestao' => '',
                'equipeFiscalizacao' => '',
                'procedimentosFiscalizacao' => '',
            ],
        ];
    }

    /**
     * Transforma dados do processo para estrutura do TR
     */
    public function transformProcessoToTR(array $processoData): array
    {
        $structure = $this->getTRStructure();
        
        // Mapeia campos do processo para TR
        $structure['objeto']['definicao'] = $processoData['objeto'] ?? '';
        $structure['objeto']['justificativa'] = $processoData['descricaoNecessidade'] ?? '';
        
        return $structure;
    }

    /**
     * Transforma dados existentes para estrutura do TR
     */
    public function transformToTR(array $metadata): array
    {
        $structure = $this->getTRStructure();
        
        return array_merge($structure, $metadata);
    }
} 