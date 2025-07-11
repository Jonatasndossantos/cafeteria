import { useState, useMemo } from 'react';
import { DocumentoPublico, FiltrosPortal, OrigemDocumento, TipoDocumento, StatusDocumento } from '@/types/portalTransparencia';


export const usePortalTransparencia = (processos: any[] = []) => {
  const [filtros, setFiltros] = useState<FiltrosPortal>({
    periodo: { inicio: '', fim: '' },
    tipoDocumento: 'Todos',
    modalidade: 'Todos',
    tipo: 'Todos',
    objeto: '',
    secretaria: 'Todas',
    status: 'Todos',
    espada: 'Todas',
    origem: 'Todas',
    statusAutenticacao: 'Todos',
    busca: '',
    tags: [],
    valorMin: undefined,
    valorMax: undefined,
    numeroProcesso: '',
    numeroDocumento: '',
    setor_id: ''
  });

  // Converter processos para formato DocumentoPublico
  const documentos = useMemo(() => {
    const documentosConvertidos = processos.map(processo => ({
      id: processo.id.toString(),
      numeroProcesso: processo.numero_processo,
      numeroDocumento: processo.numero_documento,
      tipo: processo.tipo as TipoDocumento,
      nome: processo.objeto,
      descricao: '',
      dataCriacao: processo.created_at,
      dataPublicacao: processo.data || processo.created_at,
      objeto: processo.objeto,
      secretaria: processo.setor?.nome || 'Setor não informado',
      modalidade: processo.modalidade,
      status: processo.status as StatusDocumento,
      espada: 1,
      origem: 'Criado na LUMEN' as OrigemDocumento,
      autenticidade: {
        nivel: processo.autenticidade?.nivel || 'Pendente',
        assinaturaDigital: processo.autenticidade?.assinaturaDigital || false,
        certificadoICP: false,
        hashVerificado: true,
        dataVerificacao: new Date().toISOString()
      },
      assinaturas: [],
      documentosRelacionados: [],
      tags: processo.tags || [],
      urlVisualizacao: `/documentos/${processo.numero_processo}`,
      urlDownload: `/api/documentos/${processo.numero_processo}/download`,
      versao: '1.0',
      hash: '',
      tempoPublicacao: 0,
      valor: processo.valor || 0,
      setor_id: processo.setor?.id?.toString() || ''
    })) as DocumentoPublico[];

    return documentosConvertidos;
  }, [processos]);

  // Aplicar filtros
  const documentosFiltrados = useMemo(() => {
    return documentos.filter(documento => {
      // Filtro por tipo de documento
      if (filtros.tipo !== 'Todos' && documento.tipo !== filtros.tipo) {
        return false;
      }

      // Filtro por modalidade
      if (filtros.modalidade !== 'Todos' && documento.modalidade !== filtros.modalidade) {
        return false;
      }

      // Filtro por setor_id (secretaria)
      if (filtros.setor_id && documento.setor_id !== filtros.setor_id) {
        return false;
      }

      // Filtro por secretaria (nome, legado)
      if (!filtros.setor_id && filtros.secretaria !== 'Todas' && documento.secretaria !== filtros.secretaria) {
        return false;
      }

      // Filtro por status
      if (filtros.status !== 'Todos' && documento.status.toLowerCase() !== filtros.status.toLowerCase()) {
        return false;
      }

      // Filtro por espada
      if (filtros.espada !== 'Todas' && documento.espada !== filtros.espada) {
        return false;
      }

      // Filtro por origem
      if (filtros.origem !== 'Todas' && documento.origem !== filtros.origem) {
        return false;
      }

      // Filtro por período
      if (filtros.periodo.inicio && documento.dataPublicacao < filtros.periodo.inicio) {
        return false;
      }
      if (filtros.periodo.fim && documento.dataPublicacao > filtros.periodo.fim) {
        return false;
      }

      // Filtro por faixa de valor
      if (filtros.valorMin !== undefined && (documento.valor || 0) < filtros.valorMin) {
        return false;
      }
      if (filtros.valorMax !== undefined && (documento.valor || 0) > filtros.valorMax) {
        return false;
      }

      // Filtro por número do processo
      if (filtros.numeroProcesso && !documento.numeroProcesso.toLowerCase().includes(filtros.numeroProcesso.toLowerCase())) {
        return false;
      }

      // Filtro por número do documento
      if (filtros.numeroDocumento && !documento.numeroDocumento.toLowerCase().includes(filtros.numeroDocumento.toLowerCase())) {
        return false;
      }

      // Filtro por status de autenticação
      if (filtros.statusAutenticacao !== 'Todos') {
        const nivelAutenticidade = documento.autenticidade.nivel;
        if (filtros.statusAutenticacao === 'Assinado' && nivelAutenticidade !== 'Válida') {
          return false;
        }
        if (filtros.statusAutenticacao === 'Pendente' && nivelAutenticidade !== 'Pendente') {
          return false;
        }
        if (filtros.statusAutenticacao === 'Inválido' && nivelAutenticidade !== 'Inválida') {
          return false;
        }
      }

      // Filtro por tags
      if (filtros.tags.length > 0) {
        const documentoTags = documento.tags.map((tag: string) => tag.toLowerCase());
        const filtroTags = filtros.tags.map((tag: string) => tag.toLowerCase());
        const temTag = filtroTags.some((tag: string) => documentoTags.includes(tag));
        if (!temTag) {
          return false;
        }
      }

      // Filtro por objeto (campo específico)
      if (filtros.objeto && filtros.objeto.trim() !== '') {
        const objetoBusca = filtros.objeto.toLowerCase().trim();
        const documentoObjeto = (documento.objeto || '').toLowerCase();
        if (!documentoObjeto.includes(objetoBusca)) {
          return false;
        }
      }

      // Filtro por busca global
      if (filtros.busca && filtros.busca.trim() !== '') {
        const busca = filtros.busca.toLowerCase().trim();

        const camposBusca = [
          documento.numeroProcesso || '',
          documento.numeroDocumento || '',
          documento.objeto || '',
          documento.secretaria || '',
          documento.tipo || '',
          documento.modalidade || '',
          ...(documento.tags || [])
        ].map(campo => String(campo).toLowerCase()).filter(campo => campo.length > 0);

        const encontrou = camposBusca.some(campo => campo.includes(busca));

        if (!encontrou) {
          return false;
        }
      }

      return true;
    });
  }, [documentos, filtros]);

  return {
    filtros,
    setFiltros,
    documentosFiltrados,
    totalDocumentos: documentos.length,
    totalFiltrados: documentosFiltrados.length
  };
};