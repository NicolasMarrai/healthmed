# 🏥 HealthMed - Plataforma de Educação Médica

Uma plataforma de ensino médico online com sistema de pagamentos integrado, autenticação de usuários e gestão de conteúdo.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração e Instalação](#configuração-e-instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Como Usar](#como-usar)
- [API Endpoints](#api-endpoints)
- [Banco de Dados](#banco-de-dados)
- [Pagamentos](#pagamentos)
- [Monitoramento, Observabilidade e Analytics](#-monitoramento-observabilidade-e-analytics)
- [Deploy](#-deploy)
- [Segurança](#-segurança)
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
```

## 📱 Como Usar

### Para Usuários

1. **Cadastro/Login**
   - Acesse `/cadastro` para criar uma conta
   - Ou `/login` para entrar com conta existente

2. **Pagamento**
   - Usuários sem assinatura ativa são direcionados para `/pagamento-inicial`
   - Complete o pagamento via Mercado Pago
   - Após confirmação, o acesso será liberado automaticamente

3. **Dashboard**
   - Usuários com assinatura ativa acessam `/dashboard`
   - Visualize e assista as aulas disponíveis
   - Navegue pelo conteúdo educativo

### Para Administradores

1. **Gestão de Conteúdo**
   - Acesse o painel Sanity para adicionar/editar aulas
   - Upload de vídeos e materiais
   - Organização do conteúdo

2. **Monitoramento**
   - Acompanhe pagamentos no painel Mercado Pago
   - Verifique status de usuários no Supabase

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

**Variáveis de Ambiente Necessárias:**
```env
NEXT_PUBLIC_SENTRY_DSN=sua_chave_do_sentry
```

---

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

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Contate o desenvolvedor

---

**HealthMed** - Transformando a educação médica através da tecnologia 
