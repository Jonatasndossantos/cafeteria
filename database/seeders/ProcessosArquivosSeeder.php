<?php

namespace Database\Seeders;

use App\Models\Processo;
use App\Models\Arquivo;
use App\Models\Usuario;
use App\Models\Setor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProcessosArquivosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buscar todos os usuários e setores existentes
        $usuarios = Usuario::all();
        $setores = Setor::all();

        if ($usuarios->isEmpty() || $setores->isEmpty()) {
            $this->command->warn('É necessário ter usuários e setores cadastrados antes de executar este seeder.');
            return;
        }

        // Tipos de documento disponíveis
        $tiposDocumento = ['Planejamento', 'Espada1', 'Espada2', 'Espada3', 'Espada4', 'Espada5', 'Espada6', 'Espada7', ''];

        // Modalidades de processo
        $modalidades = ['Pregão Eletrônico', 'Pregão Presencial', 'Concorrência', 'Dispensa', 'Inexigibilidade'];

        // Tipos de processo (cafeteria-specific)
        $tiposProcesso = ['Produtos de Consumo', 'Ingredientes Alimentares', 'Materiais de Limpeza e Higiene', 'Equipamentos e Utensílios', 'Serviços', 'Materiais Administrativos'];

        // Status possíveis
        // $statusList = ['em andamento', 'pendente', 'concluido', 'cancelado'];
        $statusList = ['em andamento', 'concluido'];

        $processos = [];
        $arquivos = [];

        // Criar 15 processos
        for ($i = 1; $i <= 15; $i++) {
            $usuario = $usuarios->random();
            $setor = $setores->random();
            $modalidade = $modalidades[array_rand($modalidades)];
            $tipo = $tiposProcesso[array_rand($tiposProcesso)];
            $status = $statusList[array_rand($statusList)];

            // Gerar objeto específico baseado no tipo
            $objetos = [
                'Aquisição de computadores para laboratórios de informática das escolas municipais',
                'Contratação de serviços de limpeza e conservação das escolas municipais',
                'Reforma e ampliação da Escola Municipal João da Silva',
                'Aquisição de material de expediente para todas as secretarias',
                'Aquisição de medicamentos para o posto de saúde central',
                'Prestação de serviços de consultoria técnica em engenharia',
                'Locação de veículos para transporte escolar',
                'Aquisição de equipamentos médicos para UBS',
                'Serviços de segurança patrimonial para prédios municipais',
                'Construção de pavimentação na Avenida Principal',
                'Aquisição de sistemas de tecnologia da informação',
                'Prestação de serviços especializados de arquitetura',
                'Convênio para desenvolvimento de projetos educacionais',
                'Aquisição de materiais de construção para obras públicas',
                'Serviços de manutenção predial dos prédios municipais'
            ];

            $processos[] = [
                'numero_processo' => 'PA' . sprintf(date('Y'),'%04d.%02d.%04d', rand(1, 999)),
                'modalidade' => $modalidade,
                'tipo' => $tipo,
                'data' => now()->subDays(rand(1, 365))->format('Y-m-d'),
                'objeto' => $objetos[array_rand($objetos)],
                'valor' => rand(10000, 500000) / 100,
                'setor_id' => $setor->id,
                'usuario_id' => $usuario->id,
                'status' => $status,
                'tags' => json_encode(['municipal', 'administrativo']),
                'autenticidade' => json_encode(['verificado' => true]),
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        // Inserir processos
        DB::table('processos')->insert($processos);

        // Buscar os processos criados para vincular os arquivos
        $processosCriados = Processo::all();

        // Criar arquivos para cada processo
        foreach ($processosCriados as $processo) {
            // Cada processo terá de 1 a 3 tipos de documentos diferentes
            $numDocumentos = rand(1, 3);
            $tiposEscolhidos = array_rand($tiposDocumento, $numDocumentos);
            
            if (!is_array($tiposEscolhidos)) {
                $tiposEscolhidos = [$tiposEscolhidos];
            }

            foreach ($tiposEscolhidos as $indice) {
                $tipoDoc = $tiposDocumento[$indice];
                $usuario = $usuarios->random();

                $arquivos[] = [
                    'name' => "{$tipoDoc}_{$processo->numero_processo}",
                    'description' => "Documento {$tipoDoc} do processo {$processo->numero_processo}",
                    'file_path' => "documentos/processo_{$processo->id}/{$tipoDoc}.docx",
                    'file_type' => 'word',
                    'document_type' => $tipoDoc,
                    'processo_id' => $processo->id,
                    'usuario_id' => $usuario->id,
                    'status' => $statusList[array_rand($statusList)],
                    'metadata' => json_encode(['versao' => '1.0', 'criado_em' => now()]),
                    'vinculacoes' => json_encode(['processo' => $processo->numero_processo]),
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }
        }

        // Inserir arquivos
        DB::table('arquivos')->insert($arquivos);

        $this->command->info('Seeder executado com sucesso!');
        $this->command->info('Criados: ' . count($processos) . ' processos e ' . count($arquivos) . ' arquivos');
    }

    /**
     * Gerar objeto do processo baseado no tipo
     */
    private function gerarObjetoProcesso(string $tipo): string
    {
        $objetos = [
            'Licitação' => [
                'Aquisição de materiais de escritório para secretarias municipais',
                'Contratação de serviços de limpeza e conservação',
                'Aquisição de equipamentos de informática',
                'Contratação de serviços de manutenção predial',
                'Aquisição de combustíveis e lubrificantes'
            ],
            'Contrato' => [
                'Prestação de serviços de consultoria técnica',
                'Fornecimento de materiais de construção',
                'Serviços de transporte escolar',
                'Manutenção de equipamentos médicos',
                'Serviços de segurança patrimonial'
            ],
            'Convênio' => [
                'Convênio para desenvolvimento de projetos educacionais',
                'Parceria para implementação de programas de saúde',
                'Cooperação técnica para modernização administrativa',
                'Convênio para execução de obras de infraestrutura',
                'Parceria para programas sociais'
            ],
            'Termo de Referência' => [
                'Especificações técnicas para aquisição de veículos',
                'Definição de escopo para serviços de engenharia',
                'Requisitos técnicos para sistemas de informação',
                'Especificações para serviços de saúde',
                'Definições técnicas para obras públicas'
            ],
            'Ata de Registro de Preços' => [
                'Registro de preços para materiais de consumo',
                'Ata para fornecimento de equipamentos',
                'Registro para prestação de serviços especializados',
                'Ata para aquisição de medicamentos',
                'Registro para serviços de manutenção'
            ]
        ];

        $lista = $objetos[$tipo] ?? $objetos['Licitação'];
        return $lista[array_rand($lista)];
    }

    /**
     * Gerar tags baseadas no tipo de processo
     */
    private function gerarTags(string $tipo): array
    {
        $tagsPorTipo = [
            'Licitação' => ['licitacao', 'compras', 'publico', 'concorrencia'],
            'Contrato' => ['contrato', 'prestacao', 'servicos', 'fornecimento'],
            'Convênio' => ['convenio', 'parceria', 'cooperacao', 'desenvolvimento'],
            'Termo de Referência' => ['tr', 'especificacao', 'tecnico', 'requisitos'],
            'Ata de Registro de Preços' => ['arp', 'registro', 'precos', 'fornecimento']
        ];

        $tags = $tagsPorTipo[$tipo] ?? ['geral', 'processo'];
        
        // Adicionar tags comuns
        $tagsComuns = ['municipal', 'administrativo', 'oficial'];
        $tags = array_merge($tags, array_slice($tagsComuns, 0, rand(1, 2)));

        return array_unique($tags);
    }

    /**
     * Gerar nome do arquivo baseado no tipo de documento
     */
    private function gerarNomeArquivo(string $tipoDoc, string $numeroProcesso): string
    {
        $nomes = [
            'DFD' => "Diagrama_Fluxo_Dados_{$numeroProcesso}",
            'ETP' => "Estudo_Tecnico_Preliminar_{$numeroProcesso}",
            'TR' => "Termo_Referencia_{$numeroProcesso}",
            'PLANEJAMENTO' => "Planejamento_Contratacao_{$numeroProcesso}",
            'MATRIZ_RISCOS' => "Matriz_Riscos_{$numeroProcesso}",
            'ATA_REGISTRO_PRECOS' => "Ata_Registro_Precos_{$numeroProcesso}"
        ];

        return $nomes[$tipoDoc] ?? "Documento_{$tipoDoc}_{$numeroProcesso}";
    }

    /**
     * Gerar descrição do arquivo baseado no tipo de documento
     */
    private function gerarDescricaoArquivo(string $tipoDoc): string
    {
        $descricoes = [
            'DFD' => 'Diagrama de Fluxo de Dados contendo mapeamento dos processos e fluxos de informação',
            'ETP' => 'Estudo Técnico Preliminar com análise de viabilidade e especificações técnicas',
            'TR' => 'Termo de Referência com especificações detalhadas do objeto da contratação',
            'PLANEJAMENTO' => 'Documento de planejamento da contratação com cronograma e estratégias',
            'MATRIZ_RISCOS' => 'Matriz de identificação e análise dos riscos do projeto',
            'ATA_REGISTRO_PRECOS' => 'Ata de Registro de Preços com fornecedores qualificados'
        ];

        return $descricoes[$tipoDoc] ?? 'Documento relacionado ao processo administrativo';
    }

    /**
     * Gerar metadata do arquivo baseado no tipo de documento
     */
    private function gerarMetadataArquivo(string $tipoDoc): array
    {
        $baseMetadata = [
            'versao' => '1.0',
            'criado_em' => now()->format('Y-m-d H:i:s'),
            'tamanho_estimado' => rand(100, 2000) . 'KB',
            'formato_original' => 'PDF'
        ];

        $metadataEspecifica = [
            'DFD' => [
                'num_processos_mapeados' => rand(5, 20),
                'complexidade' => ['baixa', 'media', 'alta'][rand(0, 2)]
            ],
            'ETP' => [
                'valor_estimado' => 'R$ ' . number_format(rand(10000, 500000) / 100, 2, ',', '.'),
                'prazo_execucao' => rand(30, 365) . ' dias'
            ],
            'TR' => [
                'num_itens' => rand(1, 50),
                'modalidade_sugerida' => ['Pregão Eletrônico', 'Tomada de Preços'][rand(0, 1)]
            ],
            'PLANEJAMENTO' => [
                'etapas_planejadas' => rand(3, 10),
                'duracao_total' => rand(60, 300) . ' dias'
            ],
            'MATRIZ_RISCOS' => [
                'riscos_identificados' => rand(5, 25),
                'nivel_risco_geral' => ['baixo', 'medio', 'alto'][rand(0, 2)]
            ],
            'ATA_REGISTRO_PRECOS' => [
                'vigencia_meses' => rand(6, 24),
                'num_fornecedores' => rand(3, 15)
            ]
        ];

        return array_merge($baseMetadata, $metadataEspecifica[$tipoDoc] ?? []);
    }
} 