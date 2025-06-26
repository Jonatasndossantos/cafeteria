<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use PhpOffice\PhpWord\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

use Orhanerday\OpenAi\OpenAi;

class BaseDocumentController extends Controller
{
    protected $templatesPath;
    protected $cacheTime = 3600; // 1 hora
    
    public function __construct()
    {
        set_time_limit(300); // Aumenta para 5 minutos
        $this->templatesPath = public_path('templates');
        Settings::setOutputEscapingEnabled(true);
    }

    public function generateAiData(string $type, Request $request): array
    {
        // Gera uma chave única para o cache baseada no tipo e nos dados da requisição
        $cacheKey = $this->generateCacheKey($type, $request);
        
        // Tenta recuperar do cache primeiro
        if (Cache::has($cacheKey)) {
            $cachedData = Cache::get($cacheKey);
            return $cachedData;
        }

        $open_ai_key = getenv('OPENAI_API_KEY');
        $open_ai = new OpenAi($open_ai_key);
        $open_ai->setORG("org-82bPuEP0JKxx9yTNreD9Jclb");

        $prompt = $this->getPrompt($type, $request);

        $jsonSchema = $this->getJsonSchema($type);
        
        Log::debug('Schema enviado:', ['schema' => $jsonSchema]);
        Log::debug('prompt enviado:', ['prompt' => $prompt]);
        Log::debug('system enviado:', ['system' => $this->getSystemRole($type)]);


        try {
            $response = $open_ai->chat([
                'model' => 'gpt-4o-2024-08-06',
                'messages' => [
                    [
                        "role" => "system",
                        "content" => $this->getSystemRole($type)
                    ],
                    [
                        "role" => "user",
                        "content" => $prompt
                    ],
                ],
                'response_format' => [
                    'type' => 'json_schema',
                    'json_schema' => $jsonSchema
                ],
                'temperature' => 0.7,
                'max_tokens' => 8000,
                'frequency_penalty' => 0,
                'presence_penalty' => 0,
            ]);
            
            Log::info("Resposta recebida: " . $response);


            $responseArray = json_decode($response, true);
            
            if (!isset($responseArray['choices'][0]['message']['content'])) {
                Log::error("Content não encontrado na resposta");
                throw new \Exception('No content in response');
            }

            $data = json_decode($responseArray['choices'][0]['message']['content'], true);

            if ($data === null) {
                Log::error("Falha ao decodificar content como JSON", [
                    'json_error' => json_last_error_msg()
                ]);
                throw new \Exception('Failed to decode content as JSON');
            }

            if (!is_array($data)) {
                Log::error("Dados decodificados não são um array", [
                    'type' => gettype($data)
                ]);
                throw new \Exception('Content did not decode to an array');
            }

            // Cache the result
            Cache::put($cacheKey, $data, $this->cacheTime);
            
            return $data;

        } catch (\Exception $e) {
            Log::error('Erro ao se comunicar com a OpenAI: ' . $e->getMessage());
            return $this->returnEmptyFallback($type, $cacheKey);
        }
    }

    protected function extractRawJsonFromResponse($response): string
    {
        Log::warning("processando: '{$response}'");
        $array = json_decode($response, true);
        if (!isset($array['choices'][0]['message']['content'])) {
            Log::error('Campo "content" ausente na resposta da IA.');
            return '';
        }

        $raw = $array['choices'][0]['message']['content'];
        $raw = preg_replace('/```(json)?/', '', $raw);
        $raw = preg_replace('/,(\s*[\}\]])/', '$1', trim($raw));

        return $raw;
    }
    

    protected function tryParseJson(string $raw): array
    {
        Log::info("tryParseJson");
        $parsed = json_decode($raw, true);
        return is_array($parsed) ? $parsed : [];
    }
    

