import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Paperclip, Upload, File, X, AlertCircle } from 'lucide-react';
import { ProcessoAdministrativo, TipoDocumento } from '@/Components/ambienteServidor/types/painelProcessos';
import { useToast } from '@/hooks/use-toast';

interface AnexarDocumentoProps {
  processo: ProcessoAdministrativo;
  isOpen: boolean;
  onClose: () => void;
  onAnexar: (anexo: {
    nome: string;
    tipo: string;
    tamanho: number;
    arquivo: string;
    descricao?: string;
    documentoVinculado?: string;
  }) => void;
}

export const AnexarDocumento = ({ 
  processo, 
  isOpen, 
  onClose, 
  onAnexar 
}: AnexarDocumentoProps) => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [nomeDocumento, setNomeDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento | ''>('');
  const [descricao, setDescricao] = useState('');
  const [documentoVinculado, setDocumentoVinculado] = useState('');
  const [anexando, setAnexando] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const tiposDocumento: TipoDocumento[] = [
    'Anexo', 'Ofício', 'Memorando', 'Nota Fiscal', 'Relatório de Fiscalização',
    'Parecer Jurídico', 'Informação Orçamentária'
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar tamanho do arquivo (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB.",
          variant: "destructive",
        });
        return;
      }

      setArquivo(file);
      
      // Auto-preencher nome se estiver vazio
      if (!nomeDocumento) {
        setNomeDocumento(file.name.split('.')[0]);
      }
    }
  };

  const handleAnexar = async () => {
    if (!arquivo) {
      toast({
        title: "Selecione um arquivo",
        description: "É necessário selecionar um arquivo para anexar.",
        variant: "destructive",
      });
      return;
    }

    if (!nomeDocumento.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite um nome para o documento.",
        variant: "destructive",
      });
      return;
    }

    setAnexando(true);
    
    try {
      // Simular upload do arquivo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Criar URL simulada para o arquivo
      const arquivoUrl = `anexos/${processo.numero}/${arquivo.name}`;
      
      onAnexar({
        nome: nomeDocumento,
        tipo: arquivo.type,
        tamanho: arquivo.size,
        arquivo: arquivoUrl,
        descricao: descricao || undefined,
        documentoVinculado: documentoVinculado || undefined,
      });
      
      toast({
        title: "Documento anexado com sucesso!",
        description: `O arquivo ${nomeDocumento} foi anexado ao processo.`,
      });
      
      onClose();
      
      // Limpar formulário
      setArquivo(null);
      setNomeDocumento('');
      setTipoDocumento('');
      setDescricao('');
      setDocumentoVinculado('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Erro ao anexar documento",
        description: "Tente novamente ou entre em contato com o suporte.",
        variant: "destructive",
      });
    } finally {
      setAnexando(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Paperclip className="h-5 w-5" />
            Anexar Documento ao Processo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Processo */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-1">{processo.objeto}</h3>
            <p className="text-sm text-gray-600">{processo.numero} - {processo.modalidade}</p>
          </div>

          {/* Seleção de Arquivo */}
          <div>
            <Label className="text-base font-semibold mb-2 block">
              Selecionar Arquivo:
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              {arquivo ? (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4 text-gray-500" />
                    <div className="text-left">
                      <p className="font-medium text-sm">{arquivo.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(arquivo.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setArquivo(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Arraste e solte um arquivo aqui ou clique para selecionar
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Selecionar Arquivo
                  </Button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
              />
            </div>
          </div>

          {/* Informações do Documento */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nomeDocumento" className="text-base font-semibold mb-2 block">
                Nome do Documento:
              </Label>
              <Input
                id="nomeDocumento"
                placeholder="Digite o nome do documento..."
                value={nomeDocumento}
                onChange={(e) => setNomeDocumento(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-base font-semibold mb-2 block">
                Tipo de Documento:
              </Label>
              <Select value={tipoDocumento} onValueChange={(value: TipoDocumento) => setTipoDocumento(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo..." />
                </SelectTrigger>
                <SelectContent>
                  {tiposDocumento.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vinculação a Documento Existente */}
          <div>
            <Label className="text-base font-semibold mb-2 block">
              Vincular a Documento Existente (opcional):
            </Label>
            <Select value={documentoVinculado || 'nao-vincular'} onValueChange={setDocumentoVinculado}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um documento..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nao-vincular">Não vincular</SelectItem>
                {processo.documentos.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    {doc.numero} - {doc.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="descricao" className="text-base font-semibold mb-2 block">
              Descrição (opcional):
            </Label>
            <Textarea
              id="descricao"
              placeholder="Adicione uma descrição sobre o documento anexado..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
            />
          </div>

          {/* Aviso */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800">Sobre a anexação:</p>
                <p className="text-blue-700">
                  O documento será automaticamente integrado ao processo e 
                  ficará disponível na árvore de documentos. Tamanho máximo: 10MB.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={anexando}>
            Cancelar
          </Button>
          <Button onClick={handleAnexar} disabled={anexando || !arquivo}>
            {anexando ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Anexando...
              </>
            ) : (
              <>
                <Paperclip className="h-4 w-4 mr-2" />
                Anexar Documento
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
