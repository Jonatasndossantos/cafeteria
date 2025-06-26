
import React from 'react';
import { FileText, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Legislacao {
  id: number;
  titulo: string;
  integrado: boolean;
  dataAtualizacao: string;
}

interface LegislacaoMunicipalProps {
  legislacao: Legislacao[];
}

export const LegislacaoMunicipal = ({ legislacao }: LegislacaoMunicipalProps) => {
  const navigate = useNavigate();

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Navegação */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-[#0A3D62] hover:text-[#CB991A] transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Início
          </button>
          <button 
            onClick={() => navigate('/paineis-operacionais')}
            className="flex items-center text-[#0A3D62] hover:text-[#CB991A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Painéis Operacionais
          </button>
        </div>
        <button 
          onClick={() => navigate('/escudo-protecao')}
          className="flex items-center text-[#0A3D62] hover:text-[#CB991A] transition-colors"
        >
          Escudo da Proteção
          <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
        </button>
      </div>

      {/* Seções do Acervo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Legislação Municipal */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold text-[#0A3D62] mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-[#D4AF37]" />
            Leis Municipais Ativas
          </h3>
          
          {legislacao.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              Nenhuma legislação municipal cadastrada.
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {legislacao.map((lei) => (
                <div key={lei.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="truncate" title={lei.titulo}>
                      {lei.titulo}
                    </span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${lei.integrado ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                </div>
              ))}
              <div className="text-xs text-gray-500 pt-2">
                Última atualização: {formatarData(legislacao[0]?.dataAtualizacao)}
              </div>
            </div>
          )}
          
          <div className="mt-4">
            <button className="w-full bg-[#0A3D62] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
              Enviar nova legislação
            </button>
          </div>
        </div>

        {/* Manuais e Notas Técnicas */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold text-[#0A3D62] mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-[#D4AF37]" />
            Manuais e Notas Técnicas
          </h3>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                <span>Manual TCU de Licitações</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                <span>Orientações CGU</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                <span>Guias Práticos de Gestão</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full bg-[#0A3D62] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
              Adicionar Manual
            </button>
          </div>
        </div>

        {/* Modelos */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold text-[#0A3D62] mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-[#D4AF37]" />
            Modelos e Templates
          </h3>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-purple-500" />
                <span>Modelo de Edital</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-purple-500" />
                <span>Template de Contrato</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-purple-500" />
                <span>Modelo de Parecer Jurídico</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full bg-[#0A3D62] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
              Novo Modelo
            </button>
          </div>
        </div>

        {/* Capacitação */}
        <div className="bg-white rounded-2xl shadow p-6 md:col-span-2 lg:col-span-3">
          <h3 className="text-xl font-semibold text-[#0A3D62] mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-[#D4AF37]" />
            Capacitação Contínua
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Cursos Online</h4>
              <div className="space-y-1 text-sm text-blue-600">
                <div>• Lei 14.133/21 - Completo</div>
                <div>• Gestão de Contratos</div>
                <div>• Transparência Pública</div>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                Acessar Cursos
              </button>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Webinars</h4>
              <div className="space-y-1 text-sm text-green-600">
                <div>• Atualização Jurisprudencial</div>
                <div>• Casos Práticos TCU</div>
                <div>• Mesa Redonda Especialistas</div>
              </div>
              <button className="mt-3 w-full bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700 transition-colors">
                Próximos Eventos
              </button>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Certificações</h4>
              <div className="space-y-1 text-sm text-yellow-600">
                <div>• Especialista em Licitações</div>
                <div>• Gestor Público Certificado</div>
                <div>• Compliance Municipal</div>
              </div>
              <button className="mt-3 w-full bg-yellow-600 text-white py-1 px-3 rounded text-sm hover:bg-yellow-700 transition-colors">
                Iniciar Certificação
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
