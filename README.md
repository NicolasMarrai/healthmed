# 🏥 HealthMed - Plataforma de Educação Médica

Uma plataforma de ensino médico online com sistema de pagamentos integrado, autenticação de usuários e gestão de conteúdo.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração e Instalação](#configuração-e-instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Guia de Utilização](#-guia-de-utilização---passo-a-passo)
- [Como Usar](#-como-usar)
- [API Endpoints](#-api-endpoints)
- [Banco de Dados](#-banco-de-dados)
- [Pagamentos](#-pagamentos)
- [Monitoramento, Observabilidade e Analytics](#-monitoramento-observabilidade-e-analytics)
- [Deploy](#-deploy)
- [Segurança](#-segurança)
- [Documentação](#-documentação)
- [Contribuição](#contribuição)

## 📖 Sobre o Projeto

O **HealthMed** é uma aplicação web desenvolvida em Next.js que oferece uma plataforma completa para educação médica online. O sistema permite que usuários se cadastrem, façam pagamentos para acessar conteúdo premium e assistam aulas em vídeo sobre temas médicos.

### Principais Características:
- **Sistema de Autenticação**: Login/registro completo com Supabase
- **Pagamentos Integrados**: Processamento via Mercado Pago
- **Gestão de Conteúdo**: CMS integrado com Sanity
- **Dashboard Interativo**: Interface para visualização de aulas
- **Controle de Acesso**: Sistema baseado em status de assinatura

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 16.0.1** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de estilização
- **React** - Biblioteca de interface

### Backend & Banco de Dados
- **Supabase** - Backend-as-a-Service (BaaS)
  - Autenticação
  - Banco de dados PostgreSQL
  - Row Level Security (RLS)
- **Sanity** - Content Management System (CMS)

### Pagamentos
- **Mercado Pago** - Gateway de pagamento
- **Webhooks** - Notificações de status de pagamento

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para código
- **PostCSS** - Processamento de CSS
- **Node.js** - Runtime JavaScript

### Monitoramento e Observabilidade
- **Sentry** - Rastreamento de erros e performance
  - Captura erros no navegador e servidor
  - Replay de sessões com erro
  - Alertas automáticos
- **PostHog** - Analytics e comportamento de usuários
  - Rastreamento de eventos
  - Dashboards customizados
  - Feature flags

## ✨ Funcionalidades

### 👤 Autenticação
- [x] Cadastro de novos usuários
- [x] Login com email e senha
- [x] Logout seguro
- [x] Validação de sessão
- [x] Redirecionamentos automáticos

### 💳 Sistema de Pagamentos
- [x] Integração com Mercado Pago
- [x] Processamento de pagamentos via PIX/Cartão
- [x] Webhooks para confirmação automática
- [x] Ativação automática de assinaturas
- [x] Registro de transações

### 📚 Gestão de Conteúdo
- [x] CMS integrado com Sanity
- [x] Upload e gestão de vídeos
- [x] Organização por categorias
- [x] Metadados de aulas (título, descrição, duração)

### 🎯 Dashboard do Usuário
- [x] Visualização de aulas disponíveis
- [x] Player de vídeo integrado
- [x] Interface responsiva
- [x] Controle de acesso baseado em assinatura

## 📁 Estrutura do Projeto

```
healthmed-app/
├── app/                          # App Router do Next.js
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página inicial
│   ├── api/                     # API Routes
│   │   ├── pagamento/           # Endpoint de criação de pagamento
│   │   └── mp-webhook/          # Webhook do Mercado Pago
│   ├── cadastro/                # Página de cadastro
│   │   └── page.tsx
│   ├── dashboard/               # Dashboard do usuário
│   │   └── page.tsx
│   ├── login/                   # Página de login
│   │   └── page.tsx
│   └── pagamento-inicial/       # Página de checkout
│       └── page.tsx
├── src/
│   └── lib/                     # Bibliotecas e configurações
│       ├── sanity.ts            # Cliente Sanity
│       └── supabase.ts          # Cliente Supabase
├── public/                      # Arquivos estáticos
├── middleware.ts                # Middleware do Next.js
├── next.config.ts               # Configuração do Next.js
├── tailwind.config.ts           # Configuração do Tailwind
├── tsconfig.json                # Configuração do TypeScript
├── package.json                 # Dependências e scripts
└── .env.local                   # Variáveis de ambiente
```

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js 18+ instalado
- Conta no Supabase
- Conta no Sanity
- Conta no Mercado Pago

### 1. Clone o repositório
```bash
git clone https://github.com/NicolasMarrai/healthmed.git
cd healthmed-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.example .env.local
```

### 4. Execute o projeto
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 🔧 Variáveis de Ambiente

Todas as variáveis necessárias estão documentadas no arquivo `.env.local`:

### Supabase (Banco de Dados)
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### Sanity (CMS)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id_do_sanity
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_PROJECT_ID=seu_project_id_do_sanity
SANITY_DATASET=production
SANITY_API_TOKEN=seu_token_de_api_do_sanity (opcional)
```

### Mercado Pago
```env
MP_ACCESS_TOKEN=seu_access_token_do_mercado_pago
NEXT_PUBLIC_MP_PUBLIC_KEY=sua_chave_publica_do_mercado_pago
MP_WEBHOOK_URL=sua_url_de_webhook
MP_WEBHOOK_SECRET=sua_chave_secreta_de_webhook
```

### Sentry (Monitoramento de Erros)
```env
NEXT_PUBLIC_SENTRY_DSN=sua_chave_do_sentry
```

### PostHog (Analytics)
```env
NEXT_PUBLIC_POSTHOG_KEY=sua_chave_do_posthog
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Configurações Gerais
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

## 📖 Guia de Utilização - Passo-a-Passo

## 📱 Como Usar

### ⚡ Início Rápido (Primeiros 5 Minutos)

Se você quer testar rápido SEM configurar tudo:

```bash
# 1. Clone e instale
git clone https://github.com/NicolasMarrai/healthmed.git
cd healthmed
npm install

# 2. Copie o arquivo de ambiente (criará com valores vazios)
cp .env.example .env.local

# 3. Rode a aplicação
npm run dev

# 4. Abra no navegador
# http://localhost:3000
```

**O que funciona sem configurar:**
- ✅ Página inicial (homepage)
- ✅ Dashboard com vídeos de exemplo
- ⚠️ Cadastro/Login (precisa Supabase)
- ⚠️ Pagamento (precisa Mercado Pago)

---

### 🔌 Guia Completo - Configurar Tudo

#### Passo 1: Preparar o Repositório

```bash
# Clone o projeto
git clone https://github.com/NicolasMarrai/healthmed.git
cd healthmed

# Instale dependências
npm install

# Verifique se Node.js 18+ está instalado
node --version
```

#### Passo 2: Configurar Supabase (Banco de Dados)

1. **Crie uma conta** em [supabase.com](https://supabase.com)
2. **Crie um novo projeto** (escolha a região mais próxima)
3. **Copie as credenciais:**
   - Vá para `Settings` → `API`
   - Copie `Project URL` e `Anon Key`
4. **Adicione ao `.env.local`:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

5. **Configure o banco de dados:**
   - Vá para `SQL Editor` no Supabase
   - Execute este script:
   ```sql
   -- Criar tabela de usuários
   CREATE TABLE usuarios (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email TEXT UNIQUE NOT NULL,
     status_assinatura TEXT DEFAULT 'PENDING',
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Criar tabela de pagamentos
   CREATE TABLE pagamentos (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES usuarios(id),
     mp_payment_id TEXT NOT NULL,
     valor DECIMAL(10,2),
     status TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Habilitar RLS para segurança
   ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
   ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;
   ```

#### Passo 3: Configurar Sanity (CMS - Conteúdo)

1. **Crie uma conta** em [sanity.io](https://sanity.io)
2. **Crie um novo projeto** (template em branco)
3. **Copie as credenciais:**
   - Vá para `Settings` → `API` → `Tokens`
   - Copie o `Project ID`
4. **Adicione ao `.env.local`:**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_PROJECT_ID=seu-project-id
   SANITY_DATASET=production
   ```

5. **Configure o schema no Sanity:**
   - Vá para `Manage` → `Plugins`
   - Instale os plugins necessários (se houver)
   - Crie uma colecção `aula` com os campos:
     - `titulo` (string)
     - `descricao` (text)
     - `videoFile` (file)
     - `materia` (reference to materia)
     - `ordem` (number)

#### Passo 4: Configurar Mercado Pago (Pagamentos)

1. **Crie uma conta** em [mercadopago.com](https://mercadopago.com)
2. **Acesse o painel de desenvolvedor:**
   - Dashboard → Configurações → Credenciais
3. **Copie:**
   - `Access Token` (chave privada)
   - `Public Key` (chave pública)
4. **Adicione ao `.env.local`:**
   ```env
   MP_ACCESS_TOKEN=seu_access_token
   NEXT_PUBLIC_MP_PUBLIC_KEY=sua_chave_publica
   ```

5. **Configure o webhook** (para receber notificações de pagamento):
   - Dashboard → Notificações → Webhooks
   - Adicione: `https://seudominio.com/api/mp-webhook`
   - Copie o Secret e adicione:
   ```env
   MP_WEBHOOK_SECRET=seu_secret
   ```

#### Passo 5: Configurar Sentry (Monitoramento de Erros)

1. **Crie uma conta** em [sentry.io](https://sentry.io)
2. **Crie um novo projeto:**
   - Platform: `Next.js`
3. **Copie o DSN:**
   - Vá para `Settings` → `Client Keys (DSN)`
4. **Adicione ao `.env.local`:**
   ```env
   NEXT_PUBLIC_SENTRY_DSN=sua_dsn_url
   ```

#### Passo 6: Configurar PostHog (Analytics)

1. **Crie uma conta** em [posthog.com](https://posthog.com)
2. **Crie um novo projeto:**
   - Type: `Web`
3. **Copie a chave:**
   - Vá para `Settings` → `Project settings`
4. **Adicione ao `.env.local`:**
   ```env
   NEXT_PUBLIC_POSTHOG_KEY=sua_chave
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

#### Passo 7: Iniciar o Projeto

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Abra em seu navegador
# http://localhost:3000
```

---

### 🧪 Testando a Aplicação

#### Testar Cadastro/Login

1. Acesse `http://localhost:3000/cadastro`
2. Preencha com um email e senha
3. Clique em "Cadastrar"
4. Você será redirecionado para `/login`
5. Faça login com suas credenciais

#### Testar Pagamento (Simulado)

1. Faça login
2. Acesse `http://localhost:3000/pagamento-inicial`
3. Clique em "Escolher Plano"
4. **Dados de teste do Mercado Pago:**
   ```
   Cartão: 5016 7576 5726 4729
   Vencimento: 11/25
   CVV: 123
   Titular: TESTE
   ```

#### Testar Dashboard

1. Após completar pagamento
2. Acesse `http://localhost:3000/dashboard`
3. Você verá as aulas disponíveis
4. Clique em um vídeo para reproduzir

#### Testar Monitoramento

**Sentry:**
1. Acesse [sentry.io](https://sentry.io)
2. Procure seu projeto
3. Simule um erro clicando em um botão "quebrado"
4. Verifique se aparece em `Issues`

**PostHog:**
1. Acesse [posthog.com](https://posthog.com)
2. Procure seu projeto
3. Vá para `Insights`
4. Você verá eventos rastreados (Page Views, User Login, etc)

---

### 🔍 Troubleshooting - Resolvendo Problemas

#### "Erro: Module not found '@/lib/sanity'"
- **Solução:** Verifique se o arquivo `src/lib/sanity.ts` existe
- **Verificar:** `ls src/lib/` (ou use o explorador de arquivos)

#### "Erro: Cannot connect to Supabase"
- **Solução:** Verifique as credenciais em `.env.local`
- **Verificar:** `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão corretos?

#### "Dashboard não carrega vídeos"
- **Solução:** Verifique se aulas foram criadas no Sanity
- **Verificar:** Vá para seu projeto Sanity e crie uma aula com vídeo

#### "Pagamento não funciona"
- **Solução:** Verifique o console do navegador (F12)
- **Verificar:** Se `MP_ACCESS_TOKEN` está correto em `.env.local`
- **Nota:** Em desenvolvimento, use os dados de teste acima

#### "Sentry não rastreia erros"
- **Solução:** Verifique se `NEXT_PUBLIC_SENTRY_DSN` está correto
- **Verificar:** Console (F12) - deve aparecer mensagem de inicialização do Sentry

#### "PostHog não rastreia eventos"
- **Solução:** Verifique se `NEXT_PUBLIC_POSTHOG_KEY` está correto
- **Verificar:** Abra PostHog e procure por eventos recentes

---

### 📊 Comandos Úteis

```bash
# Desenvolvimento
npm run dev                # Inicia servidor com hot-reload

# Produção
npm run build              # Build otimizado
npm run start              # Inicia servidor de produção

# Qualidade de Código
npm run lint               # Verifica código com ESLint
npm run lint --fix         # Corrige erros automaticamente

# Testes
npm test                   # Executa testes

# Limpeza
npm run clean              # Remove cache e builds anteriores
rm -rf .next node_modules  # Limpa tudo (Linux/Mac)
```

---

### 💡 Dicas Úteis

1. **Abra DevTools (F12)** para ver logs e erros do console
2. **Comece simples** - Configure apenas Supabase + Sanity no início
3. **Use dados de teste** - Mercado Pago fornece credenciais de teste
4. **Monitore a performance** - Use Sentry para acompanhar erros em produção
5. **Rastreie o comportamento** - Use PostHog para entender seus usuários

---

### 🎯 Próximas Etapas

Após configurar tudo:

1. **Adicione seu conteúdo** - Vá para Sanity e crie suas aulas
2. **Customize o design** - Edite `tailwind.config.ts` para suas cores
3. **Configure domínio** - Mude `NEXT_PUBLIC_SITE_URL` para seu domínio
4. **Deploy em produção** - Suba para Vercel, Railway ou outro host



## 🔌 API Endpoints

### `POST /api/pagamento`
Cria um pagamento no Mercado Pago
```typescript
Body: {
  userId: string;
  // Outros dados do usuário
}

Response: {
  init_point: string; // URL para checkout
}
```

### `POST /api/mp-webhook`
Webhook para notificações do Mercado Pago
```typescript
Body: {
  type: "payment";
  data: { id: string };
  // Dados do webhook
}

Response: {
  success: boolean;
}
```

## 🗄️ Banco de Dados

### Tabelas Principais

#### `usuarios`
```sql
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  status_assinatura TEXT DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `pagamentos`
```sql
CREATE TABLE pagamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES usuarios(id),
  mp_payment_id TEXT NOT NULL,
  valor DECIMAL(10,2),
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Funções RPC

#### `update_user_status`
```sql
CREATE OR REPLACE FUNCTION update_user_status(
  p_user_id UUID,
  p_new_status TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE usuarios 
  SET status_assinatura = p_new_status 
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;
```

## 💰 Pagamentos

### Fluxo de Pagamento

1. **Iniciação**: Usuário clica em "Pagar" em `/pagamento-inicial`
2. **Checkout**: Redirecionamento para Mercado Pago
3. **Processamento**: Usuário completa pagamento
4. **Webhook**: Mercado Pago notifica nossa API
5. **Ativação**: Sistema ativa assinatura automaticamente
6. **Acesso**: Usuário pode acessar dashboard

### Status de Assinatura

- `PENDING`: Aguardando pagamento
- `ACTIVE`: Assinatura ativa
- `EXPIRED`: Assinatura expirada
- `CANCELLED`: Assinatura cancelada

## 🧪 Testes

### Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar versão de produção
npm run start

# Linting
npm run lint
```

### Testar Pagamentos
1. Use dados de teste do Mercado Pago
2. Verifique webhook em ambiente de desenvolvimento com ngrok
3. Monitore logs para debug

## 📊 Monitoramento, Observabilidade e Analytics

### O que é Monitoramento e Observabilidade?

Em produção, sua aplicação precisa de "olhos" para ver o que está acontecendo. É como ter câmeras de segurança e sensores em uma clínica:

- **Monitoramento** 📹: Detecta quando algo dá errado (erro crítico, aplicação caiu)
- **Observabilidade** 🔍: Você consegue investigar **por que** algo deu errado (logs detalhados, rastreamento de requisições)
- **Analytics** 📊: Entender o comportamento dos usuários (qual página visitam mais, qual vídeo assistem)

### 🚨 **Sentry** - Rastreamento de Erros

O Sentry funciona como um **sistema de alerta inteligente**. Quando um erro ocorre, ele:

1. **Captura o erro** - Registra exatamente o que deu errado
2. **Envia para o servidor Sentry** - Todos os detalhes do erro vão para análise
3. **Agrupa erros similares** - Se o mesmo erro acontecer 100 vezes, aparece como 1 problema
4. **Grava sessão com replay** - Vê exatamente o que o usuário fazia quando o erro ocorreu

#### Implementação no HealthMed

**Arquivo: `sentry.client.config.ts`** (Erros no NAVEGADOR)
```typescript
// Captura erros quando usuários usam a aplicação
// Exemplo: Erro ao carregar vídeo na dashboard
```

**Arquivo: `sentry.server.config.ts`** (Erros no SERVIDOR)
```typescript
// Captura erros quando servidor processa requisições
// Exemplo: Erro ao buscar aulas do Sanity
```

#### Como Funciona na Prática

1. Usuário acessa dashboard
2. Um erro acontece (ex: vídeo não carrega)
3. Sentry captura automaticamente
4. Você recebe notificação no Sentry
5. Pode ver: stack trace, navegador, país do usuário, etc.

### 📈 **PostHog** - Analytics e Comportamento dos Usuários

PostHog é como um **gerente de dashboard que acompanha cada movimento**:

1. **Rastreia ações dos usuários** - Login, cadastro, visualizar aula, assistir vídeo
2. **Cria gráficos e dashboards** - Quantos usuários fizeram X ação?
3. **Respeita privacidade** (GDPR compliant) - Não rastreia dados sensíveis
4. **Feature flags** - Ativa/desativa features para grupos de usuários

#### Implementação no HealthMed

**Arquivo: `lib/analytics.ts`** - Sistema de Analytics centralizado

```typescript
// Rastrear quando usuário faz login
analytics.auth.login(userId, 'email');

// Rastrear quando usuário inicia um vídeo
analytics.content.videoStarted(videoId, videoTitle);

// Rastrear quando pagamento é concluído
analytics.payment.completed(amount, plan, paymentId);
```

#### Eventos Rastreados

| Evento | O que significa |
|--------|-----------------|
| `Page Viewed` | Usuário acessou uma página |
| `User Logged In` | Usuário fez login |
| `User Registered` | Novo usuário se registrou |
| `Payment Completed` | Usuário completou um pagamento |
| `Video Started` | Usuário clicou em play num vídeo |
| `Video Completed` | Usuário assistiu vídeo inteiro |
| `Video Progress` | Usuário atingiu 25%, 50%, 75% do vídeo |

#### Respeito à Privacidade

PostHog está configurado com:
- ✅ Sem captura automática de cliques (você controla o que rastrear)
- ✅ Sem gravação automática de sessões (economiza dados)
- ✅ GDPR compliant (usuários podem desabilitar)

```typescript
// Usuário não quer ser rastreado?
analytics.optOut();

// Usuário muda de ideia?
analytics.optIn();
```

**Variáveis de Ambiente Necessárias:**
```env
NEXT_PUBLIC_POSTHOG_KEY=sua_chave_do_posthog
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com (opcional)
```

---

### 🔧 **Instrumentation** - Inicialização Automática

**Arquivo: `instrumentation.ts`** - Executado quando Next.js inicia

Este arquivo garante que:
1. Sentry inicia no servidor (NodeJS Runtime)
2. Sentry inicia no edge (Cloudflare Workers, etc)
3. Tudo começa ANTES de processar requisições

É como "iniciar as câmeras de segurança" quando o servidor liga.

---

### 📊 Como Usar o Painel de Monitoramento

#### Sentry
1. Acesse [sentry.io](https://sentry.io)
2. Faça login com sua conta
3. Procure seu projeto "HealthMed"
4. Veja erros em tempo real
5. Clique em um erro para ver:
   - Stack trace completo
   - Informações do navegador/SO
   - Reprodução em replay (vídeo)

#### PostHog
1. Acesse [app.posthog.com](https://app.posthog.com)
2. Faça login com sua conta
3. Procure seu projeto "HealthMed"
4. Explore:
   - **Insights**: Gráficos de eventos
   - **Dashboards**: Métricas customizadas
   - **Feature Flags**: Ativa testes A/B

---

### 🎯 Casos de Uso Reais

#### Cenário 1: Problema com Vídeos
```
Você recebe 50 erros no Sentry:
"Cannot load video URL"

PostHog mostra:
"Só usuários no Chrome 120+ têm problema"

→ Solução: Seu código não funciona em Chrome novo
```

#### Cenário 2: Pagamento Não Funciona
```
Sentry: Erro ao chamar API do Mercado Pago
PostHog: 100 usuários tentaram pagar, 0 completaram

→ Solução: Webhook não está configurado
```

#### Cenário 3: Dashboard Lenta
```
Sentry: Performance muito ruim
PostHog: Maioria dos usuários sai antes de 5s

→ Solução: Precisa otimizar queries do Sanity
```

---

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte o repositório GitHub à Vercel
2. Configure variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
- **Netlify**: Suporte a Next.js
- **Railway**: Deploy com PostgreSQL
- **Heroku**: Com addon de banco

## 🔒 Segurança

### Configurações Importantes
- RLS habilitado no Supabase
- Webhooks com validação de assinatura
- Headers de segurança configurados
- Rate limiting implementado

### Boas Práticas
- Nunca commite variáveis de ambiente
- Use HTTPS em produção
- Monitore logs regularmente
- Atualize dependências periodicamente

## 🐛 Problemas Conhecidos

1. **Middleware Desabilitado**: Middleware está temporariamente desabilitado para debug
2. **Webhook Secret**: Usando valor placeholder em desenvolvimento
3. **Rate Limiting**: Não implementado (desenvolvimento)

## 📚 Documentação

O projeto possui documentação completa e detalhada:

### 📖 Documentação Disponível

| Documento | Descrição | Link |
|-----------|-----------|------|
| **SETUP.md** | Guia completo de configuração do ambiente | [Ver →](./SETUP.md) |
| **CONTRIBUTING.md** | Guia de contribuição e padrões de código | [Ver →](./CONTRIBUTING.md) |
| **MONITORING.md** | Sistema de monitoramento e observabilidade | [Ver →](./MONITORING.md) |
| **DEPLOY.md** | Guia de deploy em produção | [Ver →](./DEPLOY.md) |
| **SENTRY.md** | Configuração do Sentry (opcional) | [Ver →](./SENTRY.md) |
| **openapi.yaml** | Documentação da API (OpenAPI/Swagger) | [Ver →](./openapi.yaml) |
| **EXAMPLES-CODE.md** | Exemplos práticos de código | [Ver →](./EXAMPLES-CODE.md) |

### 🔧 Comandos de Documentação

```bash
# Ver documentação da API no Swagger Editor
npm run docs:api

# Servir documentação da API localmente (requer @redocly/cli)
npm run docs:serve

# Verificar tipos TypeScript
npm run type-check
```

### 📘 Visualizar API Documentation

#### Opção 1: Swagger Editor Online
1. Acesse: https://editor.swagger.io
2. File → Import File → Selecione `openapi.yaml`
3. Explore a documentação interativa

#### Opção 2: Redoc (Local)
```bash
# Instalar Redoc CLI
npm install -g @redocly/cli

# Servir documentação
npx @redocly/cli preview-docs openapi.yaml

# Acessar em http://localhost:8080
```

#### Opção 3: VS Code
- Instale a extensão "OpenAPI (Swagger) Editor"
- Abra `openapi.yaml`
- Clique em "Preview" no canto superior direito

### 📝 JSDoc

Todos os arquivos principais possuem documentação JSDoc:

```typescript
/**
 * Formata um valor monetário para o padrão brasileiro
 * 
 * @param value - Valor numérico em reais
 * @param options - Opções de formatação
 * @returns String formatada (ex: "R$ 1.234,56")
 * 
 * @example
 * ```ts
 * formatCurrency(1234.56); // "R$ 1.234,56"
 * ```
 */
export function formatCurrency(value: number, options?: FormatOptions): string {
  // ...
}
```

### 🗺️ Guias por Tópico

#### Para Iniciantes
1. Leia `SETUP.md` para configurar o ambiente
2. Siga `CONTRIBUTING.md` para entender os padrões
3. Explore `EXAMPLES-CODE.md` para ver exemplos práticos

#### Para Deploy
1. `DEPLOY.md` - Guia completo de deployment
2. `MONITORING.md` - Configurar monitoramento em produção
3. `openapi.yaml` - Documentação da API para equipe DevOps

#### Para Desenvolvimento
1. `CONTRIBUTING.md` - Padrões de código e workflow
2. `EXAMPLES-CODE.md` - Exemplos de uso dos sistemas
3. `MONITORING.md` - Como usar logs, analytics e error tracking

### 🎯 Status da Documentação

- [x] API Documentation (OpenAPI/Swagger)
- [x] Code Documentation (JSDoc)
- [x] Deployment Guides (DEPLOY.md)
- [x] Environment Setup (SETUP.md)
- [x] Contributing Guidelines (CONTRIBUTING.md)
- [x] Monitoring & Observability (MONITORING.md)
- [x] Code Examples (EXAMPLES-CODE.md)
- [x] Sentry Integration Guide (SENTRY.md)

**Documentação 100% completa! ✅**

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Use TypeScript para tipagem
- Siga as regras do ESLint
- Mantenha componentes pequenos e focados
- Documente funções complexas

## 📄 Licença

Este projeto é de uso privado para fins educacionais.

## 👥 Autores

- **Nicolas Marrai** - [@NicolasMarrai](https://github.com/NicolasMarrai)
- **Cauã Sarraf** - [@CauaOdM](https://github.com/CauaOdM)
- **Lucca Pontes** - [@DEVLucca](https://github.com/DEVLucca)

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Contate o desenvolvedor

---

**HealthMed** - Transformando a educação médica através da tecnologia 
