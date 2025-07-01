import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AssinaturaDocumentoProps {
  documento: any;
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
  const [metodo, setMetodo] = useState<'Digital' | 'Gov.br'>('Digital');
  const [observacoes, setObservacoes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAssinar = async () => {
    if (!metodo) {
      toast({
        title: "Erro",
        description: "Selecione um método de assinatura",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await onAssinar(metodo, observacoes);
      toast({
        title: "Sucesso",
        description: "Documento assinado com sucesso",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao assinar documento",
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
          <DialogTitle>Assinar Documento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="documento">Documento</Label>
            <div className="mt-1 p-2 bg-gray-50 rounded border">
              {documento?.nome || 'Documento não especificado'}
            </div>
          </div>

          <div>
            <Label htmlFor="metodo">Método de Assinatura</Label>
            <Select value={metodo} onValueChange={(value: 'Digital' | 'Gov.br') => setMetodo(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Digital">Assinatura Digital</SelectItem>
                <SelectItem value="Gov.br">Gov.br</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="observacoes">Observações (opcional)</Label>
            <Textarea
              id="observacoes"
              placeholder="Adicione observações sobre a assinatura..."
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
          <Button onClick={handleAssinar} disabled={isLoading}>
            {isLoading ? 'Assinando...' : 'Assinar Documento'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 