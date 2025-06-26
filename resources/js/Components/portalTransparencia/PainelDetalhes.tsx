
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '@/Components/ui/separator';
import { DocumentoPublico } from '@/types/portalTransparencia';
import { SeloTransparencia } from './SeloTransparencia';
import { 
  Eye, Download, Search, Share, Code, Printer, Calendar, 
  User, Building, DollarSign, Clock, Shield, FileText, Link
} from 'lucide-react';

interface PainelDetalhesProps {
  documento: DocumentoPublico | null;
  isOpen: boolean;
  onClose: () => void;
  onVerProcessoCompleto: (numeroProcesso: string) => void;
}

export const PainelDetalhes = ({ 
  documento, 
  isOpen, 
  onClose, 
  onVerProcessoCompleto 
}: PainelDetalhesProps) => {
  if (!documento) return null;

  const formatarMoeda = (valor?: number) => {
    if (!valor) return 'Não informado';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getIconeAutenticidade = () => {
    switch (documento.autenticidade.nivel) {
      case 'Válida':
        return <Shield className="w-5 h-5 text-green-600" />;
      case 'Parcial':
        return <Shield className="w-5 h-5 text-yellow-600" />;
      default:
        return <Shield className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText className="w-6 h-6" />
            <div>
              <div className="text-lg">{documento.nome}</div>
              <div className="text-sm font-normal text-gray-500">
                {documento.numeroDocumento}
              </div>
            </div>
            {getIconeAutenticidade()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Principais */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">Processo:</span>
                <Badge variant="outline">{documento.numeroProcesso}</Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">Secretaria:</span>
                <span className="text-sm">{documento.secretaria}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">Valor Estimado:</span>
                <span className="text-sm font-semibold">{formatarMoeda(documento.valor)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={documento.status === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                  {documento.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Origem:</span>
                <span className="text-sm">{documento.origem}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Espada:</span>
                <Badge variant="outline">Espada {documento.espada}</Badge>
              </div>
            </div>
          </div>

          {/* Objeto */}
          <div>
            <h3 className="mb-2 font-semibold">Objeto da Contratação</h3>
            <p className="p-3 text-sm text-gray-700 rounded bg-gray-50">{documento.objeto}</p>
          </div>

          <Separator />

          {/* Datas Importantes */}
          <div>
            <h3 className="flex items-center gap-2 mb-3 font-semibold">
              <Calendar className="w-4 h-4" />
              Datas Importantes
            </h3>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
              <div>
                <span className="font-medium text-gray-600">Criação:</span>
                <div>{formatarData(documento.dataCriacao)}</div>
              </div>
              {documento.dataAprovacao && (
                <div>
                  <span className="font-medium text-gray-600">Aprovação:</span>
                  <div>{formatarData(documento.dataAprovacao)}</div>
                </div>
              )}
              <div>
                <span className="font-medium text-gray-600">Publicação:</span>
                <div>{formatarData(documento.dataPublicacao)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                Tempo criação-publicação: <strong>{documento.tempoPublicacao} dias</strong>
              </span>
            </div>
          </div>

          <Separator />

          {/* Documentos Relacionados */}
          {documento.documentosRelacionados.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 mb-3 font-semibold">
                <Link className="w-4 h-4" />
                Documentos Relacionados
              </h3>
              <div className="space-y-2">
                {documento.documentosRelacionados.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <FileText className="w-3 h-3 text-gray-400" />
                    <Button variant="link" className="h-auto p-0 text-sm text-blue-600">
                      {doc}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Assinaturas */}
          <div>
            <h3 className="flex items-center gap-2 mb-3 font-semibold">
              <User className="w-4 h-4" />
              Assinaturas
            </h3>
            <div className="space-y-3">
              {documento.assinaturas.map((assinatura, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded bg-gray-50">
                  <div>
                    <div className="text-sm font-medium">{assinatura.nome}</div>
                    <div className="text-xs text-gray-600">{assinatura.cargo}</div>
                    <div className="text-xs text-gray-500">{formatarData(assinatura.data)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={assinatura.tipo === 'Digital' ? 'default' : 'outline'}>
                      {assinatura.tipo}
                    </Badge>
                    <div className={`h-2 w-2 rounded-full ${assinatura.valida ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Autenticidade */}
          <div>
            <h3 className="flex items-center gap-2 mb-3 font-semibold">
              <Shield className="w-4 h-4" />
              Informações de Autenticidade
            </h3>
            <div className="p-4 space-y-2 text-sm rounded bg-gray-50">
              <div className="flex justify-between">
                <span>Assinatura Digital:</span>
                <span className={documento.autenticidade.assinaturaDigital ? 'text-green-600 font-medium' : 'text-red-600'}>
                  {documento.autenticidade.assinaturaDigital ? 'Válida' : 'Não aplicada'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Certificado ICP-Brasil:</span>
                <span className={documento.autenticidade.certificadoICP ? 'text-green-600 font-medium' : 'text-red-600'}>
                  {documento.autenticidade.certificadoICP ? 'Válido' : 'Não aplicado'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Hash de Integridade:</span>
                <span className="font-mono text-xs">{documento.hash}</span>
              </div>
              <div className="flex justify-between">
                <span>Verificado em:</span>
                <span>{formatarData(documento.autenticidade.dataVerificacao)}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {documento.tags.length > 0 && (
            <div>
              <h3 className="mb-3 font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {documento.tags.map(tag => (
                  <Badge key={tag} variant="secondary">#{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button variant="default" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Visualizar
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Baixar PDF
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => onVerProcessoCompleto(documento.numeroProcesso)}
            >
              <Search className="w-4 h-4" />
              Ver Processo
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Compartilhar
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Embed
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
