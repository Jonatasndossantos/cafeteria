import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Sector {
  id: number;
  nome: string;
  sigla: string;
  usuarios?: Usuario[];
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
  setor_id: number;
}

interface Props {
  setores: Sector[];
}

const Setores: React.FC<Props> = ({ setores }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    nome: '',
    sigla: ''
  });

  const [selectedSetor, setSelectedSetor] = useState<Sector | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/setores', {
      onSuccess: () => {
        reset();
      }
    });
  };

  const handleViewUsuarios = (setor: Sector) => {
    setSelectedSetor(setor);
    setIsViewDialogOpen(true);
  };

  return (
    <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestão de Setores
                </h2>
            }
        >
            <Head title="Gestão de Setores" />
    <div className="container px-4 py-8 mx-auto">
      {/* Formulário de Cadastro */}
      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Setor - Novo setor
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-6">
              <label htmlFor="nome" className="block mb-1 text-sm font-medium text-gray-700">
                Setor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={data.nome}
                onChange={e => setData('nome', e.target.value)}
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
              )}
            </div>

            <div className="md:col-span-6">
              <label htmlFor="sigla" className="block mb-1 text-sm font-medium text-gray-700">
                Sigla <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="sigla"
                name="sigla"
                value={data.sigla}
                onChange={e => setData('sigla', e.target.value)}
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.sigla && (
                <p className="mt-1 text-sm text-red-600">{errors.sigla}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 text-white bg-[#4E1F14] rounded-md hover:bg-[#4E1F14]/90 focus:outline-none focus:ring-2 focus:ring-[#4E1F14] focus:ring-offset-2 disabled:opacity-50"
            >
              {processing ? 'Salvando...' : 'Salvar'}
            </button>
            <Link
              href="/setores"
              className="px-4 py-2 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4E1F14] focus:ring-offset-2"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>

      {/* Lista de Setores */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Setores Cadastrados
        </h2>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Setor</TableHead>
                <TableHead>Sigla</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {setores.map((setor) => (
                <TableRow key={setor.id}>
                  <TableCell>{setor.nome}</TableCell>
                  <TableCell>{setor.sigla}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Link
                      href={`/setores/${setor.id}/edit`}
                      className="text-[#D09290] hover:text-[#D09290]/80"
                    >
                      Editar
                    </Link>
                    <Button
                      variant="link"
                      onClick={() => handleViewUsuarios(setor)}
                      className="text-[#4E1F14] hover:text-[#4E1F14]/80"
                    >
                      Ver Usuários
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal de Visualização de Usuários */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Usuários do Setor: {selectedSetor?.nome}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Matrícula</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedSetor?.usuarios?.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.nome}</TableCell>
                    <TableCell>{usuario.cargo}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.matricula}</TableCell>

                  </TableRow>
                ))}
                {(!selectedSetor?.usuarios || selectedSetor.usuarios.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-4 text-center">
                      Nenhum usuário cadastrado neste setor.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </AuthenticatedLayout>
  );
};

export default Setores;
