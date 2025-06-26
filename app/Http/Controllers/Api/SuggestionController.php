<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\ArraySchema;
use Prism\Prism\Schema\StringSchema;
use Prism\Prism\Schema\NumberSchema;

/**
 * Controller especializado em geração de sugestões para documentos licitatórios.
 * 
 * Utiliza engenharia de prompt avançada para gerar sugestões técnicas e juridicamente
 * fundamentadas para diferentes tipos de campos em documentos de licitação, seguindo
 * as diretrizes da Lei nº 14.133/2021 e demais normativos aplicáveis.
 * 
 * Campos suportados:
 * - descricao_necessidade: Descrição da necessidade pública
 * - objeto_contratacao: Especificação do objeto a ser contratado
 * - justificativa_contratacao: Fundamentação legal e técnica
 * - requisitos_tecnicos: Especificações técnicas e funcionais
 * - criterios_julgamento: Critérios de avaliação das propostas
 * - [campos genéricos]: Outros campos com prompt padrão
 */
class SuggestionController extends Controller
{
    private const MAX_SUGGESTIONS = 2;

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): JsonResponse
    {
        dd($request->all());
        Log::info('Request received', $request->all());
        try {
            // Validação do campo obrigatório
            if (!$request->has('field')) {
                return response()->json([
                    'error' => 'O campo "field" é obrigatório'
                ], 400);
            }
            Log::info('Request received', $request->all());
            $field = $request->input('field');
            $currentValue = $request->input('currentValue', '') ?? '';

            // Gera uma chave única para o cache baseada nos parâmetros
            $cacheKey = "suggestions:{$field}:" . md5($currentValue);

            // Tenta obter do cache primeiro
            return Cache::remember($cacheKey, now()->addHours(24), function () use ($field, $currentValue) {
                Log::info('Gerando sugestões', [
                    'field' => $field,
                    'currentValue' => $currentValue
                ]);

                $schema = $this->getSuggestionSchema();
                $prompt = $this->buildPrompt($field, $currentValue);

                // Gera as sugestões usando Prism
                $response = Prism::structured()
                    ->using(Provider::OpenAI, 'gpt-4o-2024-08-06')
                    ->withSystemPrompt($this->getSystemRole())
                    ->withPrompt($prompt)
                    ->withSchema($schema)
                    ->asStructured();

                // Limita o número de sugestões
                // if (isset($response['suggestions']) && is_array($response['suggestions'])) {
                //     $response['suggestions'] = array_slice($response['suggestions'], 0, self::MAX_SUGGESTIONS);
                // }

                Log::info('Sugestões geradas com sucesso', [
                    'field' => $field,
                    'response' => $response
                ]);

                return response()->json($response->structured);
            });

        } catch (\Exception $e) {
            Log::error('Erro ao gerar sugestões', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Erro ao gerar sugestões: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Constrói o prompt baseado no campo e valor atual.
     */
    private function buildPrompt(string $field, string $currentValue): string
    {
        $basePrompt = "Analise o seguinte texto de documento licitatório e forneça exatamente " . self::MAX_SUGGESTIONS . " sugestões de melhorias técnicas e estruturais:";
        
        // Prompts específicos para diferentes campos de licitação
        switch ($field) {
            case 'descricao_necessidade':
                return $basePrompt . "\n\n" . 
                       "Texto atual: \"$currentValue\"\n\n" .
                       "Forneça exatamente " . self::MAX_SUGGESTIONS . " sugestões para aprimorar a descrição da necessidade, " .
                       "seguindo rigorosamente estas diretrizes:\n\n" .
                       "CONFORMIDADE LEGAL:\n" .
                       "- Adequação à Lei nº 14.133/2021 (Nova Lei de Licitações)\n" .
                       "- Compatibilidade com IN SEGES nº 05/2017 e nº 65/2021\n" .
                       "- Fundamentação em princípios da Administração Pública\n\n" .
                       "ESTRUTURA E CONTEÚDO:\n" .
                       "- Justificativa técnica consistente da necessidade pública\n" .
                       "- Fundamentação da demanda institucional\n" .
                       "- Alinhamento com missão e competências do órgão\n" .
                       "- Demonstração clara do interesse público\n" .
                       "- Análise de viabilidade técnica e operacional\n\n" .
                       "QUALIDADE TEXTUAL:\n" .
                       "- Densidade argumentativa (mínimo 400-600 caracteres)\n" .
                       "- Linguagem formal, precisa e impessoal\n" .
                       "- Terminologia técnica adequada ao setor público\n" .
                       "- Conceitos: eficiência, economicidade, continuidade do serviço público";

            case 'objeto_contratacao':
                return $basePrompt . "\n\n" . 
                       "Texto atual: \"$currentValue\"\n\n" .
                       "Forneça exatamente " . self::MAX_SUGGESTIONS . " sugestões para aprimorar a descrição do objeto de contratação:\n\n" .
                       "ESPECIFICAÇÕES TÉCNICAS:\n" .
                       "- Descrição clara e precisa do objeto\n" .
                       "- Especificações técnicas mensuráveis\n" .
                       "- Critérios objetivos de qualidade\n" .
                       "- Normas técnicas aplicáveis\n\n" .
                       "ESTRUTURA LEGAL:\n" .
                       "- Conformidade com art. 23 da Lei 14.133/2021\n" .
                       "- Definição clara de escopo e limites\n" .
                       "- Evitar direcionamento ou restrições desnecessárias\n" .
                       "- Garantir competitividade do certame";

            case 'justificativa_contratacao':
                return $basePrompt . "\n\n" . 
                       "Texto atual: \"$currentValue\"\n\n" .
                       "Forneça exatamente " . self::MAX_SUGGESTIONS . " sugestões para aprimorar a justificativa da contratação:\n\n" .
                       "FUNDAMENTAÇÃO LEGAL:\n" .
                       "- Base legal da contratação (Lei 14.133/2021)\n" .
                       "- Competência institucional do órgão\n" .
                       "- Princípios da Administração Pública\n\n" .
                       "JUSTIFICATIVA TÉCNICA:\n" .
                       "- Necessidade pública demonstrada\n" .
                       "- Impacto na prestação do serviço público\n" .
                       "- Análise de alternativas consideradas\n" .
                       "- Benefícios esperados para a sociedade\n" .
                       "- Consequências da não contratação";

            case 'requisitos_tecnicos':
                return $basePrompt . "\n\n" . 
                       "Texto atual: \"$currentValue\"\n\n" .
                       "Forneça exatamente " . self::MAX_SUGGESTIONS . " sugestões para aprimorar os requisitos técnicos:\n\n" .
                       "ESPECIFICAÇÕES TÉCNICAS:\n" .
                       "- Requisitos objetivos e mensuráveis\n" .
                       "- Normas técnicas e padrões aplicáveis\n" .
                       "- Critérios de desempenho e qualidade\n" .
                       "- Especificações funcionais claras\n\n" .
                       "CONFORMIDADE LEGAL:\n" .
                       "- Evitar especificações restritivas\n" .
                       "- Garantir isonomia entre licitantes\n" .
                       "- Permitir equivalência técnica\n" .
                       "- Fundamentar exigências específicas";

            case 'criterios_julgamento':
                return $basePrompt . "\n\n" . 
                       "Texto atual: \"$currentValue\"\n\n" .
                       "Forneça exatamente " . self::MAX_SUGGESTIONS . " sugestões para aprimorar os critérios de julgamento:\n\n" .
                       "CRITÉRIOS OBJETIVOS:\n" .
                       "- Parâmetros claros e mensuráveis\n" .
                       "- Metodologia de avaliação transparente\n" .
                       "- Pesos e pontuações justificados\n" .
                       "- Critérios de desempate definidos\n\n" .
                       "CONFORMIDADE LEGAL:\n" .
                       "- Adequação ao tipo de licitação\n" .
                       "- Observância dos arts. 33 a 35 da Lei 14.133/2021\n" .
                       "- Garantia de competitividade\n" .
                       "- Proporcionalidade entre critérios";
        }

        // Prompt genérico para outros campos de licitação
        return $basePrompt . "\n\n" . 
               "Texto atual: \"$currentValue\"\n\n" .
               "Forneça exatamente " . self::MAX_SUGGESTIONS . " sugestões para melhorar o texto, considerando:\n\n" .
               "DIRETRIZES OBRIGATÓRIAS:\n" .
               "- Linguagem técnica, formal e impessoal adequada à Administração Pública\n" .
               "- Fundamentação legal baseada na Lei nº 14.133/2021\n" .
               "- Terminologia precisa sem termos subjetivos\n" .
               "- Estrutura clara com justificativas consistentes\n" .
               "- Adequação aos princípios de eficiência e economicidade\n" .
               "- Demonstração clara do interesse público\n" .
               "- Coerência técnica e administrativa\n\n" .
               "EVITAR:\n" .
               "- Termos como 'excelente', 'muito eficaz', 'de alta qualidade'\n" .
               "- Linguagem comercial ou promocional\n" .
               "- Dados inventados ou específicos sem fundamento\n\n" .
               "PREFERIR:\n" .
               "- 'Tecnicamente adequado', 'compatível com as normas', 'conforme parâmetros legais'\n" .
               "- Fundamentação em normas e regulamentos\n" .
               "- Placeholders quando necessário (xxxxx, [nome protegido], [ex: valor])";
    }

    /**
     * Retorna as instruções do sistema para a IA.
     */
    private function getSystemRole(): string
    {
        return "Você é um especialista em documentação licitatória e Administração Pública brasileira, com profundo conhecimento da Lei nº 14.133/2021 (Nova Lei de Licitações), IN SEGES e demais normativos aplicáveis. " .
               
               "MISSÃO: Analisar textos de documentos licitatórios (ETP, TR, DFD, Matriz de Risco) e gerar exatamente " . self::MAX_SUGGESTIONS . " sugestões técnicas para aprimorá-los. " .
               
               "EXPERTISE: " .
               "- Legislação de licitações e contratos públicos " .
               "- Princípios da Administração Pública (legalidade, impessoalidade, moralidade, publicidade, eficiência) " .
               "- Redação técnica e formal para setor público " .
               "- Estruturação de documentos oficiais " .
               "- Análise de riscos em contratações públicas " .
               
               "DIRETRIZES OBRIGATÓRIAS: " .
               "1. LINGUAGEM: Formal, técnica, impessoal e precisa " .
               "2. FUNDAMENTAÇÃO: Baseada em normas legais vigentes " .
               "3. OBJETIVIDADE: Sugestões práticas e implementáveis " .
               "4. QUALIDADE: Densidade argumentativa sem superficialidade " .
               "5. CONFORMIDADE: Adequação aos padrões da Administração Pública " .
               
               "RESTRIÇÕES: " .
               "- NUNCA inventar dados específicos (valores, datas, nomes, locais) " .
               "- EVITAR linguagem comercial ou promocional " .
               "- NÃO usar termos subjetivos como 'excelente' ou 'alta qualidade' " .
               "- PREFERIR terminologia técnica: 'adequado', 'compatível', 'conforme normas' " .
               
               "RESULTADO ESPERADO: Cada sugestão deve conter texto melhorado, explicação técnica fundamentada e demonstrar conformidade legal. " .
               "IMPORTANTE: Forneça EXATAMENTE " . self::MAX_SUGGESTIONS . " sugestões, nem mais nem menos.";
    }

    /**
     * Retorna o schema para as sugestões.
     */
    private function getSuggestionSchema(): ObjectSchema
    {
        // Schema para uma sugestão individual
        $suggestionSchema = new ObjectSchema(
            name: 'suggestion',
            description: 'Uma sugestão individual com seu texto e metadados',
            properties: [
                new StringSchema('id', 'Identificador único da sugestão'),
                new StringSchema('text', 'Texto completo da sugestão melhorada - deve ser o novo texto reformulado e tecnicamente aprimorado, pronto para substituir o texto original'),
                new StringSchema('explanation', 'Explicação técnica detalhada do motivo da sugestão, incluindo fundamentação legal e benefícios esperados'),
                new NumberSchema('confidence', 'Nível de confiança da sugestão (0-100)')
            ],
            requiredFields: ['id', 'text', 'explanation', 'confidence']
        );

        // Schema para o array de sugestões
        return new ObjectSchema(
            name: 'suggestions',
            description: 'Lista de sugestões (máximo de ' . self::MAX_SUGGESTIONS . ')',
            properties: [
                new ArraySchema(
                    name: 'suggestions',
                    description: 'Array de sugestões (máximo de ' . self::MAX_SUGGESTIONS . ')',
                    items: $suggestionSchema,
                )
            ],
            requiredFields: ['suggestions']
        );
    }
}
