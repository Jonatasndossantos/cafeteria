import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface EncaminharDocumentoProps {
  documento: any;
  isOpen: boolean;
  onClose: () => void;
  onEncaminhar: (responsavel: string, observacoes?: string) => void;
}

export const EncaminharDocumento = ({
  documento,
  isOpen,
  onClose,
  onEncaminhar
}: EncaminharDocumentoProps) => {
  const [responsavel, setResponsavel] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const responsaveis = [
    'Secretaria de Administração',
    'Secretaria de Finanças',
    'Secretaria de Planejamento',
    'Secretaria de Obras',
    'Secretaria de Saúde',
    'Secretaria de Educação',
    'Secretaria de Cultura',
    'Secretaria de Esportes',
    'Secretaria de Meio Ambiente',
    'Secretaria de Transportes'
  ];

  const handleEncaminhar = async () => {
    if (!responsavel) {
      toast({
        title: "Erro",
        description: "Selecione um responsável",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await onEncaminhar(responsavel, observacoes);
      toast({
        title: "Sucesso",
        description: "Documento encaminhado com sucesso",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao encaminhar documento",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Encaminhar Documento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="documento">Documento</Label>
            <div className="mt-1 p-2 bg-gray-50 rounded border">
              {documento?.nome || 'Documento não especificado'}
            </div>
          </div>

          <div>
            <Label htmlFor="responsavel">Responsável</Label>
            <Select value={responsavel} onValueChange={setResponsavel}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o responsável" />
              </SelectTrigger>
              <SelectContent>
                {responsaveis.map((resp) => (
                  <SelectItem key={resp} value={resp}>
                    {resp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="observacoes">Observações (opcional)</Label>
            <Textarea
              id="observacoes"
              placeholder="Adicione observações sobre o encaminhamento..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleEncaminhar} disabled={isLoading}>
            {isLoading ? 'Encaminhando...' : 'Encaminhar Documento'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 