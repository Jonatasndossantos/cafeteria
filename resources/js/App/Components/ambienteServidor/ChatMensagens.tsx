
import React, { useState } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { MessageCircle, Send, User, Calendar } from 'lucide-react';
import { conversas, setores, usuario } from '../../hooks/AmbienteServidorData/ambienteServidorData';
import { Conversa } from '../../hooks/AmbienteServidorData/ambienteServidor';

export const ChatMensagens = () => {
  const [novaMensagem, setNovaMensagem] = useState('');
  const [setorDestino, setSetorDestino] = useState('');
  const [conversaSelecionada, setConversaSelecionada] = useState<Conversa | null>(null);

  const handleEnviarMensagem = () => {
    if (novaMensagem.trim() && conversaSelecionada) {
      console.log('Enviando mensagem:', novaMensagem);
      setNovaMensagem('');
    }
  };

  const handleNovaConversa = () => {
    if (novaMensagem.trim() && setorDestino) {
      console.log('Nova conversa para:', setorDestino, 'Mensagem:', novaMensagem);
      setNovaMensagem('');
      setSetorDestino('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Chat e Mensagens</h2>
        <p className="text-gray-600 text-sm">Comunicação entre setores para planejamento e execução</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Lista de Conversas */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Conversas</h3>
                <Button variant="outline" size="sm" onClick={() => setConversaSelecionada(null)}>
                  Nova Conversa
                </Button>
              </div>
              
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {conversas.map((conversa) => (
                  <div
                    key={conversa.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      conversaSelecionada?.id === conversa.id 
                        ? 'bg-blue-50 border-blue-200 border' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setConversaSelecionada(conversa)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-sm">{conversa.setor}</span>
                      </div>
                      {conversa.naoLidas > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversa.naoLidas}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{conversa.assunto}</p>
                    <p className="text-xs text-gray-500 truncate">{conversa.ultimaMensagem}</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="text-xs">
                        Espada {conversa.espada}
                      </Badge>
                      <span className="text-xs text-gray-400">{conversa.dataUltimaMensagem}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Área de Chat */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-0 h-full flex flex-col">
              {conversaSelecionada ? (
                <>
                  {/* Cabeçalho da conversa */}
                  <div className="border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{conversaSelecionada.setor}</h3>
                        <p className="text-sm text-gray-600">{conversaSelecionada.assunto}</p>
                      </div>
                      <Badge variant="outline">Espada {conversaSelecionada.espada}</Badge>
                    </div>
                  </div>
                  
                  {/* Mensagens */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {conversaSelecionada.mensagens.map((mensagem) => (
                        <div
                          key={mensagem.id}
                          className={`flex ${
                            mensagem.remetente === usuario.nome ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              mensagem.remetente === usuario.nome
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium">
                                {mensagem.remetente} ({mensagem.setor})
                              </span>
                            </div>
                            <p className="text-sm">{mensagem.conteudo}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Calendar className="h-3 w-3 opacity-70" />
                              <span className="text-xs opacity-70">{mensagem.data}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Campo de nova mensagem */}
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Digite sua mensagem..."
                        value={novaMensagem}
                        onChange={(e) => setNovaMensagem(e.target.value)}
                        className="flex-1 min-h-[60px] resize-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleEnviarMensagem();
                          }
                        }}
                      />
                      <Button 
                        onClick={handleEnviarMensagem}
                        disabled={!novaMensagem.trim()}
                        className="self-end"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                /* Nova Conversa */
                <div className="p-6 h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Iniciar Nova Conversa</h3>
                    <p className="text-gray-600">Selecione um setor e envie uma mensagem</p>
                  </div>
                  
                  <div className="space-y-4 max-w-md mx-auto w-full">
                    <Select value={setorDestino} onValueChange={setSetorDestino}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar setor de destino" />
                      </SelectTrigger>
                      <SelectContent>
                        {setores.filter(setor => setor !== usuario.setor).map((setor) => (
                          <SelectItem key={setor} value={setor}>
                            {setor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      value={novaMensagem}
                      onChange={(e) => setNovaMensagem(e.target.value)}
                      className="min-h-[120px]"
                    />
                    
                    <Button 
                      onClick={handleNovaConversa}
                      disabled={!novaMensagem.trim() || !setorDestino}
                      className="w-full"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
