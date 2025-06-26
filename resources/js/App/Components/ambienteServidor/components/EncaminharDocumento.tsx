
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Send, User, AlertCircle } from 'lucide-react';
import { DocumentoProcesso } from '@/Components/ambienteServidor/types/painelProcessos';
import { useToast } from '@/hooks/use-toast';

interface EncaminharDocumentoProps {
  documento: DocumentoProcesso;
  isOpen: boolean;
  onClose: () => void;
  onEncaminhar: (responsavel: string, observacoes?: string) => void;
}

// Lista de responsáveis disponíveis (seria carregada de uma API)
const responsaveisDisponiveis = [
  { id: 'carlos.pereira', nome: 'Carlos Pereira', cargo: 'Diretor Administrativo', setor: 'Administração' },
  { id: 'dr.roberto', nome: 'Dr. Roberto Mendes', cargo: 'Procurador', setor: 'Jurídico' },
  { id: 'ana.silva', nome: 'Ana Silva', cargo: 'Coordenadora', setor: 'Educação' },
  { id: 'maria.oliveira', nome: 'Maria Oliveira', cargo: 'Secretária', setor: 'Educação' },
  { id: 'joao.silva', nome: 'João Silva', cargo: 'Fiscal', setor: 'TI' },
];

export const EncaminharDocumento = ({ 
  documento, 
  isOpen, 
  onClose, 
  onEncaminhar 
}: EncaminharDocumentoProps) => {
  const [responsavelSelecionado, setResponsavelSelecionado] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [encaminhando, setEncaminhando] = useState(false);
  const { toast } = useToast();

  const handleEncaminhar = async () => {
    if (!responsavelSelecionado) {
      toast({
        title: "Selecione um responsável",
        description: "É necessário selecionar para quem encaminhar o documento.",
        variant: "destructive",
      });
      return;
    }

    setEncaminhando(true);
    
    try {
      // Simular processo de encaminhamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const responsavel = responsaveisDisponiveis.find(r => r.id === responsavelSelecionado);
      onEncaminhar(responsavelSelecionado, observacoes);
      
      toast({
        title: "Documento encaminhado com sucesso!",
        description: `O documento foi encaminhado para ${responsavel?.nome}`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao encaminhar documento",
        description: "Tente novamente ou entre em contato com o suporte.",
        variant: "destructive",
      });
    } finally {
      setEncaminhando(false);
    }
  };

  const responsavelInfo = responsaveisDisponiveis.find(r => r.id === responsavelSelecionado);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Encaminhar Documento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Documento */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-1">{documento.nome}</h3>
            <p className="text-sm text-gray-600">{documento.numero} - {documento.tipo}</p>
          </div>

          {/* Seleção de Responsável */}
          <div>
            <Label htmlFor="responsavel" className="text-base font-semibold mb-2 block">
              Encaminhar para:
            </Label>
            <Select value={responsavelSelecionado} onValueChange={setResponsavelSelecionado}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o próximo responsável..." />
              </SelectTrigger>
              <SelectContent>
                {responsaveisDisponiveis.map((responsavel) => (
                  <SelectItem key={responsavel.id} value={responsavel.id}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{responsavel.nome}</div>
                        <div className="text-xs text-gray-500">{responsavel.cargo} - {responsavel.setor}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {responsavelInfo && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                <p><strong>Selecionado:</strong> {responsavelInfo.nome}</p>
                <p><strong>Cargo:</strong> {responsavelInfo.cargo}</p>
                <p><strong>Setor:</strong> {responsavelInfo.setor}</p>
              </div>
            )}
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes" className="text-base font-semibold mb-2 block">
              Observações para o encaminhamento:
            </Label>
            <Textarea
              id="observacoes"
              placeholder="Adicione instruções ou observações para o próximo responsável..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Aviso */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800">Sobre o encaminhamento:</p>
                <p className="text-blue-700">
                  O responsável selecionado receberá uma notificação e o documento 
                  aparecerá na lista de pendências dele. Você poderá acompanhar o 
                  status na linha do tempo do processo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={encaminhando}>
            Cancelar
          </Button>
          <Button onClick={handleEncaminhar} disabled={encaminhando || !responsavelSelecionado}>
            {encaminhando ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Encaminhando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Encaminhar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
