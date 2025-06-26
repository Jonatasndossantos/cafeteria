import { useQuery } from '@tanstack/react-query';
import { usePage } from '@inertiajs/react';

interface Vinculacao {
  tipo: string;
  numero: string;
}

interface Responsavel {
  nome: string;
  cargo: string;
  setor: string;
  matricula: string;
}

interface IdentificacaoData {
  tipo: string;
  numero: string;
  processoAdministrativo: string;
  vinculacoes: Vinculacao[];
  objeto: string;
  responsavel: Responsavel;
  fundamentacaoLegal: string;
}

export function useIdentificacao() {
  const { props } = usePage<{ auth: { user: { name: string, cargo: string, setor: { name: string }, matricula: string } } }>();

  const { data: identificacaoData, isLoading } = useQuery<IdentificacaoData>({
    queryKey: ['identificacao'],
    queryFn: async () => {
      // Aqui você pode fazer a chamada à API quando tiver
      return {
        tipo: 'DFD',
        numero: 'DFD.2024.001',
        processoAdministrativo: 'PA.2024.001',
        vinculacoes: [
          {
            tipo: 'DFD',
            numero: 'DFD.2024.001'
          },
          {
            tipo: 'ETP',
            numero: 'ETP.2024.001'
          },
          // { 
          //   tipo: 'PCP',
          //   numero: 'PCP.2024.001'
          // },
          {
            tipo: 'PCA',
            numero: 'PCA.2024.001'
          }
        ],
        objeto: 'Aquisição de equipamentos de informática para modernização do parque tecnológico',
        responsavel: {
          nome: props.auth.user.nome || "Não informado",
          cargo: props.auth.user.cargo,
          setor: props.auth.user.setor.nome,
          matricula: props.auth.user.matricula
        },
        fundamentacaoLegal: 'Lei 14.133/2021 - Art. 23, inciso I'
      };
    }
  });

  return {
    identificacaoData,
    isLoading
  };
}
