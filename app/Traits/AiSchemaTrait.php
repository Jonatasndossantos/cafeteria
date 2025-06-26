<?php

namespace App\Traits;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;

trait AiSchemaTrait
{
    protected function getJsonSchema(string $type): ObjectSchema
    {
        return match ($type) {
            'institutional' => $this->getInstitutionalSchema(),
            'preliminaryStudy' => $this->getPreliminaryStudySchema(),
            'referenceTerms' => $this->getReferenceTermsSchema(),
            'demand' => $this->getDemandSchema(),
            'riskMatrix' => $this->getRiskMatrixSchema(),
            default => new ObjectSchema('empty', 'Empty schema')
        };
    }

    protected function getInstitutionalSchema(): ObjectSchema
    {
        return new ObjectSchema(
            name: 'institutional',
            description: 'Schema for institutional data',
            properties: [
                new StringSchema('cidade', 'Nome da cidade'),
                new StringSchema('cidade_maiusculo', 'Nome da cidade em maiúsculas'),
                new StringSchema('endereco', 'Endereço completo'),
                new StringSchema('cep', 'CEP da instituição'),
                new StringSchema('nome_autoridade', 'Nome da autoridade responsável'),
                new StringSchema('nome_elaborador', 'Nome do elaborador do documento'),
                new StringSchema('cargo_autoridade', 'Cargo da autoridade responsável'),
                new StringSchema('data_extenso', 'Data por extenso'),
                new StringSchema('data_aprovacao', 'Data de aprovação'),
                new StringSchema('cargo_elaborador', 'Cargo do elaborador'),
                new StringSchema('nome_autoridade_aprovacao', 'Nome da autoridade de aprovação'),
                new StringSchema('cargo_autoridade_aprovacao', 'Cargo da autoridade de aprovação'),
            ],
            requiredFields: [
                'cidade', 'cidade_maiusculo', 'endereco', 'cep', 'nome_autoridade',
                'nome_elaborador', 'cargo_autoridade', 'data_extenso', 'data_aprovacao',
                'cargo_elaborador', 'nome_autoridade_aprovacao', 'cargo_autoridade_aprovacao'
            ]
        );
    }

    protected function getPreliminaryStudySchema(): ObjectSchema
    {
        return new ObjectSchema(
            name: 'preliminaryStudy',
            description: 'Schema for preliminary study data',
            properties: [
                new StringSchema('justificativa', 'Justificativa do estudo'),
                new StringSchema('objeto', 'Objeto do estudo'),
                new StringSchema('fundamento_legal', 'Fundamento legal'),
                new StringSchema('alternativas', 'Alternativas analisadas'),
                new StringSchema('riscos', 'Riscos identificados'),
                new StringSchema('estimativa_valor', 'Estimativa de valor'),
                new StringSchema('prazo_estimado', 'Prazo estimado'),
                new StringSchema('impacto_orcamentario', 'Impacto orçamentário'),
                new StringSchema('conclusao', 'Conclusão do estudo'),
            ],
            requiredFields: [
                'justificativa', 'objeto', 'fundamento_legal', 'alternativas',
                'riscos', 'estimativa_valor', 'prazo_estimado', 'impacto_orcamentario',
                'conclusao'
            ]
        );
    }

    protected function getReferenceTermsSchema(): ObjectSchema
    {
        return new ObjectSchema(
            name: 'referenceTerms',
            description: 'Schema for reference terms data',
            properties: [
                new StringSchema('objeto', 'Objeto do termo de referência'),
                new StringSchema('justificativa', 'Justificativa'),
                new StringSchema('objetivos', 'Objetivos'),
                new StringSchema('escopo', 'Escopo do trabalho'),
                new StringSchema('requisitos', 'Requisitos'),
                new StringSchema('criterios_avaliacao', 'Critérios de avaliação'),
                new StringSchema('prazo_execucao', 'Prazo de execução'),
                new StringSchema('valor_estimado', 'Valor estimado'),
            ],
            requiredFields: [
                'objeto', 'justificativa', 'objetivos', 'escopo',
                'requisitos', 'criterios_avaliacao', 'prazo_execucao', 'valor_estimado'
            ]
        );
    }

    protected function getDemandSchema(): ObjectSchema
    {
        return new ObjectSchema(
            name: 'demand',
            description: 'Schema for demand data',
            properties: [
                new StringSchema('identificacao', 'Identificação da demanda'),
                new StringSchema('justificativa', 'Justificativa'),
                new StringSchema('objetivos', 'Objetivos'),
                new StringSchema('beneficios', 'Benefícios'),
                new StringSchema('impactos', 'Impactos'),
                new StringSchema('prazo_necessidade', 'Prazo de necessidade'),
                new StringSchema('valor_estimado', 'Valor estimado'),
            ],
            requiredFields: [
                'identificacao', 'justificativa', 'objetivos', 'beneficios',
                'impactos', 'prazo_necessidade', 'valor_estimado'
            ]
        );
    }

    protected function getRiskMatrixSchema(): ObjectSchema
    {
        return new ObjectSchema(
            name: 'riskMatrix',
            description: 'Schema for risk matrix data',
            properties: [
                new StringSchema('identificacao_riscos', 'Identificação dos riscos'),
                new StringSchema('analise_probabilidade', 'Análise de probabilidade'),
                new StringSchema('analise_impacto', 'Análise de impacto'),
                new StringSchema('medidas_mitigacao', 'Medidas de mitigação'),
                new StringSchema('responsaveis', 'Responsáveis'),
                new StringSchema('monitoramento', 'Monitoramento'),
            ],
            requiredFields: [
                'identificacao_riscos', 'analise_probabilidade', 'analise_impacto',
                'medidas_mitigacao', 'responsaveis', 'monitoramento'
            ]
        );
    }
} 