<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DFDController extends Controller
{
    /**
     * Busca dados complementares baseado no tipo e objeto
     */
    public function autocomplete(Request $request)
    {
        $request->validate([
            'tipoObjeto' => 'required|string',
            'objeto' => 'required|string|min:3'
        ]);

        $tipoObjeto = $request->input('tipoObjeto');
        $objeto = strtolower($request->input('objeto'));

        // Simulação de busca em base de dados
        // Em produção, isso seria uma consulta real ao banco
        $response = [
            'codigoCatmat' => '',
            'valorEstimado' => 0,
            'prazoEntrega' => '30 dias',
            'classificacaoOrcamentaria' => '',
            'naturezaDespesa' => '',
            'fonteRecurso' => '',
            'sugestoes' => []
        ];

        // Lógica de exemplo baseada em palavras-chave
        if (strpos($objeto, 'computador') !== false || strpos($objeto, 'notebook') !== false) {
            $response = [
                'codigoCatmat' => '140.123.456',
                'valorEstimado' => 4500.00,
                'prazoEntrega' => '45 dias',
                'classificacaoOrcamentaria' => '33.90.30',
                'naturezaDespesa' => '339030 - Material de Consumo',
                'fonteRecurso' => '100 - Recursos Ordinários',
                'sugestoes' => [
                    'justificativa' => 'A aquisição de equipamentos de informática se faz necessária para modernizar o parque tecnológico da instituição, garantindo melhores condições de trabalho e produtividade.',
                    'objetivoContratacao' => 'Adquirir equipamentos de informática modernos para substituir equipamentos obsoletos e atender novas demandas.',
                    'beneficiosEsperados' => 'Aumento da produtividade, redução de custos com manutenção, melhoria na segurança da informação.'
                ]
            ];
        } elseif (strpos($objeto, 'papel') !== false || strpos($objeto, 'material de expediente') !== false) {
            $response = [
                'codigoCatmat' => '150.234.567',
                'valorEstimado' => 1200.00,
                'prazoEntrega' => '15 dias',
                'classificacaoOrcamentaria' => '33.90.30',
                'naturezaDespesa' => '339030 - Material de Consumo',
                'fonteRecurso' => '100 - Recursos Ordinários',
                'sugestoes' => [
                    'justificativa' => 'A aquisição de material de expediente é essencial para o funcionamento regular das atividades administrativas.',
                    'objetivoContratacao' => 'Suprir as necessidades de material de expediente para as atividades administrativas.',
                    'beneficiosEsperados' => 'Garantir o funcionamento contínuo das atividades administrativas.'
                ]
            ];
        }

        return response()->json($response);
    }

    /**
     * Busca códigos CATMAT/CATSER
     */
    public function searchCatmat(Request $request)
    {
        $query = $request->input('q', '');
        
        // Simulação de busca CATMAT
        // Em produção, isso seria uma consulta à base de dados do CATMAT
        $results = [
            ['codigo' => '140.123.456', 'descricao' => 'Computador Desktop - Tipo 1'],
            ['codigo' => '140.123.457', 'descricao' => 'Computador Desktop - Tipo 2'],
            ['codigo' => '140.234.567', 'descricao' => 'Notebook - Tipo 1'],
            ['codigo' => '140.234.568', 'descricao' => 'Notebook - Tipo 2'],
        ];

        // Filtra resultados baseado na query
        $filtered = array_filter($results, function($item) use ($query) {
            return stripos($item['descricao'], $query) !== false;
        });

        return response()->json(array_values($filtered));
    }

    /**
     * Valida se o DFD pode ser simplificado
     */
    public function validateSimplified(Request $request)
    {
        $request->validate([
            'tipoObjeto' => 'required|string',
            'valorTotal' => 'required|numeric',
            'objeto' => 'required|string'
        ]);

        $valorTotal = $request->input('valorTotal');
        $tipoObjeto = $request->input('tipoObjeto');
        
        $eligible = true;
        $reasons = [];
        $score = 100;

        // Critérios de validação
        if ($valorTotal > 50000) {
            $eligible = false;
            $reasons[] = 'Valor acima do limite para DFD simplificado (R$ 50.000,00)';
            $score -= 50;
        }

        if ($tipoObjeto === 'Obras' || $tipoObjeto === 'ServicosEngenharia') {
            $eligible = false;
            $reasons[] = 'Obras e serviços de engenharia não são elegíveis para DFD simplificado';
            $score -= 50;
        }

        if ($eligible && empty($reasons)) {
            $reasons[] = 'Demanda elegível para DFD simplificado';
        }

        return response()->json([
            'eligible' => $eligible,
            'reasons' => $reasons,
            'score' => max(0, $score)
        ]);
    }

    /**
     * Salva rascunho do DFD
     */
    public function saveDraft(Request $request)
    {
        // Validação básica
        $request->validate([
            'formData.objeto' => 'required|string',
            'formData.tipoObjeto' => 'required|string'
        ]);

        // Em produção, salvaria no banco de dados
        // Por ora, retorna um ID simulado
        return response()->json([
            'id' => rand(1000, 9999),
            'message' => 'Rascunho salvo com sucesso!'
        ]);
    }

    /**
     * Formaliza o DFD
     */
    public function formalize(Request $request)
    {
        // Validação completa
        $request->validate([
            'formData.objeto' => 'required|string',
            'formData.tipoObjeto' => 'required|string',
            'formData.valorTotal' => 'required|numeric|min:0',
            'objetoJustificativa.descricaoObjeto' => 'required|string',
            'objetoJustificativa.justificativa' => 'required|string'
        ]);

        // Em produção, processaria a formalização completa
        $numero = 'DFD-' . date('Y') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        $protocolo = 'PROT-' . uniqid();

        return response()->json([
            'numero' => $numero,
            'protocolo' => $protocolo,
            'message' => 'DFD formalizado com sucesso!'
        ]);
    }
} 