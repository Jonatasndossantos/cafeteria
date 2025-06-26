
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Badge } from '@/Components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/Components/ui/select';
import { Switch } from '@/Components/ui/switch';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { 
  User, Camera, Upload, Lock, Shield, BookOpen, 
  Edit, Save, Eye, EyeOff, Download, QrCode,
  Phone, Mail, Calendar, FileText, Check
} from 'lucide-react';

export const ConfiguracoesServidor = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [autenticacaoDupla, setAutenticacaoDupla] = useState(false);
  const [dadosEditaveis, setDadosEditaveis] = useState(false);

  const cursosAssistindo = [
    { id: 1, nome: "Lei 14.133/21 - Básico", progresso: 65, status: "Em andamento" },
    { id: 2, nome: "Gestão de Contratos", progresso: 30, status: "Em andamento" }
  ];

  const cursosCompletos = [
    { id: 3, nome: "Pregão Eletrônico", progresso: 100, status: "Concluído", data: "15/05/2025" },
    { id: 4, nome: "Ética Pública", progresso: 100, status: "Concluído", data: "10/03/2025" }
  ];

  const cursosReservados = [
    { id: 5, nome: "Modalidades Licitatórias", dataInicio: "20/07/2025", status: "Reservado" },
    { id: 6, nome: "Penalidades Administrativas", dataInicio: "15/08/2025", status: "Reservado" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#0A3D62]">Configurações do Servidor</h2>
        <Button 
          variant={dadosEditaveis ? "default" : "outline"}
          onClick={() => setDadosEditaveis(!dadosEditaveis)}
          className={dadosEditaveis ? "bg-[#0A3D62]" : ""}
        >
          {dadosEditaveis ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {dadosEditaveis ? "Salvar" : "Editar"}
        </Button>
      </div>

      <Tabs defaultValue="dados-pessoais" className="w-full">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="dados-pessoais">
            <User className="h-4 w-4 mr-2" />
            Dados Pessoais
          </TabsTrigger>
          <TabsTrigger value="senha">
            <Lock className="h-4 w-4 mr-2" />
            Senha
          </TabsTrigger>
          <TabsTrigger value="autenticacao">
            <Shield className="h-4 w-4 mr-2" />
            Autenticação
          </TabsTrigger>
          <TabsTrigger value="assinatura">
            <FileText className="h-4 w-4 mr-2" />
            Assinatura
          </TabsTrigger>
          <TabsTrigger value="cursos">
            <BookOpen className="h-4 w-4 mr-2" />
            Cursos
          </TabsTrigger>
        </TabsList>

        {/* Dados Pessoais */}
        <TabsContent value="dados-pessoais" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Foto do perfil */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  {dadosEditaveis && (
                    <Button 
                      size="icon" 
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 bg-[#0A3D62]"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Foto do Perfil</h3>
                  <p className="text-sm text-gray-600">Recomendado: 400x400px, máximo 2MB</p>
                  {dadosEditaveis && (
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Escolher Foto
                    </Button>
                  )}
                </div>
              </div>

              {/* Dados básicos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input 
                    defaultValue="Dagoberto Antonio Ribeiro" 
                    disabled={!dadosEditaveis}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CPF</Label>
                  <Input 
                    defaultValue="264.792.758-88" 
                    disabled={true}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Data de Nascimento</Label>
                  <Input 
                    type="date" 
                    defaultValue="1977-11-30" 
                    disabled={!dadosEditaveis}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Matrícula</Label>
                  <Input 
                    defaultValue="Matrícula" 
                    disabled={true}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cargo/Função</Label>
                  <Input 
                    defaultValue="Secretario de Administração" 
                    disabled={!dadosEditaveis}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Setor/Secretaria</Label>
                  <Input 
                    defaultValue="Secretaria de Administração" 
                    disabled={true}
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-mail Institucional</Label>
                  <Input 
                    defaultValue="administracao@aramina.sp.gov.br" 
                    disabled={!dadosEditaveis}
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-mail Secundário</Label>
                  <Input 
                    defaultValue="dagobertotz@gmail.com" 
                    disabled={!dadosEditaveis}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone Fixo</Label>
                  <Input 
                    defaultValue="(16) 1637527000" 
                    disabled={!dadosEditaveis}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Celular</Label>
                  <Input 
                    defaultValue="(16) 99995-5525" 
                    disabled={!dadosEditaveis}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Senha */}
        <TabsContent value="senha" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Senha Atual</Label>
                <div className="relative">
                  <Input 
                    type={mostrarSenha ? "text" : "password"} 
                    placeholder="Digite sua senha atual"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                  >
                    {mostrarSenha ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Nova Senha</Label>
                <Input type="password" placeholder="Digite a nova senha" />
                <p className="text-sm text-gray-500">Mínimo: 8 caracteres</p>
              </div>
              
              <div className="space-y-2">
                <Label>Confirmar Nova Senha</Label>
                <Input type="password" placeholder="Confirme a nova senha" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="mostrar-senha" />
                <Label htmlFor="mostrar-senha">Mostrar senha</Label>
              </div>

              <Button className="bg-[#0A3D62] hover:bg-[#0A3D62]/90">
                Alterar Senha
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Autenticação */}
        <TabsContent value="autenticacao" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Autenticação Dupla</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Status da Autenticação Dupla</h3>
                  <p className="text-sm text-gray-600">
                    {autenticacaoDupla ? "Ativa" : "Desativada"}
                  </p>
                </div>
                <Badge variant={autenticacaoDupla ? "default" : "secondary"}>
                  {autenticacaoDupla ? "ATIVA" : "DESATIVADA"}
                </Badge>
              </div>

              {!autenticacaoDupla ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900">Aumentar Segurança</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Aumente a segurança de sua conta utilizando um código gerado no smartphone para acessar.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Passo 1</h4>
                    <p className="text-sm text-gray-600">
                      Baixe o aplicativo Google Authenticator para seu celular ou tablet:
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        📱 iOS
                      </Button>
                      <Button variant="outline" size="sm">
                        🤖 Android
                      </Button>
                      <Button variant="outline" size="sm">
                        🪟 Windows Phone
                      </Button>
                    </div>

                    <h4 className="font-medium">Passo 2</h4>
                    <p className="text-sm text-gray-600">
                      Abra o aplicativo, toque em (+) Ler código de barras e faça a leitura do QR Code abaixo:
                    </p>
                    
                    <div className="flex justify-center">
                      <div className="w-48 h-48 bg-white border-2 border-gray-200 flex items-center justify-center">
                        <QrCode className="h-32 w-32 text-gray-400" />
                      </div>
                    </div>

                    <Button 
                      className="bg-[#0A3D62] hover:bg-[#0A3D62]/90"
                      onClick={() => setAutenticacaoDupla(true)}
                    >
                      Ativar Autenticação Dupla
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900">Autenticação Dupla Ativa</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Sua conta está protegida com autenticação dupla.
                    </p>
                  </div>
                  
                  <Button 
                    variant="destructive"
                    onClick={() => setAutenticacaoDupla(false)}
                  >
                    Desativar Autenticação Dupla
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assinatura */}
        <TabsContent value="assinatura" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assinatura Digital</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Assinatura Textual</Label>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="space-y-2">
                    <div className="flex gap-2 mb-2">
                      <Button variant="outline" size="sm">
                        <strong>B</strong>
                      </Button>
                      <Button variant="outline" size="sm">
                        <em>I</em>
                      </Button>
                      <Button variant="outline" size="sm">
                        <u>U</u>
                      </Button>
                    </div>
                    <div className="border rounded p-4 bg-white min-h-[100px]">
                      <div className="space-y-1">
                        <div className="font-bold">Dagoberto Antonio Ribeiro</div>
                        <div className="italic">Secretario de Administração</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Upload de Assinatura Digitalizada</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#0A3D62] transition-colors">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Que tal colocar uma foto sua?</p>
                    <p className="text-xs text-gray-400">PNG, JPG até 2MB</p>
                    <Button variant="outline" className="mt-4">
                      Escolher foto
                    </Button>
                  </div>
                </div>

                <Button className="bg-[#0A3D62] hover:bg-[#0A3D62]/90">
                  Salvar Assinatura
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cursos */}
        <TabsContent value="cursos" className="space-y-6">
          <div className="grid gap-6">
            {/* Cursos em andamento */}
            <Card>
              <CardHeader>
                <CardTitle>Cursos em Andamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cursosAssistindo.map((curso) => (
                    <div key={curso.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{curso.nome}</h4>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#0A3D62] h-2 rounded-full" 
                              style={{ width: `${curso.progresso}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{curso.progresso}%</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Continuar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cursos concluídos */}
            <Card>
              <CardHeader>
                <CardTitle>Cursos Concluídos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cursosCompletos.map((curso) => (
                    <div key={curso.id} className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{curso.nome}</h4>
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600">Concluído em {curso.data}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Certificado
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cursos reservados */}
            <Card>
              <CardHeader>
                <CardTitle>Cursos Reservados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cursosReservados.map((curso) => (
                    <div key={curso.id} className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                      <div className="space-y-1">
                        <h4 className="font-medium">{curso.nome}</h4>
                        <p className="text-sm text-gray-600">Início em {curso.dataInicio}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Cancelar
                        </Button>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
