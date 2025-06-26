
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { PenTool, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { DocumentoProcesso, NivelAssinatura } from '@/Components/ambienteServidor/types/painelProcessos';
import { useToast } from '@/hooks/use-toast';

interface AssinaturaDocumentoProps {
  documento: DocumentoProcesso;
  isOpen: boolean;
  onClose: () => void;
  onAssinar: (metodo: 'Digital' | 'Gov.br', observacoes?: string) => void;
}

export const AssinaturaDocumento = ({ 
  documento, 
  isOpen, 
  onClose, 
  onAssinar 
}: AssinaturaDocumentoProps) => {
  const [metodoAssinatura, setMetodoAssinatura] = useState<'Digital' | 'Gov.br'>('Digital');
  const [observacoes, setObservacoes] = useState('');
  const [assinando, setAssinando] = useState(false);
  const { toast } = useToast();

  const handleAssinar = async () => {
    setAssinando(true);
    
    try {
      // Simular processo de assinatura
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onAssinar(metodoAssinatura, observacoes);
      
      toast({
        title: "Documento assinado com sucesso!",
        description: `Assinatura ${metodoAssinatura} realizada com êxito.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao assinar documento",
        description: "Tente novamente ou entre em contato com o suporte.",
        variant: "destructive",
      });
    } finally {
      setAssinando(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            Assinar Documento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Documento */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-1">{documento.nome}</h3>
            <p className="text-sm text-gray-600">{documento.numero} - {documento.tipo}</p>
            <p className="text-sm text-gray-500 mt-1">
              Responsável: {documento.responsavel} | Autor: {documento.autor}
            </p>
          </div>

          {/* Método de Assinatura */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Método de Assinatura:
            </Label>
            <RadioGroup 
              value={metodoAssinatura} 
              onValueChange={(value: 'Digital' | 'Gov.br') => setMetodoAssinatura(value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="Digital" id="digital" />
                <Label htmlFor="digital" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="font-medium">Assinatura Digital Interna</div>
                    <div className="text-sm text-gray-500">Assinatura através do sistema LUMEN</div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="Gov.br" id="govbr" />
                <Label htmlFor="govbr" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="font-medium">Assinatura via Gov.br</div>
                    <div className="text-sm text-gray-500">Assinatura oficial através da plataforma Gov.br</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes" className="text-base font-semibold mb-2 block">
              Observações da Assinatura:
            </Label>
            <Textarea
              id="observacoes"
              placeholder="Adicione observações sobre a assinatura (opcional)..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Aviso sobre a Assinatura */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800">Importante:</p>
                <p className="text-blue-700">
                  {metodoAssinatura === 'Digital' 
                    ? 'A assinatura digital será registrada com seu usuário e horário atual. Esta ação não pode ser desfeita.'
                    : 'Você será redirecionado para o portal Gov.br para completar a assinatura oficial. Mantenha seus documentos em mãos.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={assinando}>
            Cancelar
          </Button>
          <Button onClick={handleAssinar} disabled={assinando}>
            {assinando ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Assinando...
              </>
            ) : (
              <>
                <PenTool className="h-4 w-4 mr-2" />
                Assinar Documento
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
