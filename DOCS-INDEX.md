# 📚 Índice Completo de Documentação - HealthMed

Guia centralizado de toda a documentação do projeto.

---

## 🎯 Início Rápido

| Etapa | Documento | Descrição |
|-------|-----------|-----------|
| **1** | [README.md](./README.md) | Visão geral do projeto |
| **2** | [SETUP.md](./SETUP.md) | Configurar ambiente de desenvolvimento |
| **3** | [CONTRIBUTING.md](./CONTRIBUTING.md) | Como contribuir com o projeto |

---

## 📖 Documentação por Categoria

### 🚀 Getting Started

#### Para Desenvolvedores
1. **[SETUP.md](./SETUP.md)** - Configuração completa do ambiente
   - Pré-requisitos e instalação
   - Configuração de variáveis de ambiente
   - Setup do banco de dados
   - Verificação da instalação

2. **[README.md](./README.md)** - Visão geral do projeto
   - Sobre o projeto
   - Tecnologias utilizadas
   - Funcionalidades
   - Estrutura do projeto

#### Para Contribuidores
3. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guia de contribuição
   - Código de conduta
   - Padrões de código
   - Processo de Pull Request
   - Conventional Commits

---

### 🔧 Desenvolvimento

#### Arquitetura & Código
4. **[EXAMPLES-CODE.md](./EXAMPLES-CODE.md)** - Exemplos práticos
   - Logging estruturado
   - Analytics e tracking
   - Error handling
   - Performance monitoring
   - Exemplos completos de páginas

#### API Documentation
5. **[openapi.yaml](./openapi.yaml)** - Documentação da API
   - OpenAPI/Swagger 3.0
   - Todos os endpoints documentados
   - Schemas e tipos
   - Exemplos de requisições/respostas
   
   **Como visualizar:**
   ```bash
   # Online
   https://editor.swagger.io → Import File → openapi.yaml
   
   # Local
   npm run docs:serve
   ```

---

### 📊 Monitoramento & Observabilidade

6. **[MONITORING.md](./MONITORING.md)** - Sistema de monitoramento
   - Logs estruturados (client + server)
   - Analytics com PostHog
   - Error tracking personalizado
   - Performance monitoring
   - Health check endpoints
   - Como usar cada sistema

7. **[MONITORING-README.md](./MONITORING-README.md)** - Resumo executivo
   - Checklist de implementação
   - Status e resultados
   - Guia rápido de uso

8. **[SENTRY.md](./SENTRY.md)** - Integração com Sentry (opcional)
   - Por que usar Sentry
   - Instalação e configuração
   - Uso avançado
   - Comparação com sistema atual

---

### 🚢 Deploy & Produção

9. **[DEPLOY.md](./DEPLOY.md)** - Guia de deployment
   - Deploy na Vercel
   - Deploy com Docker
   - Deploy na AWS (EC2)
   - Configuração de monitoramento em produção
   - Health checks
   - Otimizações de performance
   - Segurança em produção

---

## 📂 Estrutura de Arquivos

### Documentação Técnica
```
healthmed-app/
├── README.md                    # 📖 Visão geral do projeto
├── SETUP.md                     # 🔧 Configuração do ambiente
├── CONTRIBUTING.md              # 🤝 Guia de contribuição
├── EXAMPLES-CODE.md             # 💡 Exemplos de código
├── openapi.yaml                 # 📋 Documentação da API
├── MONITORING.md                # 📊 Sistema de monitoramento
├── MONITORING-README.md         # 📊 Resumo de monitoramento
├── SENTRY.md                    # 🚨 Integração Sentry
├── DEPLOY.md                    # 🚀 Guia de deploy
├── DOCS-INDEX.md               # 📚 Este arquivo
└── .env.example                 # ⚙️ Template de variáveis
```

### Código Fonte
```
healthmed-app/
├── app/                         # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── health/             # Health checks
│   │   ├── logs/               # Logs endpoint
│   │   ├── errors/             # Errors endpoint
│   │   ├── metrics/            # Metrics endpoint
│   │   ├── pagamento/          # Pagamentos
│   │   └── mp-webhook/         # Webhooks MP
│   ├── cadastro/               # Página de cadastro
│   ├── dashboard/              # Dashboard
│   ├── login/                  # Login
│   ├── layout.tsx              # Layout root
│   └── providers.tsx           # Monitoring provider
├── components/
│   └── ErrorBoundary.tsx       # Error boundary global
├── src/lib/                    # Bibliotecas
│   ├── analytics.ts            # PostHog analytics
│   ├── errors.ts               # Error tracking
│   ├── logger.client.ts        # Logs client
│   ├── logger.server.ts        # Logs server
│   ├── performance.ts          # Performance monitoring
│   ├── sanity.ts               # Sanity client
│   └── supabase.ts             # Supabase client
└── public/                     # Assets estáticos
```

---

## 🎯 Guias por Objetivo

### "Quero começar a desenvolver"
1. ✅ Leia [README.md](./README.md) para entender o projeto
2. ✅ Siga [SETUP.md](./SETUP.md) para configurar ambiente
3. ✅ Leia [CONTRIBUTING.md](./CONTRIBUTING.md) para padrões
4. ✅ Explore [EXAMPLES-CODE.md](./EXAMPLES-CODE.md) para ver exemplos