    protected function recoverMalformedJson(string $raw, string $type): array
    {
        log::info("esse: '{$raw}'");
        // Remove delimitadores de markdown (```json ou ```)
        $raw = preg_replace('/```(?:json)?/', '', $raw);

        // Corrige vírgulas finais antes de fechamentos }
        $raw = preg_replace('/,(\s*[\}\]])/', '$1', $raw);

        // Remove aspas duplicadas
        $raw = preg_replace('/"{2,}/', '"', $raw);

        // Remove espaços em excesso
        $raw = trim($raw);
        log::info("passa: '{$raw}'");
        // Tentativa direta
        $parsed = json_decode($raw, true);
        if (!is_array($parsed)) {
            // Tenta forçar por regex extraindo o que parece ser JSON
            if (preg_match('/\{(?:[^{}]|(?R))*\}/s', $raw, $matches)) {
                $parsed = json_decode($matches[0], true);
            }
        }

        if (!is_array($parsed)) {
            Log::warning("Falha na tentativa de recuperação de JSON bruto.");
            $parsed = [];
        }

        // Completa com fallback
        $expected = $this->getExpectedFields($type);
        $final = [];

        foreach ($expected as $field) {
            $final[$field] = array_key_exists($field, $parsed) && !empty($parsed[$field])
                ? $parsed[$field]
                : '–';
        }

        return $final;
    }

    

    protected function returnEmptyFallback(string $type, string $cacheKey): array
    {
        $expectedFields = $this->getExpectedFields($type);
        $data = [];

        foreach ($expectedFields as $field) {
            $data[$field] = '–';
        }

        Cache::put($cacheKey, $data, $this->cacheTime);
        return $data;
    }



    protected function generateCacheKey(string $type, Request $request): string
    {
        // Cria uma chave única baseada no tipo e nos dados relevantes da requisição
        $relevantData = [
            'type' => $type,
            'municipality' => $request->input('municipality'),
            'institution' => $request->input('institution'),
            'objectDescription' => $request->input('objectDescription'),
            'valor' => $request->input('valor'),
        ];
        
        return 'ai_data_' . md5(json_encode($relevantData));
    }

