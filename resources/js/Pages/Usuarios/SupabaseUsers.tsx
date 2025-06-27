import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Layout temporário simples
import { useSupabaseUsers } from '@/App/hooks/useSupabaseUsers';
import { SupabaseUser } from '@/App/types/supabase';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { UserPlus, Search, RefreshCw, Shield, ShieldCheck, Mail, Trash2, Ban, UserCheck } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface PageProps {
  auth: {
    user: any;
  };
}

const SupabaseUsers = ({ auth }: PageProps) => {
  const {
    users,
    loading,
    error,
    total,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    banUser,
    unbanUser,
    confirmEmail,
  } = useSupabaseUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<SupabaseUser | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Estados do formulário de criação
  const [newUserData, setNewUserData] = useState({
    email: '',
    password: '',
    user_metadata: '',
    email_confirm: true,
  });

  // Estados do formulário de edição
  const [editUserData, setEditUserData] = useState({
    email: '',
    password: '',
    user_metadata: '',
    email_confirm: false,
  });

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleFetchUsers = async () => {
    await fetchUsers({
      limit: 50,
      page: currentPage,
      search: searchTerm || undefined,
    });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    handleFetchUsers();
  };

  const handleCreateUser = async () => {
    try {
      const userData = {
        email: newUserData.email,
        password: newUserData.password || undefined,
        user_metadata: newUserData.user_metadata ? JSON.parse(newUserData.user_metadata) : {},
        email_confirm: newUserData.email_confirm,
      };

      const user = await createUser(userData);
      if (user) {
        toast({
          title: 'Usuário criado',
          description: 'O usuário foi criado com sucesso.',
        });
        setCreateDialogOpen(false);
        setNewUserData({ email: '', password: '', user_metadata: '', email_confirm: true });
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao criar usuário. Verifique os dados e tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;

    try {
      const userData = {
        email: editUserData.email || undefined,
        password: editUserData.password || undefined,
        user_metadata: editUserData.user_metadata ? JSON.parse(editUserData.user_metadata) : undefined,
        email_confirm: editUserData.email_confirm,
      };

      // Remove campos vazios
      Object.keys(userData).forEach(key => {
        if ((userData as any)[key] === undefined || (userData as any)[key] === '') {
          delete (userData as any)[key];
        }
      });

      const user = await updateUser(selectedUser.id, userData);
      if (user) {
        toast({
          title: 'Usuário atualizado',
          description: 'O usuário foi atualizado com sucesso.',
        });
        setEditDialogOpen(false);
        setSelectedUser(null);
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar usuário.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const success = await deleteUser(userId);
    if (success) {
      toast({
        title: 'Usuário deletado',
        description: 'O usuário foi removido com sucesso.',
      });
    } else {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar usuário.',
        variant: 'destructive',
      });
    }
  };

  const handleBanUser = async (userId: string) => {
    const success = await banUser(userId, '24h');
    if (success) {
      toast({
        title: 'Usuário banido',
        description: 'O usuário foi banido por 24 horas.',
      });
    } else {
      toast({
        title: 'Erro',
        description: 'Erro ao banir usuário.',
        variant: 'destructive',
      });
    }
  };

  const handleUnbanUser = async (userId: string) => {
    const success = await unbanUser(userId);
    if (success) {
      toast({
        title: 'Usuário desbanido',
        description: 'O usuário foi desbanido com sucesso.',
      });
    } else {
      toast({
        title: 'Erro',
        description: 'Erro ao desbanir usuário.',
        variant: 'destructive',
      });
    }
  };

  const handleConfirmEmail = async (userId: string) => {
    const success = await confirmEmail(userId);
    if (success) {
      toast({
        title: 'Email confirmado',
        description: 'O email do usuário foi confirmado.',
      });
    } else {
      toast({
        title: 'Erro',
        description: 'Erro ao confirmar email.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const isEmailConfirmed = (user: SupabaseUser) => {
    return user.email_confirmed_at !== null && user.email_confirmed_at !== undefined;
  };

  const openEditDialog = (user: SupabaseUser) => {
    setSelectedUser(user);
    setEditUserData({
      email: user.email || '',
      password: '',
      user_metadata: JSON.stringify(user.user_metadata || {}, null, 2),
      email_confirm: isEmailConfirmed(user),
    });
    setEditDialogOpen(true);
  };

  return (
    <AuthenticatedLayout>


    <div className="min-h-screen bg-gray-100">
      <Head title="Administração de Usuários Supabase" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Administração de Usuários Supabase
                  </h1>
                  <p className="text-gray-600">
                    Gerencie usuários autenticados via Supabase Auth
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <Button
                    onClick={handleFetchUsers}
                    variant="outline"
                    size="sm"
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Atualizar
                  </Button>

                  <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <UserPlus className="mr-2 w-4 h-4" />
                        Criar Usuário
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Criar Novo Usuário</DialogTitle>
                        <DialogDescription>
                          Adicione um novo usuário ao Supabase Auth.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUserData.email}
                            onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="usuario@exemplo.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Senha (opcional)</Label>
                          <Input
                            id="password"
                            type="password"
                            value={newUserData.password}
                            onChange={(e) => setNewUserData(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="Deixe vazio para gerar automaticamente"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="user_metadata">User Metadata (JSON)</Label>
                          <Textarea
                            id="user_metadata"
                            value={newUserData.user_metadata}
                            onChange={(e) => setNewUserData(prev => ({ ...prev, user_metadata: e.target.value }))}
                            placeholder='{"name": "Nome do Usuário"}'
                            rows={3}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="email_confirm"
                            checked={newUserData.email_confirm}
                            onCheckedChange={(checked) => setNewUserData(prev => ({ ...prev, email_confirm: checked }))}
                          />
                          <Label htmlFor="email_confirm">Confirmar email automaticamente</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCreateDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateUser} disabled={!newUserData.email || loading}>
                          Criar Usuário
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Barra de pesquisa */}
              <div className="flex gap-3 items-center mb-6">
                <div className="flex-1 max-w-sm">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
                    <Input
                      type="text"
                      placeholder="Buscar por email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button onClick={handleSearch} disabled={loading}>
                  Buscar
                </Button>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                    <UserCheck className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{total}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Emails Confirmados</CardTitle>
                    <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                        {users.filter(u => isEmailConfirmed(u)).length}
                        </div>
                    </CardContent>
                    </Card>

                    <Card>
                    <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Emails Pendentes</CardTitle>
                        <Mail className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                        {users.filter(u => !isEmailConfirmed(u)).length}
                        </div>
                    </CardContent>
                    </Card>
                </div>

                {/* Mensagem de erro */}
                {error && (
                    <div className="p-4 mb-6 bg-red-50 rounded-md border border-red-200">
                    <div className="flex">
                        <div className="text-red-800">
                        <strong>Erro:</strong> {error}
                        </div>
                    </div>
                    </div>
                )}

                {/* Lista de usuários */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                    <RefreshCw className="w-8 h-8 text-gray-500 animate-spin" />
                    <span className="ml-2 text-gray-600">Carregando usuários...</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                    {users.map((user) => (
                        <Card key={user.id} className="transition-shadow hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <div className="flex gap-3 items-center mb-2">
                                <h3 className="text-lg font-medium">{user.email || 'Email não definido'}</h3>
                                <div className="flex gap-2">
                                    {isEmailConfirmed(user) ? (
                                    <Badge variant="secondary" className="text-green-800 bg-green-100">
                                        <ShieldCheck className="mr-1 w-3 h-3" />
                                        Confirmado
                                    </Badge>
                                    ) : (
                                    <Badge variant="destructive">
                                        <Shield className="mr-1 w-3 h-3" />
                                        Pendente
                                    </Badge>
                                    )}
                                    {user.role && (
                                    <Badge variant="outline">{user.role}</Badge>
                                    )}
                                </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 md:grid-cols-4">
                                <div>
                                    <span className="font-medium">ID:</span> {user.id.slice(0, 8)}...
                                </div>
                                <div>
                                    <span className="font-medium">Criado:</span> {formatDate(user.created_at)}
                                </div>
                                <div>
                                    <span className="font-medium">Último login:</span> {formatDate(user.last_sign_in_at)}
                                </div>
                                <div>
                                    <span className="font-medium">Providers:</span> {user.app_metadata?.providers?.join(', ') || 'N/A'}
                                </div>
                                </div>
                            </div>

                            <div className="flex gap-2 items-center ml-4">
                                <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEditDialog(user)}
                                >
                                Editar
                                </Button>

                                {!isEmailConfirmed(user) && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleConfirmEmail(user.id)}
                                    disabled={loading}
                                >
                                    <Mail className="mr-1 w-4 h-4" />
                                    Confirmar
                                </Button>
                                )}

                                <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBanUser(user.id)}
                                disabled={loading}
                                >
                                <Ban className="mr-1 w-4 h-4" />
                                Banir
                                </Button>

                                <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="destructive">
                                    <Trash2 className="mr-1 w-4 h-4" />
                                    Deletar
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Tem certeza que deseja deletar o usuário <strong>{user.email}</strong>?
                                        Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Deletar
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog>
                            </div>
                            </div>
                        </CardContent>
                        </Card>
                    ))}

                    {users.length === 0 && !loading && (
                        <div className="py-12 text-center">
                        <UserCheck className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                            Nenhum usuário encontrado
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm ? 'Tente uma busca diferente.' : 'Comece criando um novo usuário.'}
                        </p>
                        </div>
                    )}
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>

        {/* Dialog de edição */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
                <DialogTitle>Editar Usuário</DialogTitle>
                <DialogDescription>
                Atualize as informações do usuário {selectedUser?.email}.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                <Label htmlFor="edit_email">Email</Label>
                <Input
                    id="edit_email"
                    type="email"
                    value={editUserData.email}
                    onChange={(e) => setEditUserData(prev => ({ ...prev, email: e.target.value }))}
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="edit_password">Nova Senha (opcional)</Label>
                <Input
                    id="edit_password"
                    type="password"
                    value={editUserData.password}
                    onChange={(e) => setEditUserData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Deixe vazio para manter a atual"
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="edit_user_metadata">User Metadata (JSON)</Label>
                <Textarea
                    id="edit_user_metadata"
                    value={editUserData.user_metadata}
                    onChange={(e) => setEditUserData(prev => ({ ...prev, user_metadata: e.target.value }))}
                    rows={3}
                />
                </div>
                <div className="flex items-center space-x-2">
                <Switch
                    id="edit_email_confirm"
                    checked={editUserData.email_confirm}
                    onCheckedChange={(checked) => setEditUserData(prev => ({ ...prev, email_confirm: checked }))}
                />
                <Label htmlFor="edit_email_confirm">Email confirmado</Label>
                </div>
            </div>
            <DialogFooter>
                <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                >
                Cancelar
                </Button>
                <Button onClick={handleEditUser} disabled={loading}>
                Salvar Alterações
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    </AuthenticatedLayout>
  );
};

export default SupabaseUsers;
