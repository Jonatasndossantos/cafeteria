<?php

namespace App\Http\Controllers;

use App\Models\Processo;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class DocumentoPdfController extends Controller
{
    public function downloadPdf($id)
    {
        $documento = Processo::with('setor')->find($id);
        
        if (!$documento) {
            return response()->json(['error' => 'Documento não encontrado'], 404);
        }
        
        // Gerar HTML para o PDF
        $html = $this->gerarHtmlDocumento($documento);
        
        // Gerar PDF
        $pdf = Pdf::loadHTML($html);
        
        // Configurar o PDF
        $pdf->setPaper('A4', 'portrait');
        
        // Nome do arquivo
        $filename = "documento-{$documento->numero_processo}.pdf";
        
        // Retornar o PDF para download
        return $pdf->download($filename);
    }
    
    private function gerarHtmlDocumento($documento)
    {
        $dataFormatada = $documento->data ? date('d/m/Y', strtotime($documento->data)) : 'N/A';
        $valorFormatado = $documento->valor ? 'R$ ' . number_format($documento->valor, 2, ',', '.') : 'N/A';
        
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            <title>Documento {$documento->numero_processo}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                .title { font-size: 24px; font-weight: bold; color: #333; }
                .subtitle { font-size: 16px; color: #666; margin-top: 10px; }
                .section { margin: 20px 0; }
                .section-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                .field { margin: 10px 0; }
                .field-label { font-weight: bold; color: #555; }
                .field-value { color: #333; }
                .status { display: inline-block; padding: 5px 10px; border-radius: 4px; font-weight: bold; }
                .status-concluido { background-color: #d4edda; color: #155724; }
                .status-em-andamento { background-color: #cce5ff; color: #004085; }
                .status-suspenso { background-color: #fff3cd; color: #856404; }
                .status-cancelado { background-color: #f8d7da; color: #721c24; }
                .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ccc; padding-top: 20px; }
            </style>
        </head>
        <body>
            <div class='header'>
                <div class='title'>Portal da Transparência</div>
                <div class='subtitle'>Documento Oficial</div>
            </div>
            
            <div class='section'>
                <div class='section-title'>Informações do Processo</div>
                <div class='field'>
                    <span class='field-label'>Número do Processo:</span>
                    <span class='field-value'>{$documento->numero_processo}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Número do Documento:</span>
                    <span class='field-value'>{$documento->numero_documento}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Tipo:</span>
                    <span class='field-value'>{$documento->tipo}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Modalidade:</span>
                    <span class='field-value'>{$documento->modalidade}</span>
                </div>
            </div>
            
            <div class='section'>
                <div class='section-title'>Detalhes do Documento</div>
                <div class='field'>
                    <span class='field-label'>Objeto:</span>
                    <span class='field-value'>{$documento->objeto}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Secretaria:</span>
                    <span class='field-value'>{$documento->secretaria}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Setor:</span>
                    <span class='field-value'>" . ($documento->setor ? $documento->setor->nome : 'N/A') . "</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Valor:</span>
                    <span class='field-value'>{$valorFormatado}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Data:</span>
                    <span class='field-value'>{$dataFormatada}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Status:</span>
                    <span class='status status-{$this->getStatusClass($documento->status)}'>{$documento->status}</span>
                </div>
            </div>
            
            <div class='section'>
                <div class='section-title'>Informações Adicionais</div>
                <div class='field'>
                    <span class='field-label'>Data de Criação:</span>
                    <span class='field-value'>" . date('d/m/Y H:i', strtotime($documento->created_at)) . "</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Última Atualização:</span>
                    <span class='field-value'>" . date('d/m/Y H:i', strtotime($documento->updated_at)) . "</span>
                </div>
            </div>
            
            <div class='footer'>
                <p>Este documento foi gerado automaticamente pelo Portal da Transparência</p>
                <p>Data de geração: " . date('d/m/Y H:i:s') . "</p>
            </div>
        </body>
        </html>
        ";
    }
    
    private function getStatusClass($status)
    {
        switch (strtolower($status)) {
            case 'concluído':
            case 'vigente':
                return 'concluido';
            case 'em andamento':
            case 'publicado':
                return 'em-andamento';
            case 'suspenso':
                return 'suspenso';
            case 'cancelado':
                return 'cancelado';
            default:
                return 'em-andamento';
        }
    }
} 