    protected function getPrompt(string $type, Request $request): string
    {
        $municipio = $request->input('municipality');
        $instituicao = $request->input('institution');
        $address = $request->input('address');
        $descricao = $request->input('objectDescription');
        $date = now()->format('d \d\e F \d\e Y');
        $valor = $request->input('valor', '00');

        $basePrompt = "Gere os dados para o documento com as seguintes informações:\n\n";
        $basePrompt .= "- Município: {$municipio}\n";
        $basePrompt .= "- Instituição: {$instituicao}\n";
        $basePrompt .= "- Endereço: {$address}\n";
        $basePrompt .= "- Descrição do objeto: {$descricao}\n";
        $basePrompt .= "- Valor: R$ {$valor}\n";
        $basePrompt .= "- Data: {$date}\n\n";

        $typeSpecificPrompt = match ($type) {
            'institutional' => "Para os dados institucionais de arquivos de licitações, o endereço nao deve ser informado com CEP",

            'preliminaryStudy' => "Gere um Estudo Técnico Preliminar (ETP) completo, estruturado em formato JSON conforme o schema fornecido. Use linguagem formal, técnica e precisa. Fundamente os argumentos com base legal, técnica e administrativa. O ETP será utilizado como modelo editável — portanto:\n\nREGRAS E CONDUTAS:\n- **Não invente nomes de pessoas, empresas, municípios, leis, valores, prazos ou fontes**.\n- **Use placeholders sempre que necessário**, como:\n  - `xxxxx`\n  - `[nome protegido]`\n  - `[ex: R$ 120.000,00]`\n  - `[ex: Prefeitura Municipal de ...]`\n- **Nunca preencha dados sensíveis ou simulados**.\n- **Respeite a estrutura e os campos exigidos pelo schema**.\n- **Todos os campos devem conter conteúdo completo, objetivo e técnico**.\n- **Evite linguagem genérica, duplicação de frases ou expressões vagas**.\n- O documento deve manter **coerência lógica entre as seções**.\n\nREQUISITOS DE CONTEÚDO:\n- Cada campo deve ter NO MÍNIMO o número de caracteres especificado no schema (entre 400 e 600 caracteres)\n- O conteúdo deve ser técnico, detalhado e fundamentado\n- Evite conclusões rápidas ou superficiais\n- Expanda argumentos técnicos, comparativos e justificativas\n- O total gerado deve usar aproximadamente 4000 a 6000 tokens\n- Mantenha profundidade analítica, clareza e conformidade legal\n- O conteúdo será revisado por humanos e adaptado à realidade local antes da publicação\n\nIMPORTANTE: O documento final deve ter um volume significativo de conteúdo técnico e fundamentado. Cada seção deve ser desenvolvida com profundidade e detalhamento adequados.
            
                                    O conteúdo gerado deve seguir as diretrizes abaixo:\n\n1. Use linguagem formal, técnica e impessoal, adequada a documentos oficiais da administração pública.\n\n2. O texto deve ser aplicável a qualquer tipo de contratação pública (bens, serviços, obras, locações, assinaturas, etc.), sem menções específicas a tecnologias ou setores.\n\n3. Evite repetições e generalizações. Cada campo deve tratar apenas do seu escopo, com foco claro.\n\n4. Estruture o conteúdo em parágrafos curtos e objetivos. Quando apropriado, utilize listas temáticas, tópicos numerados ou quadros conceituais — especialmente para requisitos, riscos, funções e critérios.\n\n5. Nunca invente dados. Se uma informação for incerta, inexistente ou ainda não definida, sinalize com \"informação a ser preenchida\" ou equivalente.\n\n6. Sempre observe os princípios da Lei nº 14.133/2021, como eficiência, economicidade, transparência, interesse público e inovação.\n\n7. Evite expressões subjetivas como \"muito importante\", \"altamente recomendado\", \"excelente\", entre outras. Prefira descrições técnicas e fundamentadas.\n\n8. Quando possível, relacione a informação à gestão pública, ao planejamento estratégico institucional ou à continuidade de serviços.\n\n9. Sempre que o campo comportar múltiplos elementos (requisitos, riscos, critérios, funcionalidades, etc.), organize o conteúdo em listas temáticas, tópicos numerados ou parágrafos curtos, com uso de marcadores internos, se permitido. Isso favorece a leitura, revisão e adaptação posterior.\n\n10. Cada campo deve tratar apenas do conteúdo correspondente ao seu escopo definido no schema. Evite repetir ideias, justificativas ou informações que já aparecem em outros campos do ETP.\n\n11. Utilize terminologia consistente ao longo do ETP. Sempre que um conceito, solução, alternativa ou funcionalidade for mencionado em mais de um campo, mantenha coerência na forma como ele é descrito, mesmo sem repetir textos. A narrativa deve parecer contínua e articulada.
                                    ",

            'referenceTerms' => "Gere um Termo de Referência (TR) completo e bem fundamentado em formato JSON, conforme o schema de entrada. O texto deve ser técnico, claro e detalhado, com foco nos seguintes critérios:
                    REGRAS DE CONDUTA:
                    - **Não invente dados**: nomes, empresas, valores, normas específicas ou dispositivos legais.
                    - **Use placeholders** como: `xxxxx`, `[ex: 200 unidades]`, `[nome protegido]`, etc.
                    - **Nunca simule valores ou condições específicas não fornecidas.**
                    - Todos os campos devem estar preenchidos com profundidade técnica, respeitando a função de *template editável*.

                    Gere cada campo com no mínimo 1000 caracteres (ou 200 palavras). Evite respostas curtas.

                    Retorne em JSON com linguagem institucional e técnica, pronto para ser adaptado ao caso concreto.",

            'demand' => "Gere um Documento de Formalização de Demanda (DFD) completo e bem fundamentado, em formato JSON, conforme o schema definido. O conteúdo deve atender os seguintes critérios:
                        
                        REGRAS DE SEGURANÇA:
                        - **Não invente nomes, prazos, valores, setores, normas ou datas**.
                        - **Use placeholders sempre que necessário**, como:
                        - `xxxxx`
                        - `[ex: R$ 25.000,00]`
                        - `[nome do setor requisitante]`
                        - `[data prevista de início]`
                        - **Não simule dados**. O DFD gerado será editado por humanos depois.

                        responda de forma enxuta

                        OUTRAS ORIENTAÇÕES:
                        - Mantenha coerência e lógica entre as seções.
                        - Use linguagem formal, técnica e clara.
                        - Todos os campos definidos no schema devem ser preenchidos com profundidade e objetividade.",

            'riskMatrix' => "Gere uma Matriz de Risco completa em formato JSON, conforme o schema definido. O conteúdo deve conter os seguintes elementos:
                        
                        REGRAS DE SEGURANÇA:
                        - **Nunca invente nomes de pessoas, órgãos, empresas, leis específicas ou datas**.
                        - **Use placeholders quando necessário**, como:
                        - `xxxxx`
                        - `[ex: Unidade de TI]`
                        - `[ex: vazamento de dados de cidadãos]`
                        - `[ex: multa contratual de até 5%]`
                        - **Não simule valores nem condições específicas não fornecidas.**

                        Gere cada campo com no mínimo 1000 caracteres (ou 200 palavras). Evite respostas curtas.

                        ORIENTAÇÕES FINAIS:
                        - Mantenha coerência entre riscos, ações e responsáveis.
                        - Use linguagem técnica, clara e institucional.
                        - Preencha todos os campos definidos no schema.
                        - O documento gerado deve ser completo, mas editável por humanos.",

            default => "Retorne os dados no formato JSON conforme a estrutura definida."
        };

        return $basePrompt . $typeSpecificPrompt;
    }

