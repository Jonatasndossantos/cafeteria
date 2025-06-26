# docs/RAG_IMPLEMENTATION.md

# Implementação do Sistema RAG com PrismPHP

## Visão Geral
Implementação do sistema de sugestões baseado em RAG (Retrieval Augmented Generation) utilizando PrismPHP para integração com LLMs, OpenAI para embeddings, e PostgreSQL com pgvector no Supabase.

## 1. Configuração do PrismPHP
- [ ] Instalação e configuração
  - [ ] Instalar pacote PrismPHP via composer
  - [ ] Configurar provider no `config/app.php`
  - [ ] Configurar chaves da OpenAI no `.env`

- [ ] Configurar Supabase
  - [ ] Verificar conexão existente
  - [ ] Confirmar extensão pgvector ativa
  - [ ] Testar conexão com banco

## 2. Estrutura de Dados
- [ ] Criar tabelas no Supabase
  ```sql
  -- Tabela para documentos
  CREATE TABLE documents (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      content TEXT,
      metadata JSONB,
      embedding vector(1536),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Tabela para embeddings
  CREATE TABLE embeddings (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      document_id UUID REFERENCES documents(id),
      embedding vector(1536),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

## 3. Processamento de Documentos
- [ ] Implementar processadores de arquivos
  - [ ] Criar interface `DocumentProcessor`
  - [ ] Implementar processadores para:
    - [ ] PDF (usando `spatie/pdf-to-text`)
    - [ ] DOCX (usando `phpoffice/phpword`)
    - [ ] CSV (usando `league/csv`)

- [ ] Sistema de chunking
  - [ ] Implementar lógica de divisão de texto
  - [ ] Configurar tamanho máximo de chunks
  - [ ] Implementar overlap entre chunks

## 4. Sistema de Embedding
- [ ] Implementar serviço de embedding
  - [ ] Criar `EmbeddingService` usando PrismPHP
  - [ ] Configurar modelo de embedding (text-embedding-3-small)
  - [ ] Implementar sistema de cache

- [ ] Processamento em lote
  - [ ] Criar job para processamento assíncrono
  - [ ] Implementar sistema de retry
  - [ ] Adicionar monitoramento de progresso

## 5. Sistema de Busca
- [ ] Implementar busca vetorial
  - [ ] Criar `VectorSearchService`
  - [ ] Implementar busca por similaridade
  - [ ] Adicionar filtros por metadata

- [ ] Otimização
  - [ ] Configurar índices HNSW
  - [ ] Implementar cache de resultados
  - [ ] Otimizar queries

## 6. Integração com PrismPHP
- [ ] Configurar LLM
  - [ ] Configurar modelo GPT-4
  - [ ] Definir parâmetros de geração
  - [ ] Implementar sistema de fallback

- [ ] Implementar RAG
  - [ ] Criar prompt templates
  - [ ] Implementar contexto dinâmico
  - [ ] Adicionar sistema de feedback

## 7. API de Sugestões
- [ ] Refatorar SuggestionController
  - [ ] Implementar nova lógica RAG
  - [ ] Adicionar validação
  - [ ] Implementar cache

- [ ] Endpoints
  - [ ] POST /api/suggestions
  - [ ] POST /api/suggestions/feedback
  - [ ] GET /api/suggestions/history

## Métricas de Sucesso
- [ ] Latência de busca < 500ms
- [ ] Precisão de embedding > 0.85
- [ ] Taxa de acerto das sugestões > 80%
- [ ] Cobertura de documentos > 95%

## Próximos Passos
1. Configurar PrismPHP e testar conexão
2. Implementar processadores de documentos
3. Criar primeiro protótipo do sistema de embedding
4. Desenvolver MVP do sistema de sugestões