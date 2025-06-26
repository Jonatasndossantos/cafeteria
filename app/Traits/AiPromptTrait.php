<?php

namespace App\Traits;

trait AiPromptTrait
{
    protected function getPrompt(string $type, array $data): string
    {
        $basePrompt = $this->buildBasePrompt($data);
        $typeSpecificPrompt = $this->getTypeSpecificPrompt($type);
        
        return $basePrompt . $typeSpecificPrompt;
    }

    protected function buildBasePrompt(array $data): string
    {
        $date = now()->format('d \d\e F \d\e Y');
        
        return "Gere os dados para o documento com as seguintes informações:\n\n" .
               "- Município: {$data['municipality']}\n" .
               "- Instituição: {$data['institution']}\n" .
               "- Endereço: {$data['address']}\n" .
               "- Descrição do objeto: {$data['objectDescription']}\n" .
               "- Valor: R$ {$data['valor']}\n" .
               "- Data: {$date}\n\n";
    }

    protected function getTypeSpecificPrompt(string $type): string
    {
        return match ($type) {
            'institutional' => "Para os dados institucionais de arquivos de licitações, o endereço nao deve ser informado com CEP",
            'preliminaryStudy' => "Gere um Estudo Técnico Preliminar (ETP) completo, estruturado em formato JSON conforme o schema fornecido. Use linguagem formal, técnica e precisa. Fundamente os argumentos com base legal, técnica e administrativa. O ETP será utilizado como modelo editável — portanto:\n\nREGRAS E CONDUTAS:\n- **Não invente nomes de pessoas, empresas, municípios, leis, valores, prazos ou fontes**.\n- **Use placeholders sempre que necessário**, como:\n  - `xxxxx`\n  - `[nome protegido]`\n  - `[ex: R$ 120.000,00]`\n  - `[ex: Prefeitura Municipal de ...]`\n- **Nunca preencha dados sensíveis ou simulados**.\n- **Respeite a estrutura e os campos exigidos pelo schema**.\n- **Todos os campos devem conter conteúdo completo, objetivo e técnico**.\n- **Evite linguagem genérica, duplicação de frases ou expressões vagas**.\n- O documento deve manter **coerência lógica entre as seções**.",
            'referenceTerms' => "Gere um Termo de Referência (TR) completo e bem fundamentado em formato JSON, conforme o schema de entrada. O texto deve ser técnico, claro e detalhado, com foco nos seguintes critérios:\nREGRAS DE CONDUTA:\n- **Não invente dados**: nomes, empresas, valores, normas específicas ou dispositivos legais.\n- **Use placeholders** como: `xxxxx`, `[ex: 200 unidades]`, `[nome protegido]`, etc.\n- **Nunca simule valores ou condições específicas não fornecidas.**\n- Todos os campos devem estar preenchidos com profundidade técnica, respeitando a função de *template editável*.",
            'demand' => "Gere um Documento de Formalização de Demanda (DFD) completo e bem fundamentado, em formato JSON, conforme o schema definido. O conteúdo deve atender os seguintes critérios:\nREGRAS DE SEGURANÇA:\n- **Não invente nomes, prazos, valores, setores, normas ou datas**.\n- **Use placeholders sempre que necessário**, como:\n- `xxxxx`\n- `[ex: R$ 25.000,00]`\n- `[nome do setor requisitante]`\n- `[data prevista de início]`\n- **Não simule dados**. O DFD gerado será editado por humanos depois.",
            'riskMatrix' => "Gere uma Matriz de Risco completa em formato JSON, conforme o schema definido. O conteúdo deve conter os seguintes elementos:\nREGRAS DE SEGURANÇA:\n- **Nunca invente nomes de pessoas, órgãos, empresas, leis específicas ou datas**.\n- **Use placeholders quando necessário**, como:\n- `xxxxx`\n- `[ex: Unidade de TI]`\n- `[ex: vazamento de dados de cidadãos]`\n- `[ex: multa contratual de até 5%]`\n- **Não simule valores nem condições específicas não fornecidas.**",
            default => "Retorne os dados no formato JSON conforme a estrutura definida."
        };
    }

    protected function getSystemRole(string $type): string
    {
        $baseInstructions = "Você é um assistente especialista em licitações públicas brasileiras, com profundo conhecimento da Lei nº 14.133/2021, IN SEGES nº 05/2017 e nº 65/2021. Use linguagem formal, técnica e precisa. Use vocabulário técnico-jurídico e fundamente com base na legislação aplicável. IMPORTANTE: Você DEVE retornar sua resposta usando o tool_call especificado, preenchendo TODOS os campos obrigatórios.";
        
        $typeSpecificInstructions = match ($type) {
            'institutional' => "Gere dados institucionais para documentos oficiais de municípios brasileiros. O endereço deve ser realista e complementado se necessário. O nome da autoridade não pode ser fictício, use '[nome protected]'. O cargo deve ser condizente com a instituição (ex: Prefeito Municipal, Secretário de Administração).",
            'preliminaryStudy' => "Você é um especialista em contratações públicas, com domínio da Lei nº 14.133/2021 e da IN SEGES nº 05/2017. Seu papel é redigir Estudos Técnicos Preliminares (ETPs) detalhados, técnicos, fundamentados, objetivos e formalmente estruturados, conforme as melhores práticas da Administração Pública. Você deve sempre seguir padrões legais, evitar invenções e respeitar as instruções fornecidas.",
            'referenceTerms' => "Você é um especialista em contratações públicas com foco na elaboração de Termos de Referência (TR) conforme a Lei 14.133/2021. Sua função é redigir documentos técnicos e completos, alinhados ao modelo institucional da Administração Pública. Sempre considere o tipo de objeto: serviço, obra, fornecimento de bens ou solução de tecnologia da informação. Produza conteúdo estruturado, objetivo, juridicamente fundamentado e compatível com editabilidade posterior. Não invente informações.",
            'demand' => "Você é um especialista em planejamento de contratações públicas e elaboração de Documentos de Formalização de Demanda (DFD), com base na Lei nº 14.133/2021. Seu papel é estruturar diagnósticos claros, técnicos, objetivos e juridicamente embasados para justificar demandas da Administração Pública. A redação deve ser formal, técnica e editável. Nunca invente dados.",
            'riskMatrix' => "Você é um analista de riscos em contratações públicas, especializado na elaboração de matrizes de risco conforme a Lei nº 14.133/2021. Sua tarefa é identificar, classificar e estruturar riscos relevantes com linguagem técnica, objetiva e formal, com foco em contratações administrativas. O documento gerado será um template editável. Nunca invente dados ou simule informações concretas.",
            default => ""
        };

        return $baseInstructions . "\n\n" . $typeSpecificInstructions;
    }
} 