    protected function getSystemRole(string $type): string
    {
        $baseInstructions = "Você é um assistente especialista em licitações públicas brasileiras, com profundo conhecimento da Lei nº 14.133/2021, IN SEGES nº 05/2017 e nº 65/2021. Use linguagem formal, técnica e precisa. Use vocabulário técnico-jurídico e fundamente com base na legislação aplicável. IMPORTANTE: Você DEVE retornar sua resposta usando o tool_call especificado, preenchendo TODOS os campos obrigatórios.";

        $typeSpecificInstructions = match ($type) {
            'institutional' => "Gere dados institucionais para documentos oficiais de municípios brasileiros. O endereço deve ser realista e complementado se necessário. O nome da autoridade não pode ser fictício, use '[nome protected]'. O cargo deve ser condizente com a instituição (ex: Prefeito Municipal, Secretário de Administração).",
            
            'preliminaryStudy' => "Você é um especialista em contratações públicas, com domínio da Lei nº 14.133/2021 e da IN SEGES nº 05/2017. Seu papel é redigir Estudos Técnicos Preliminares (ETPs) detalhados, técnicos, fundamentados, objetivos e formalmente estruturados, conforme as melhores práticas da Administração Pública. Você deve sempre seguir padrões legais, evitar invenções e respeitar as instruções fornecidas. IMPORTANTE: Cada campo do ETP deve ser desenvolvido com profundidade técnica e extensão adequada, garantindo um volume significativo de conteúdo (mínimo de 400-600 caracteres por campo). O documento final deve ser completo, técnico e fundamentado, evitando respostas curtas ou superficiais.",
            
            'referenceTerms' => "Você é um especialista em contratações públicas com foco na elaboração de Termos de Referência (TR) conforme a Lei 14.133/2021. Sua função é redigir documentos técnicos e completos, alinhados ao modelo institucional da Administração Pública. Sempre considere o tipo de objeto: serviço, obra, fornecimento de bens ou solução de tecnologia da informação. Produza conteúdo estruturado, objetivo, juridicamente fundamentado e compatível com editabilidade posterior. Não invente informações.",
            
            'demand' => "Você é um especialista em planejamento de contratações públicas e elaboração de Documentos de Formalização de Demanda (DFD), com base na Lei nº 14.133/2021. Seu papel é estruturar diagnósticos claros, técnicos, objetivos e juridicamente embasados para justificar demandas da Administração Pública. A redação deve ser formal, técnica e editável. Nunca invente dados.",
            
            'riskMatrix' => "Você é um analista de riscos em contratações públicas, especializado na elaboração de matrizes de risco conforme a Lei nº 14.133/2021. Sua tarefa é identificar, classificar e estruturar riscos relevantes com linguagem técnica, objetiva e formal, com foco em contratações administrativas. O documento gerado será um template editável. Nunca invente dados ou simule informações concretas.",
            
            default => ""
        };

        return $baseInstructions . "\n\n" . $typeSpecificInstructions;
    }

