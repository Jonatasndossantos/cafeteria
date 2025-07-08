<?php

namespace App\Http\Controllers;

use App\Models\Processo;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class DocumentoPdfController extends Controller
{
    public function downloadPdf($id)
    {
        try {
            $documento = Processo::with('setor')->find($id);
            
            if (!$documento) {
                \Log::error('DocumentoPdfController@downloadPdf - Documento não encontrado', ['id' => $id]);
                return response()->json(['error' => 'Documento não encontrado'], 404);
            }
            
            \Log::info('DocumentoPdfController@downloadPdf - Gerando documento HTML', ['id' => $id, 'numero_processo' => $documento->numero_processo]);
            
            // Gerar HTML que pode ser convertido para PDF pelo navegador
            $html = $this->gerarHtmlDocumentoSimples($documento);
            
            // Nome do arquivo
            $filename = "documento-{$documento->numero_processo}.html";
            
            \Log::info('DocumentoPdfController@downloadPdf - Documento HTML gerado com sucesso', ['filename' => $filename]);
            
            // Retornar o arquivo HTML para download
            return response()->streamDownload(
                function () use ($html) {
                    echo $html;
                },
                $filename,
                [
                    'Content-Type' => 'text/html',
                    'Content-Disposition' => 'attachment; filename="' . $filename . '"'
                ]
            );
            
        } catch (\Exception $e) {
            \Log::error('DocumentoPdfController@downloadPdf - Erro ao gerar documento HTML', [
                'id' => $id,
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'Erro ao gerar documento HTML: ' . $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }
    
    private function gerarHtmlDocumento($documento)
    {
        // Formatação de dados
        $dataFormatada = $documento->data ? date('d/m/Y', strtotime($documento->data)) : 'N/A';
        $valorFormatado = $documento->valor ? 'R$ ' . number_format($documento->valor, 2, ',', '.') : 'N/A';
        $numeroDocumento = $documento->numero_documento ?: 'N/A';
        $tipo = $documento->tipo ?: 'N/A';
        $modalidade = $documento->modalidade ?: 'N/A';
        $objeto = $documento->objeto ?: 'N/A';
        $secretaria = $documento->secretaria ?: 'N/A';
        $setorNome = $documento->setor ? $documento->setor->nome : 'N/A';
        $status = $documento->status ?: 'N/A';
        $dataCriacao = $documento->created_at ? date('d/m/Y H:i', strtotime($documento->created_at)) : 'N/A';
        $dataAtualizacao = $documento->updated_at ? date('d/m/Y H:i', strtotime($documento->updated_at)) : 'N/A';
        
        // Processar tags
        $tags = $documento->tags ? implode(', ', $documento->tags) : 'Nenhuma tag';
        
        // Processar autenticidade
        $autenticidade = $documento->autenticidade ?: ['nivel' => 'Pendente', 'assinaturaDigital' => false];
        $nivelAutenticidade = $autenticidade['nivel'] ?? 'Pendente';
        $assinaturaDigital = isset($autenticidade['assinaturaDigital']) && $autenticidade['assinaturaDigital'] ? 'Sim' : 'Não';
        
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            <title>Processo {$documento->numero_processo}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 30px; 
                    font-size: 11px;
                    line-height: 1.4;
                    color: #333;
                }
                .header { 
                    text-align: center; 
                    margin-bottom: 30px; 
                    border-bottom: 3px solid #0A3D62; 
                    padding-bottom: 20px; 
                }
                .title { 
                    font-size: 28px; 
                    font-weight: bold; 
                    color: #0A3D62; 
                    margin-bottom: 10px;
                }
                .subtitle { 
                    font-size: 16px; 
                    color: #666; 
                    margin-top: 10px; 
                }
                .section { 
                    margin: 25px 0; 
                    page-break-inside: avoid;
                }
                .section-title { 
                    font-size: 16px; 
                    font-weight: bold; 
                    color: #0A3D62; 
                    margin-bottom: 15px; 
                    border-bottom: 2px solid #CB991A; 
                    padding-bottom: 8px; 
                }
                .field { 
                    margin: 12px 0; 
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }
                .field-label { 
                    font-weight: bold; 
                    color: #555; 
                    width: 35%;
                    min-width: 120px;
                }
                .field-value { 
                    color: #333; 
                    width: 65%;
                    text-align: right;
                    word-wrap: break-word;
                }
                .status { 
                    display: inline-block; 
                    padding: 6px 12px; 
                    border-radius: 6px; 
                    font-weight: bold; 
                    font-size: 10px;
                    text-transform: uppercase;
                }
                .status-concluido { 
                    background-color: #d4edda; 
                    color: #155724; 
                }
                .status-em-andamento { 
                    background-color: #cce5ff; 
                    color: #004085; 
                }
                .status-suspenso { 
                    background-color: #fff3cd; 
                    color: #856404; 
                }
                .status-cancelado { 
                    background-color: #f8d7da; 
                    color: #721c24; 
                }
                .status-draft { 
                    background-color: #e2e3e5; 
                    color: #383d41; 
                }
                .footer { 
                    margin-top: 40px; 
                    text-align: center; 
                    font-size: 9px; 
                    color: #666; 
                    border-top: 1px solid #ccc; 
                    padding-top: 15px; 
                }
                .objeto { 
                    max-width: 100%; 
                    word-wrap: break-word; 
                    text-align: justify;
                    line-height: 1.5;
                }
                .tags { 
                    display: inline-block; 
                    background-color: #f8f9fa; 
                    padding: 4px 8px; 
                    border-radius: 4px; 
                    font-size: 10px; 
                    color: #666;
                }
                .autenticidade { 
                    display: inline-block; 
                    padding: 4px 8px; 
                    border-radius: 4px; 
                    font-size: 10px; 
                    font-weight: bold;
                }
                .autenticidade-valida { 
                    background-color: #d4edda; 
                    color: #155724; 
                }
                .autenticidade-parcial { 
                    background-color: #fff3cd; 
                    color: #856404; 
                }
                .autenticidade-pendente { 
                    background-color: #f8d7da; 
                    color: #721c24; 
                }
                .autenticidade-invalida { 
                    background-color: #f8d7da; 
                    color: #721c24; 
                }
                .grid-2 { 
                    display: flex; 
                    gap: 20px; 
                }
                .grid-2 > div { 
                    flex: 1; 
                }
                .valor { 
                    font-size: 14px; 
                    font-weight: bold; 
                    color: #0A3D62; 
                }
                .numero-processo { 
                    font-size: 16px; 
                    font-weight: bold; 
                    color: #0A3D62; 
                }
            </style>
        </head>
        <body>
            <div class='header'>
                <div class='title'>Portal da Transparência</div>
                <div class='subtitle'>Documento Oficial do Processo</div>
            </div>
            
            <div class='section'>
                <div class='section-title'>Identificação do Processo</div>
                <div class='field'>
                    <span class='field-label'>Número do Processo:</span>
                    <span class='field-value numero-processo'>{$documento->numero_processo}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Número do Documento:</span>
                    <span class='field-value'>{$numeroDocumento}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Tipo:</span>
                    <span class='field-value'>{$tipo}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Modalidade:</span>
                    <span class='field-value'>{$modalidade}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Status:</span>
                    <span class='field-value'>
                        <span class='status status-{$this->getStatusClass($status)}'>{$status}</span>
                    </span>
                </div>
            </div>
            
            <div class='section'>
                <div class='section-title'>Detalhes do Processo</div>
                <div class='field'>
                    <span class='field-label'>Objeto:</span>
                    <span class='field-value objeto'>{$objeto}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Secretaria:</span>
                    <span class='field-value'>{$secretaria}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Setor:</span>
                    <span class='field-value'>{$setorNome}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Valor:</span>
                    <span class='field-value valor'>{$valorFormatado}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Data:</span>
                    <span class='field-value'>{$dataFormatada}</span>
                </div>
            </div>
            
            <div class='section'>
                <div class='section-title'>Informações Adicionais</div>
                <div class='grid-2'>
                    <div>
                        <div class='field'>
                            <span class='field-label'>Tags:</span>
                            <span class='field-value'>
                                <span class='tags'>{$tags}</span>
                            </span>
                        </div>
                        <div class='field'>
                            <span class='field-label'>Nível de Autenticidade:</span>
                            <span class='field-value'>
                                <span class='autenticidade autenticidade-{$this->getAutenticidadeClass($nivelAutenticidade)}'>{$nivelAutenticidade}</span>
                            </span>
                        </div>
                        <div class='field'>
                            <span class='field-label'>Assinatura Digital:</span>
                            <span class='field-value'>{$assinaturaDigital}</span>
                        </div>
                    </div>
                    <div>
                        <div class='field'>
                            <span class='field-label'>Data de Criação:</span>
                            <span class='field-value'>{$dataCriacao}</span>
                        </div>
                        <div class='field'>
                            <span class='field-label'>Última Atualização:</span>
                            <span class='field-value'>{$dataAtualizacao}</span>
                        </div>
                        <div class='field'>
                            <span class='field-label'>ID do Processo:</span>
                            <span class='field-value'>{$documento->id}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class='footer'>
                <p><strong>Portal da Transparência - Sistema de Gestão de Processos</strong></p>
                <p>Este documento foi gerado automaticamente em " . date('d/m/Y H:i:s') . "</p>
                <p>Documento oficial para fins de transparência e controle</p>
            </div>
        </body>
        </html>
        ";
    }
    
    private function gerarHtmlDocumentoSimples($documento)
    {
        // Formatação de dados
        $dataFormatada = $documento->data ? date('d/m/Y', strtotime($documento->data)) : 'N/A';
        $valorFormatado = $documento->valor ? 'R$ ' . number_format($documento->valor, 2, ',', '.') : 'N/A';
        $numeroDocumento = $documento->numero_documento ?: 'N/A';
        $tipo = $documento->tipo ?: 'N/A';
        $modalidade = $documento->modalidade ?: 'N/A';
        $objeto = $documento->objeto ?: 'N/A';
        $secretaria = $documento->secretaria ?: 'N/A';
        $setorNome = $documento->setor ? $documento->setor->nome : 'N/A';
        $status = $documento->status ?: 'N/A';
        $dataCriacao = $documento->created_at ? date('d/m/Y H:i', strtotime($documento->created_at)) : 'N/A';
        $dataAtualizacao = $documento->updated_at ? date('d/m/Y H:i', strtotime($documento->updated_at)) : 'N/A';
        
        // Processar tags
        $tags = $documento->tags ? implode(', ', $documento->tags) : 'Nenhuma tag';
        
        // Processar autenticidade
        $autenticidade = $documento->autenticidade ?: ['nivel' => 'Pendente', 'assinaturaDigital' => false];
        $nivelAutenticidade = $autenticidade['nivel'] ?? 'Pendente';
        $assinaturaDigital = isset($autenticidade['assinaturaDigital']) && $autenticidade['assinaturaDigital'] ? 'Sim' : 'Não';
        
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            <title>Processo {$documento->numero_processo}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 30px; 
                    font-size: 12px;
                    line-height: 1.4;
                    color: #333;
                }
                .header { 
                    text-align: center; 
                    margin-bottom: 30px; 
                    border-bottom: 2px solid #333; 
                    padding-bottom: 20px; 
                }
                .title { 
                    font-size: 24px; 
                    font-weight: bold; 
                    color: #333; 
                    margin-bottom: 10px;
                }
                .subtitle { 
                    font-size: 16px; 
                    color: #666; 
                    margin-top: 10px; 
                }
                .section { 
                    margin: 20px 0; 
                }
                .section-title { 
                    font-size: 16px; 
                    font-weight: bold; 
                    color: #333; 
                    margin-bottom: 15px; 
                    border-bottom: 1px solid #ccc; 
                    padding-bottom: 5px; 
                }
                .field { 
                    margin: 10px 0; 
                }
                .field-label { 
                    font-weight: bold; 
                    color: #555; 
                    display: inline-block;
                    width: 150px;
                }
                .field-value { 
                    color: #333; 
                    display: inline-block;
                }
                .status { 
                    background-color: #f0f0f0; 
                    padding: 2px 6px; 
                    border-radius: 3px; 
                    font-weight: bold; 
                    font-size: 11px;
                }
                .footer { 
                    margin-top: 40px; 
                    text-align: center; 
                    font-size: 10px; 
                    color: #666; 
                    border-top: 1px solid #ccc; 
                    padding-top: 15px; 
                }
                .valor { 
                    font-size: 14px; 
                    font-weight: bold; 
                    color: #333; 
                }
                .numero-processo { 
                    font-size: 16px; 
                    font-weight: bold; 
                    color: #333; 
                }
                .print-instructions {
                    background-color: #f8f9fa;
                    border: 1px solid #dee2e6;
                    border-radius: 5px;
                    padding: 15px;
                    margin: 20px 0;
                    font-size: 11px;
                }
                @media print {
                    .print-instructions {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class='print-instructions'>
                <strong>Instruções para converter em PDF:</strong><br>
                1. Abra este arquivo no seu navegador<br>
                2. Pressione Ctrl+P (ou Cmd+P no Mac)<br>
                3. Selecione 'Salvar como PDF' como destino<br>
                4. Clique em 'Salvar'
            </div>
            
            <div class='header'>
                <div class='title'>Portal da Transparência</div>
                <div class='subtitle'>Documento Oficial do Processo</div>
            </div>
            
            <div class='section'>
                <div class='section-title'>Identificação do Processo</div>
                <div class='field'>
                    <span class='field-label'>Número do Processo:</span>
                    <span class='field-value numero-processo'>{$documento->numero_processo}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Número do Documento:</span>
                    <span class='field-value'>{$numeroDocumento}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Tipo:</span>
                    <span class='field-value'>{$tipo}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Modalidade:</span>
                    <span class='field-value'>{$modalidade}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Status:</span>
                    <span class='field-value'>
                        <span class='status'>{$status}</span>
                    </span>
                </div>
            </div>
            
            <div class='section'>
                <div class='section-title'>Detalhes do Processo</div>
                <div class='field'>
                    <span class='field-label'>Objeto:</span>
                    <span class='field-value'>{$objeto}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Secretaria:</span>
                    <span class='field-value'>{$secretaria}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Setor:</span>
                    <span class='field-value'>{$setorNome}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Valor:</span>
                    <span class='field-value valor'>{$valorFormatado}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Data:</span>
                    <span class='field-value'>{$dataFormatada}</span>
                </div>
            </div>
            
            <div class='section'>
                <div class='section-title'>Informações Adicionais</div>
                <div class='field'>
                    <span class='field-label'>Tags:</span>
                    <span class='field-value'>{$tags}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Nível de Autenticidade:</span>
                    <span class='field-value'>{$nivelAutenticidade}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Assinatura Digital:</span>
                    <span class='field-value'>{$assinaturaDigital}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Data de Criação:</span>
                    <span class='field-value'>{$dataCriacao}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>Última Atualização:</span>
                    <span class='field-value'>{$dataAtualizacao}</span>
                </div>
                <div class='field'>
                    <span class='field-label'>ID do Processo:</span>
                    <span class='field-value'>{$documento->id}</span>
                </div>
            </div>
            
            <div class='footer'>
                <p><strong>Portal da Transparência - Sistema de Gestão de Processos</strong></p>
                <p>Este documento foi gerado automaticamente em " . date('d/m/Y H:i:s') . "</p>
                <p>Documento oficial para fins de transparência e controle</p>
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
    
    private function getAutenticidadeClass($nivel)
    {
        switch (strtolower($nivel)) {
            case 'válida':
            case 'valida':
                return 'valida';
            case 'parcial':
                return 'parcial';
            case 'pendente':
                return 'pendente';
            case 'inválida':
            case 'invalida':
                return 'invalida';
            default:
                return 'pendente';
        }
    }
} 