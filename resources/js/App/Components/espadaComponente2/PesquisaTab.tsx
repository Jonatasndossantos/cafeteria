import React from 'react';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import InfoIcon from './InfoIcon';
import { Plus, FileText, BarChart3, Trash2, Edit, Upload, File } from 'lucide-react';
import { usePesquisaData } from '@/hooks/useFormDataEsp2';
import { StandardCard } from './standard-card';

const PesquisaTab = () => {
  const {
    metodologia,
    fontes,
    estatisticas,
    uploadedFiles,
    updatePesquisaField,
    addFonte,
    removeFonte,
    addFile,
    removeFile,
    isLoading,
    isUpdating
  } = usePesquisaData();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => addFile(file));
  };

  if (isLoading) {
    return <div className="animate-pulse">Carregando dados...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Bloco de Upload de Documentos */}
      <StandardCard 
        title="Upload de Documentos de Cotação/Mapa de Preços"
        icon={Upload}
      >
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-lumen-blue transition-all duration-200">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4 text-sm">Arraste e solte seus arquivos aqui ou clique para selecionar</p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-lumen-blue text-white rounded-md hover:bg-lumen-blue/90 cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <Upload className="w-4 h-4 mr-2" />
            Selecionar Arquivos
          </label>
          <p className="text-sm text-gray-500 mt-2">Formatos aceitos: PDF, DOC, DOCX, XLS, XLSX</p>
        </div>
        
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Arquivos Carregados:</h3>
            <div className="space-y-2">
              {uploadedFiles.map((file: any, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-all duration-200">
                  <div className="flex items-center">
                    <File className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-900">{file.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800 hover:scale-105 transition-all duration-200"
                    disabled={isUpdating}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              className="mt-3 bg-lumen-gold text-lumen-blue hover:bg-lumen-gold/90 hover:scale-105 transition-all duration-200"
              disabled={isUpdating}
            >
              Processar com LUX
            </Button>
          </div>
        )}
        <InfoIcon text="Faça upload dos documentos de cotação ou mapa de preços. O sistema LUX processará automaticamente as informações." />
      </StandardCard>

      {/* Bloco de Metodologia */}
      <StandardCard 
        title="Metodologia da Pesquisa de Preços"
        icon={FileText}
      >
        <Textarea 
          rows={4}
          value={metodologia}
          onChange={(e) => updatePesquisaField('metodologia', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Metodologia preenchida automaticamente pelo LUX. Conforme Instrução Normativa 73/2020 e art. 23 da Lei 14.133/21." />
      </StandardCard>

      {/* Tabela de Fontes e Preços Coletados */}
      <StandardCard 
        title="Fontes e Preços Coletados"
        icon={BarChart3}
      >
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-medium">Dados Carregados Automaticamente</p>
              <p className="text-sm text-blue-700 mt-1">
                As fontes foram carregadas automaticamente pelo sistema LUX com base nos documentos processados.
              </p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Fonte</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Data</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Valor Unitário</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Comprovante</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fontes.map((fonte: any) => (
                <tr key={fonte.id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fonte.fonte}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Badge variant="outline">{fonte.tipo}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fonte.data}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    R$ {fonte.valor.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline cursor-pointer">
                    {fonte.comprovante}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button variant="ghost" size="sm" className="text-lumen-blue hover:text-lumen-blue/80 hover:scale-105 transition-all duration-200">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFonte(fonte.id)}
                      disabled={isUpdating}
                      className="text-red-600 hover:text-red-800 hover:scale-105 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex space-x-4">
          <Button 
            variant="outline" 
            className="border-dashed border-lumen-blue text-lumen-blue hover:bg-gray-50 hover:scale-105 transition-all duration-200"
            disabled={isUpdating}
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Fonte Manual
          </Button>
          <Button 
            className="bg-lumen-gold text-lumen-blue hover:bg-lumen-gold/90 hover:scale-105 transition-all duration-200"
            disabled={isUpdating}
          >
            Atualizar Estatísticas
          </Button>
        </div>
      </StandardCard>
    </div>
  );
};

export default PesquisaTab;