    public function setInstitutionalData($templateProcessor, Request $request)
    {
        try {
            $data = $this->generateAiData('institutional', $request);
            
            // Preenche os dados básicos
            $templateProcessor->setValue('cidade', $data['cidade']);
            $templateProcessor->setValue('cidade_maiusculo', strtoupper($data['cidade_maiusculo']));
            $templateProcessor->setValue('endereco', $data['endereco']);
            $templateProcessor->setValue('cep', $data['cep']);
            $templateProcessor->setValue('nome_autoridade', $data['nome_autoridade']);
            $templateProcessor->setValue('nome_elaborador', $data['nome_elaborador']);
            $templateProcessor->setValue('cargo_autoridade', $data['cargo_autoridade']);
            $templateProcessor->setValue('data_extenso', $data['data_extenso']);
            $templateProcessor->setValue('data_aprovacao', $data['data_aprovacao']);
            $templateProcessor->setValue('cargo_elaborador', $data['cargo_elaborador']);
            $templateProcessor->setValue('nome_autoridade_aprovacao', $data['nome_autoridade_aprovacao']);
            $templateProcessor->setValue('cargo_autoridade_aprovacao', $data['cargo_autoridade_aprovacao']);

            // Processa o brasão de forma otimizada
            $this->processBrasao($templateProcessor, $request->input('municipality'));
        } catch (\Exception $e) {
            Log::error('Error setting institutional data: ' . $e->getMessage());
            throw $e;
        }
    }

    public function processBrasao($templateProcessor, $municipality)
    {
        try {
            // Normaliza o nome do município
            $filename = $this->normalizeMunicipalityName($municipality) . '.png';
            $brasaoPath = public_path('brasoes/' . $filename);

            // Verifica se o brasão específico existe
            if (!file_exists($brasaoPath)) {
                $brasaoPath = public_path('brasoes/default.png');
            }

            // Verifica se o arquivo existe antes de tentar processá-lo
            if (file_exists($brasaoPath)) {
                $templateProcessor->setImageValue('brasao', [
                    'path' => $brasaoPath,
                    'width' => 80,
                    'ratio' => true
                ]);
            } else {
                Log::warning("Nenhum brasão encontrado para {$filename}");
            }
        } catch (\Exception $e) {
            Log::error("Erro ao processar brasão: " . $e->getMessage());
            throw $e;
        }
    }

    protected function normalizeMunicipalityName($municipality)
    {
        // Remove "-SP", traços, espaços
        $municipality = str_replace(['-SP', '–SP', '–', ' '], '', $municipality);

        // Remove acentos
        $municipality = iconv('UTF-8', 'ASCII//TRANSLIT', $municipality);

        // Remove caracteres especiais
        $municipality = preg_replace('/[^a-zA-Z0-9]/', '', $municipality);

        // Converte para minúsculo
        return strtolower($municipality);
    }


}
