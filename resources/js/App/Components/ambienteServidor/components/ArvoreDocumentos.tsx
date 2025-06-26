
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '../../ui/separator';
import { 
  FileText, 
  Download, 
  Eye, 
  PenTool, 
  Send, 
  Paperclip, 
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';
import { ProcessoAdministrativo, DocumentoProcesso, AnexoProcesso } from '@/Components/ambienteServidor/types/painelProcessos';
import { AssinaturaDocumento } from '@/Components/ambienteServidor/components/AssinaturaDocumento';
import { EncaminharDocumento } from '@/Components/ambienteServidor/components/EncaminharDocumento';
import { AnexarDocumento } from '@/Components/ambienteServidor/components/AnexarDocumento';
import { useToast } from '@/hooks/use-toast';

interface ArvoreDocumentosProps {
  processo: ProcessoAdministrativo;
}

export const ArvoreDocumentos = ({ processo }: ArvoreDocumentosProps) => {
  const [documentoParaAssinar, setDocumentoParaAssinar] = useState<DocumentoProcesso | null>(null);
  const [documentoParaEncaminhar, setDocumentoParaEncaminhar] = useState<DocumentoProcesso | null>(null);
  const [mostrarAnexarDocumento, setMostrarAnexarDocumento] = useState(false);
  const { toast } = useToast();

  // Simulação do usuário logado
  const usuarioLogado = 'Ana Silva'; // Em uma aplicação real, viria do contexto

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Assinado':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'Pendente Assinatura':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Em Análise':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Rejeitado':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Assinado':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pendente Assinatura':
        return <Clock className="h-4 w-4" />;
      case 'Em Análise':
        return <Eye className="h-4 w-4" />;
      case 'Rejeitado':
        return <X className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const podeAssinarDocumento = (documento: DocumentoProcesso) => {
    return documento.requerAssinatura && 
           documento.status === 'Pendente Assinatura' &&
           documento.responsavel === usuarioLogado;
  };

  const podeEncaminharDocumento = (documento: DocumentoProcesso) => {
    return documento.podeSerEncaminhado && 
           documento.autor === usuarioLogado &&
           documento.status === 'Assinado';
  };

  const handleAssinarDocumento = (metodo: 'Digital' | 'Gov.br', observacoes?: string) => {
    if (!documentoParaAssinar) return;

    console.log('Assinando documento:', documentoParaAssinar.id, 'Método:', metodo);
    
    toast({
      title: "Documento assinado!",
      description: `O documento ${documentoParaAssinar.nome} foi assinado via ${metodo}.`,
    });

    setDocumentoParaAssinar(null);
  };

  const handleEncaminharDocumento = (responsavel: string, observacoes?: string) => {
    if (!documentoParaEncaminhar) return;

    console.log('Encaminhando documento:', documentoParaEncaminhar.id, 'Para:', responsavel);
    
    toast({
      title: "Documento encaminhado!",
      description: `O documento ${documentoParaEncaminhar.nome} foi encaminhado.`,
    });

    setDocumentoParaEncaminhar(null);
  };

  const handleAnexarDocumento = (anexoData: any) => {
    console.log('Anexando documento ao processo:', processo.id, anexoData);
    
    toast({
      title: "Documento anexado!",
      description: `O documento ${anexoData.nome} foi anexado ao processo.`,
    });

    setMostrarAnexarDocumento(false);
  };

  const handleVisualizarDocumento = (documento: DocumentoProcesso) => {
    toast({
      title: "Visualizando documento",
      description: `Abrindo ${documento.nome}...`,
    });
  };

  const handleBaixarDocumento = (documento: DocumentoProcesso) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${documento.nome}...`,
    });
  };

  const handleVisualizarAnexo = (anexo: AnexoProcesso) => {
    toast({
      title: "Visualizando anexo",
      description: `Abrindo ${anexo.nome}...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com ação de anexar */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Documentos do Processo</h3>
        <Button
          onClick={() => setMostrarAnexarDocumento(true)}
          className="flex items-center gap-2"
        >
          <Paperclip className="h-4 w-4" />
          Anexar Documento
        </Button>
      </div>

      {/* Lista de Documentos Principais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentos Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processo.documentos.map((documento, index) => (
              <div key={documento.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(documento.status)}
                      <h4 className="font-semibold">{documento.nome}</h4>
                      <Badge variant="outline" className={getStatusColor(documento.status)}>
                        {documento.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {documento.numero} - {documento.tipo}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {documento.dataEmissao}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {documento.responsavel}
                      </div>
                      {documento.dataAssinatura && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Assinado em {documento.dataAssinatura}
                        </div>
                      )}
                    </div>

                    {documento.observacoes && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                        <strong>Observações:</strong> {documento.observacoes}
                      </div>
                    )}
                  </div>

                  {/* Ações do Documento */}
                  <div className="flex flex-col gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleVisualizarDocumento(documento)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      Ver
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBaixarDocumento(documento)}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Baixar
                    </Button>

                    {podeAssinarDocumento(documento) && (
                      <Button 
                        size="sm"
                        onClick={() => setDocumentoParaAssinar(documento)}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <PenTool className="h-3 w-3" />
                        Assinar
                      </Button>
                    )}

                    {podeEncaminharDocumento(documento) && (
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => setDocumentoParaEncaminhar(documento)}
                        className="flex items-center gap-1"
                      >
                        <Send className="h-3 w-3" />
                        Encaminhar
                      </Button>
                    )}
                  </div>
                </div>

                {/* Assinaturas */}
                {documento.assinaturas.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <h5 className="text-sm font-semibold mb-2">Assinaturas:</h5>
                    <div className="space-y-1">
                      {documento.assinaturas.map((assinatura) => (
                        <div key={assinatura.id} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{assinatura.responsavel}</span>
                          <Badge variant="secondary" className="text-xs">
                            {assinatura.tipo}
                          </Badge>
                          <span className="text-gray-500">
                            {assinatura.dataAssinatura} via {assinatura.metodoAutenticacao}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Anexos */}
      {processo.anexos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Paperclip className="h-5 w-5" />
              Anexos ({processo.anexos.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processo.anexos.map((anexo) => (
                <div key={anexo.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">{anexo.nome}</p>
                      <p className="text-xs text-gray-500">
                        {(anexo.tamanho / 1024 / 1024).toFixed(2)} MB • 
                        Enviado por {anexo.responsavelUpload} em {anexo.dataUpload}
                      </p>
                      {anexo.descricao && (
                        <p className="text-xs text-gray-600 mt-1">{anexo.descricao}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleVisualizarAnexo(anexo)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBaixarDocumento(anexo as any)}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modais */}
      {documentoParaAssinar && (
        <AssinaturaDocumento
          documento={documentoParaAssinar}
          isOpen={!!documentoParaAssinar}
          onClose={() => setDocumentoParaAssinar(null)}
          onAssinar={handleAssinarDocumento}
        />
      )}

      {documentoParaEncaminhar && (
        <EncaminharDocumento
          documento={documentoParaEncaminhar}
          isOpen={!!documentoParaEncaminhar}
          onClose={() => setDocumentoParaEncaminhar(null)}
          onEncaminhar={handleEncaminharDocumento}
        />
      )}

      <AnexarDocumento
        processo={processo}
        isOpen={mostrarAnexarDocumento}
        onClose={() => setMostrarAnexarDocumento(false)}
        onAnexar={handleAnexarDocumento}
      />
    </div>
  );
};
