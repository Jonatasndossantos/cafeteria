import React, { useState, useEffect } from 'react';
import { Header } from '@/Components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/Components/ui/select';
import { Progress } from '@/Components/ui/progress';
import { Label } from '@/Components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Users, Settings, FileText, Calendar, Shield, ArrowLeft, Home, Upload, Eye, Edit2, Trash2 } from 'lucide-react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useFlashMessages } from '@/hooks/useFlashMessages';

interface Setor {
  id: number;
  nome: string;
  sigla: string;
}

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  dataNasc: string;
  matricula: string;
  cargo: string;
  email: string;
  celular: string;
  setor_id: number | null;
  setor?: Setor;
  perfilAcesso?: string;
}

interface Props {
  setores: Setor[];
  usuarios: Usuario[];
}

const GestaoUsuarios: React.FC<Props> = ({ setores = [], usuarios = [] }) => {


  // Hook para exibir mensagens flash
//   useFlashMessages();

  // Helper function to get error message
  const getErrorMessage = (error: string | string[] | undefined): string => {
    if (!error) return '';
    return Array.isArray(error) ? error[0] : error;
  };

  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    nome: '',
    cpf: '',
    dataNasc: '',
    matricula: '',
    cargo: '',
    email: '',
    celular: '',
    senha: '',
    perfilAcesso: '',
    setor_id: ''
  });

  const editForm = useForm({
    nome: '',
    cpf: '',
    dataNasc: '',
    matricula: '',
    cargo: '',
    email: '',
    celular: '',
    perfilAcesso: '',
    setor_id: ''
  });

  // Add debug logs
  useEffect(() => {
    // console.log('Setores recebidos:', setores);
    // console.log('Usuários recebidos:', usuarios);
    reset();
  }, [setores, usuarios]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/gestao-usuarios', {
      onSuccess: () => {
        reset();
      }
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    console.log('Select changed:', name, value);
    setData(name as keyof typeof data, value);
  };

  const handleViewUsuario = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setIsViewDialogOpen(true);
  };

  const handleEditUsuario = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    editForm.setData({
      nome: usuario.nome,
      cpf: usuario.cpf,
      dataNasc: usuario.dataNasc,
      matricula: usuario.matricula,
      cargo: usuario.cargo,
      email: usuario.email,
      celular: usuario.celular || '',
      perfilAcesso: usuario.perfilAcesso || '',
      setor_id: usuario.setor_id ? usuario.setor_id.toString() : '',
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      ...editForm.data,
      setor_id: editForm.data.setor_id ? Number(editForm.data.setor_id) : null
    };

    editForm.put(`/gestao-usuarios/${selectedUsuario?.id}`, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        // Atualizar a lista de usuários após a edição
        const updatedUsuarios = usuarios.map(u =>
          u.id === selectedUsuario?.id ? {
            ...u,
            ...formData
          } : u
        );
        queryClient.setQueryData(['usuarios'], updatedUsuarios);
      }
    });
  };

  const handleDeleteUsuario = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUsuario = () => {
    if (!selectedUsuario) return;

    setIsDeleting(true);

    router.delete(`/gestao-usuarios/${selectedUsuario.id}`, {
      onSuccess: () => {
        // Atualizar a lista de usuários removendo o usuário excluído
        const updatedUsuarios = usuarios.filter(u => u.id !== selectedUsuario.id);
        queryClient.setQueryData(['usuarios'], updatedUsuarios);

        setIsDeleteDialogOpen(false);
        setSelectedUsuario(null);
        setIsDeleting(false);
      },
      onError: (error) => {
        console.error('Erro ao excluir usuário:', error);
        setIsDeleting(false);
      },
      onFinish: () => {
        setIsDeleting(false);
      }
    });
  };

  return (
    <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Gestão de Usuários
                    </h2>
                }
            >
                <Head title="Gestão de Usuários" />

      <div className="flex-1 p-6 space-y-6">
        <div className="mx-auto max-w-7xl">


          {/* Cabeçalho */}
          {/* <div className="flex justify-between items-center pb-6 border-b">
            <div>
              <h1 className="text-3xl font-bold text-[#0A3D62]">Administração da Implantação LUMEN</h1>
              <p className="text-gray-600">Prefeitura Municipal de São Bernardo</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-white rounded-lg border shadow-sm">
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium">Dias restantes: </span>
                  <span className="text-lg font-bold text-[#0A3D62]">12</span>
                </div>
              </div>
              <Button variant="outline" className="border-[#0A3D62] text-[#0A3D62] hover:bg-[#0A3D62] hover:text-white">
                Suporte
              </Button>
            </div>
          </div> */}

          {/* Progresso da Implantação */}
          {/* */}

          {/* Abas principais */}
          <Tabs defaultValue="usuarios" className="w-full">


            {/* Conteúdo da aba Usuários */}
            <TabsContent value="usuarios" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-[#4E1F14]">Cadastrar novo servidor</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome completo</Label>
                      <Input
                        name="nome"
                        value={data.nome}
                        onChange={(e) => setData('nome', e.target.value)}
                        placeholder="Digite o nome completo"
                        required
                      />
                      {errors.nome && (
                        <p className="text-sm text-red-500">{getErrorMessage(errors.nome)}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>CPF</Label>
                      <Input
                        name="cpf"
                        value={data.cpf}
                        onChange={(e) => setData('cpf', e.target.value)}
                        placeholder="000.000.000-00"
                        required
                      />
                      {errors.cpf && (
                        <p className="text-sm text-red-500">{getErrorMessage(errors.cpf)}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Data de nascimento</Label>
                      <Input
                        name="dataNasc"
                        value={data.dataNasc}
                        onChange={(e) => setData('dataNasc', e.target.value)}
                        type="date"
                        required
                      />
                      {errors.dataNasc && (
                        <p className="text-sm text-red-500">{getErrorMessage(errors.dataNasc)}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Matrícula</Label>
                      <Input
                        name="matricula"
                        value={data.matricula}
                        onChange={(e) => setData('matricula', e.target.value)}
                        placeholder="Digite a matrícula"
                        required
                      />
                      {errors.matricula && (
                        <p className="text-sm text-red-500">{getErrorMessage(errors.matricula)}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Cargo / Função</Label>
                      <Input
                        name="cargo"
                        value={data.cargo}
                        onChange={(e) => setData('cargo', e.target.value)}
                        placeholder="Digite o cargo"
                        required
                      />
                      {errors.cargo && (
                        <p className="text-sm text-red-500">{getErrorMessage(errors.cargo)}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>E-mail</Label>
                      <Input
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="email@prefeitura.gov.br"
                        type="email"
                        required
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{getErrorMessage(errors.email)}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Celular (opcional)</Label>
                      <Input
                        name="celular"
                        value={data.celular}
                        onChange={(e) => setData('celular', e.target.value)}
                        placeholder="(00) 00000-0000"
                        type="tel"
                      />
                      {errors.celular && (
                        <p className="text-sm text-red-500">{getErrorMessage(errors.celular)}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Senha</Label>
                      <Input
                        name="senha"
                        value={data.senha}
                        onChange={(e) => setData('senha', e.target.value)}
                        placeholder="Digite a senha inicial"
                        type="password"
                        required
                      />
                      {errors.senha && (
                        <p className="text-sm text-red-500">{getErrorMessage(errors.senha)}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perfilAcesso">Perfil de Acesso</Label>
                      <Select
                        value={data.perfilAcesso}
                        onValueChange={(value) => setData('perfilAcesso', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o perfil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="secretarias">Secretarias</SelectItem>
                          <SelectItem value="setores">Todos os Setores</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.perfilAcesso && (
                        <p className="text-sm text-red-500">{getErrorMessage(errors.perfilAcesso)}</p>
                      )}
                    </div>
                      <div className="space-y-2">
                        <Label htmlFor="setor">Setor</Label>
                        <Select
                          value={data.setor_id}
                          onValueChange={(value) => handleSelectChange('setor_id', value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o setor" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.isArray(setores) && setores.length > 0 ? (
                              setores.map((setor) => (
                                <SelectItem key={setor.id} value={setor.id.toString()}>
                                  {setor.nome} ({setor.sigla})
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="nenhum-setor" disabled>
                                Nenhum setor disponível
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        {errors.setor_id && (
                          <p className="text-sm text-red-500">{getErrorMessage(errors.setor_id)}</p>
                        )}
                      </div>
                    <Button
                      type="submit"
                      className="mt-6 bg-[#4E1F14] hover:bg-[#4E1F14]/90 px-8"
                      disabled={processing}
                    >
                      {processing ? 'Cadastrando...' : 'Cadastrar Servidor'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-[#4E1F14]">Servidores cadastrados</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Setor</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usuarios.map((usuario) => (
                        <TableRow key={usuario.id}>
                          <TableCell className="font-medium">{usuario.nome}</TableCell>
                          <TableCell>{usuario.cargo}</TableCell>
                          <TableCell>{usuario.setor?.nome || 'Não definido'}</TableCell>
                          <TableCell className="space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUsuario(usuario)}
                            >
                              <Edit2 className="mr-1 w-4 h-4" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewUsuario(usuario)}
                            >
                              <Eye className="mr-1 w-4 h-4" />
                              Ver
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUsuario(usuario)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="mr-1 w-4 h-4" />
                              Excluir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Configurações */}
            <TabsContent value="configuracoes">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 text-[#4E1F14]">Configurações do Município</h3>
                  <div className="space-y-6">
                    {/* Informações básicas */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Nome do Município</Label>
                        <Input defaultValue="São Bernardo" />
                      </div>
                      <div className="space-y-2">
                        <Label>UF</Label>
                        <Select defaultValue="ma">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ma">Maranhão</SelectItem>
                            <SelectItem value="sp">São Paulo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Upload de arquivos */}
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-[#4E1F14]">Documentos e Logos</h4>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Brasão Municipal</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#4E1F14] transition-colors">
                              <Upload className="mx-auto mb-2 w-8 h-8 text-gray-400" />
                              <p className="text-sm text-gray-600">Clique para fazer upload</p>
                              <p className="text-xs text-gray-400">PNG, JPG até 2MB</p>
                              <Input type="file" className="hidden" accept="image/*" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Logo da Administração</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#4E1F14] transition-colors">
                              <Upload className="mx-auto mb-2 w-8 h-8 text-gray-400" />
                              <p className="text-sm text-gray-600">Clique para fazer upload</p>
                              <p className="text-xs text-gray-400">PNG, JPG até 2MB</p>
                              <Input type="file" className="hidden" accept="image/*" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Cartão CNPJ</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#4E1F14] transition-colors">
                              <Upload className="mx-auto mb-2 w-8 h-8 text-gray-400" />
                              <p className="text-sm text-gray-600">Clique para fazer upload</p>
                              <p className="text-xs text-gray-400">PDF até 5MB</p>
                              <Input type="file" className="hidden" accept=".pdf" />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-[#D09290]/10 rounded-lg">
                          <p className="text-sm text-[#4E1F14]">
                            <strong>Importante:</strong> Os dados do Cartão CNPJ serão utilizados para alimentar automaticamente as informações do município em todas as demais espadas e etapas da plataforma.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6 bg-[#4E1F14] hover:bg-[#4E1F14]/90">
                    Salvar configurações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legislacao">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 text-[#4E1F14]">Legislação Municipal</h3>

                  <div className="space-y-6">
                    <div className="p-4 bg-[#D09290]/10 rounded-lg">
                      <p className="text-sm text-[#4E1F14]">
                        Cadastre as normas municipais relacionadas à Lei 14.133/21 que regulamentam as licitações e contratos no seu município.
                      </p>
                    </div>

                    {/* Formulário para upload de legislação */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tipo de Norma</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lei">Lei Municipal</SelectItem>
                            <SelectItem value="decreto">Decreto</SelectItem>
                            <SelectItem value="portaria">Portaria</SelectItem>
                            <SelectItem value="resolucao">Resolução</SelectItem>
                            <SelectItem value="instrucao">Instrução Normativa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Número da Norma</Label>
                        <Input placeholder="Ex: 001/2024" />
                      </div>
                      <div className="space-y-2">
                        <Label>Título/Ementa</Label>
                        <Input placeholder="Descrição da norma" />
                      </div>
                      <div className="space-y-2">
                        <Label>Data de Publicação</Label>
                        <Input type="date" />
                      </div>
                    </div>

                    {/* Upload de arquivo */}
                    <div className="space-y-2">
                      <Label>Arquivo da Legislação</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#4E1F14] transition-colors">
                        <Upload className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                        <p className="mb-2 text-lg text-gray-600">Clique para fazer upload ou arraste o arquivo aqui</p>
                        <p className="text-sm text-gray-400">PDF, DOC, DOCX até 10MB</p>
                        <Input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                        <Button variant="outline" className="mt-4">
                          Selecionar Arquivo
                        </Button>
                      </div>
                    </div>

                    <Button className="bg-[#4E1F14] hover:bg-[#4E1F14]/90">
                      Cadastrar Legislação
                    </Button>

                    {/* Lista de legislações cadastradas */}
                    <div className="pt-6 border-t">
                      <h4 className="text-lg font-medium mb-4 text-[#4E1F14]">Legislações Cadastradas</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 rounded-lg border">
                          <div>
                            <h5 className="font-medium">Lei Municipal 001/2024</h5>
                            <p className="text-sm text-gray-600">Regulamenta os procedimentos licitatórios municipais</p>
                            <p className="text-xs text-gray-400">Publicada em 15/01/2024</p>
                          </div>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Visualizar</Button>
                            <Button variant="outline" size="sm">Editar</Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-lg border">
                          <div>
                            <h5 className="font-medium">Decreto 045/2024</h5>
                            <p className="text-sm text-gray-600">Estabelece comissões permanentes de licitação</p>
                            <p className="text-xs text-gray-400">Publicado em 20/02/2024</p>
                          </div>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Visualizar</Button>
                            <Button variant="outline" size="sm">Editar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="capacitacao">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#4E1F14]">Programa de Capacitação</h3>
                  <p className="text-gray-600">Acompanhe o progresso dos treinamentos</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cronograma">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#4E1F14]">Cronograma de Implantação</h3>
                  <p className="text-gray-600">Acompanhe as etapas e prazos do projeto</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>


      {/* Dialog para visualização de usuário */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Servidor</DialogTitle>
            <DialogDescription>
              Visualize as informações detalhadas do servidor selecionado.
            </DialogDescription>
          </DialogHeader>
          {selectedUsuario && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <p className="text-sm">{selectedUsuario.nome}</p>
              </div>
              <div className="space-y-2">
                <Label>CPF</Label>
                <p className="text-sm">{selectedUsuario.cpf}</p>
              </div>
              <div className="space-y-2">
                <Label>Data de Nascimento</Label>
                <p className="text-sm">{selectedUsuario.dataNasc}</p>
              </div>
              <div className="space-y-2">
                <Label>Matrícula</Label>
                <p className="text-sm">{selectedUsuario.matricula}</p>
              </div>
              <div className="space-y-2">
                <Label>Cargo</Label>
                <p className="text-sm">{selectedUsuario.cargo}</p>
              </div>
              <div className="space-y-2">
                <Label>Setor</Label>
                <p className="text-sm">{selectedUsuario.setor?.nome || 'Não definido'}</p>
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <p className="text-sm">{selectedUsuario.email}</p>
              </div>
              <div className="space-y-2">
                <Label>Celular</Label>
                <p className="text-sm">{selectedUsuario.celular || 'Não informado'}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para edição de usuário */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Servidor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateUsuario} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome completo</Label>
                <Input
                  value={editForm.data.nome}
                  onChange={e => editForm.setData('nome', e.target.value)}
                />
                {editForm.errors.nome && (
                  <p className="text-sm text-red-500">{getErrorMessage(editForm.errors.nome)}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>CPF</Label>
                <Input
                  value={editForm.data.cpf}
                  onChange={e => editForm.setData('cpf', e.target.value)}
                />
                {editForm.errors.cpf && (
                  <p className="text-sm text-red-500">{getErrorMessage(editForm.errors.cpf)}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Data de nascimento</Label>
                <Input
                  type="date"
                  value={editForm.data.dataNasc}
                  onChange={e => editForm.setData('dataNasc', e.target.value)}
                />
                {editForm.errors.dataNasc && (
                  <p className="text-sm text-red-500">{getErrorMessage(editForm.errors.dataNasc)}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Matrícula</Label>
                <Input
                  value={editForm.data.matricula}
                  onChange={e => editForm.setData('matricula', e.target.value)}
                />
                {editForm.errors.matricula && (
                  <p className="text-sm text-red-500">{getErrorMessage(editForm.errors.matricula)}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Cargo / Função</Label>
                <Input
                  value={editForm.data.cargo}
                  onChange={e => editForm.setData('cargo', e.target.value)}
                />
                {editForm.errors.cargo && (
                  <p className="text-sm text-red-500">{getErrorMessage(editForm.errors.cargo)}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input
                  type="email"
                  value={editForm.data.email}
                  onChange={e => editForm.setData('email', e.target.value)}
                />
                {editForm.errors.email && (
                  <p className="text-sm text-red-500">{getErrorMessage(editForm.errors.email)}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Celular</Label>
                <Input
                  value={editForm.data.celular}
                  onChange={e => editForm.setData('celular', e.target.value)}
                />
                {editForm.errors.celular && (
                  <p className="text-sm text-red-500">{getErrorMessage(editForm.errors.celular)}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Setor</Label>
                <Select
                  value={editForm.data.setor_id}
                  onValueChange={(value) => editForm.setData('setor_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    {setores.map((setor) => (
                      <SelectItem key={setor.id} value={setor.id.toString()}>
                        {setor.nome} ({setor.sigla})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {editForm.errors.setor_id && (
                  <p className="text-sm text-red-500">{getErrorMessage(editForm.errors.setor_id)}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={editForm.processing}>
                {editForm.processing ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o servidor "{selectedUsuario?.nome}"?
              <br />
              <strong className="text-red-600">Esta ação não pode ser desfeita.</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-6 space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDeleteUsuario}
              disabled={isDeleting}
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AuthenticatedLayout>
  );
};

export default GestaoUsuarios;