### "Quero contribuir com código"
1. ✅ Leia [CONTRIBUTING.md](./CONTRIBUTING.md)
2. ✅ Veja [EXAMPLES-CODE.md](./EXAMPLES-CODE.md) para padrões
3. ✅ Consulte [openapi.yaml](./openapi.yaml) para APIs
4. ✅ Use [MONITORING.md](./MONITORING.md) para logs/errors

### "Quero fazer deploy"
1. ✅ Leia [DEPLOY.md](./DEPLOY.md) completamente
2. ✅ Configure [MONITORING.md](./MONITORING.md) em produção
3. ✅ Opcional: Configure [SENTRY.md](./SENTRY.md)
4. ✅ Verifique health checks (`/api/health`)

### "Preciso documentar a API"
1. ✅ Abra [openapi.yaml](./openapi.yaml)
2. ✅ Visualize em https://editor.swagger.io
3. ✅ Ou use: `npm run docs:serve`

### "Quero entender o monitoramento"
1. ✅ Leia [MONITORING-README.md](./MONITORING-README.md) (resumo)
2. ✅ Leia [MONITORING.md](./MONITORING.md) (completo)
3. ✅ Veja [EXAMPLES-CODE.md](./EXAMPLES-CODE.md) (exemplos)
4. ✅ Opcional: [SENTRY.md](./SENTRY.md) para alternativa

---

## 📊 Resumo de Status

### Documentação Completa ✅

| Categoria | Status | Documentos |
|-----------|--------|------------|
| **Getting Started** | ✅ Completo | README, SETUP |
| **Contribuição** | ✅ Completo | CONTRIBUTING |
| **API** | ✅ Completo | openapi.yaml |
| **Monitoramento** | ✅ Completo | MONITORING.md, MONITORING-README.md |
| **Deploy** | ✅ Completo | DEPLOY.md |
| **Exemplos** | ✅ Completo | EXAMPLES-CODE.md |
| **Integrações** | ✅ Completo | SENTRY.md |

### Código JSDoc ✅

| Módulo | Status |
|--------|--------|
| **Logger** | ✅ Documentado |
| **Analytics** | ✅ Documentado |
| **Errors** | ✅ Documentado |
| **Performance** | ✅ Documentado |
| **APIs** | ✅ Documentado (OpenAPI) |

---

## 🔍 Busca Rápida

### Por Palavra-chave

**Autenticação:**
- [README.md](./README.md) - Seção "Autenticação"
- [SETUP.md](./SETUP.md) - "Configurar Supabase"

**Pagamentos:**
- [README.md](./README.md) - Seção "Pagamentos"
- [SETUP.md](./SETUP.md) - "Configurar Mercado Pago"
- [openapi.yaml](./openapi.yaml) - Endpoints `/api/pagamento`

**Logs:**
- [MONITORING.md](./MONITORING.md) - Seção "Logs Estruturados"
- [EXAMPLES-CODE.md](./EXAMPLES-CODE.md) - Exemplos de logging

**Analytics:**
- [MONITORING.md](./MONITORING.md) - Seção "Analytics com PostHog"
- [EXAMPLES-CODE.md](./EXAMPLES-CODE.md) - Exemplos de tracking

**Erros:**
- [MONITORING.md](./MONITORING.md) - Seção "Error Tracking"
- [SENTRY.md](./SENTRY.md) - Integração Sentry
- [EXAMPLES-CODE.md](./EXAMPLES-CODE.md) - Error handling

**Deploy:**
- [DEPLOY.md](./DEPLOY.md) - Guia completo
- [README.md](./README.md) - Seção "Deploy"

**Performance:**
- [MONITORING.md](./MONITORING.md) - "Performance Monitoring"
- [DEPLOY.md](./DEPLOY.md) - "Otimizações de Performance"

---

## 🛠️ Comandos Úteis

```bash
# Documentação
npm run docs:api              # Ver info sobre API docs
npm run docs:serve            # Servir docs localmente
npm run type-check            # Verificar tipos TypeScript

# Desenvolvimento
npm run dev                   # Servidor de desenvolvimento
npm run build                 # Build de produção
npm start                     # Servidor de produção

# Qualidade de Código
npm run lint                  # Lint do código
npm test                      # Executar testes
npm run test:coverage         # Coverage de testes

# Verificações
curl http://localhost:3000/api/health    # Health check
curl http://localhost:3000/api/metrics   # Métricas
```

---

## 📞 Suporte

### Precisa de Ajuda?

1. **Consulte a documentação relevante acima**
2. **Issues:** https://github.com/NicolasMarrai/healthmed/issues
3. **Discussions:** https://github.com/NicolasMarrai/healthmed/discussions
4. **Email:** suporte@healthmed.com.br

### Reportar Problemas

- **Bug:** Abra issue com label `bug`
- **Documentação:** Abra issue com label `documentation`
- **Feature:** Abra issue com label `enhancement`

---

## 📝 Manter Documentação Atualizada

Ao fazer mudanças no código, atualize:

| Mudança | Atualizar |
|---------|-----------|
| Nova API | `openapi.yaml`, `README.md` |
| Novo recurso | `README.md`, `EXAMPLES-CODE.md` |
| Mudança de setup | `SETUP.md` |
| Mudança de deploy | `DEPLOY.md` |
| Novo padrão de código | `CONTRIBUTING.md` |

---

**Documentação completa e organizada! 📚✨**

Navegue pelos documentos usando os links acima ou explore diretamente os arquivos no repositório.
