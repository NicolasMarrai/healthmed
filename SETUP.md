# Environment Setup Guide - HealthMed

Guia completo para configurar o ambiente de desenvolvimento do HealthMed.

## 📋 Pré-requisitos

### Sistema Operacional
- ✅ Windows 10/11
- ✅ macOS 12+
- ✅ Linux (Ubuntu 20.04+)

### Software Necessário

| Software | Versão Mínima | Versão Recomendada | Download |
|----------|---------------|-------------------|----------|
| **Node.js** | 18.x | 20.x LTS | https://nodejs.org |
| **npm** | 9.x | 10.x | Incluído no Node.js |
| **Git** | 2.30+ | Latest | https://git-scm.com |
| **VS Code** | 1.80+ | Latest | https://code.visualstudio.com |

### Contas Necessárias

1. **Supabase** (Database & Auth) - https://supabase.com
2. **Sanity** (CMS) - https://www.sanity.io
3. **Mercado Pago** (Pagamentos) - https://www.mercadopago.com.br/developers
4. **PostHog** (Analytics - Opcional) - https://posthog.com

---

## 🚀 Instalação Passo a Passo

### 1. Instalar Node.js

#### Windows
```powershell
# Usando Chocolatey
choco install nodejs-lts

# Ou baixe o instalador em https://nodejs.org
```

#### macOS
```bash
# Usando Homebrew
brew install node@20

# Ou baixe o instalador em https://nodejs.org
```

#### Linux (Ubuntu/Debian)
```bash
# Usando NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version  # Deve mostrar v20.x.x
npm --version   # Deve mostrar 10.x.x
```

### 2. Instalar Git

#### Windows
```powershell
# Usando Chocolatey
choco install git

# Ou baixe o instalador em https://git-scm.com
```

#### macOS
```bash
# Git já vem instalado, mas pode atualizar com Homebrew
brew install git
```

#### Linux
```bash
sudo apt-get update
sudo apt-get install git
```

Configurar Git:
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### 3. Instalar VS Code

Baixe em: https://code.visualstudio.com

**Extensões Recomendadas:**
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "prisma.prisma",
    "ms-azuretools.vscode-docker"
  ]
}
```

Instalar todas as extensões:
```bash
# Windows/Linux
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
```

---

## 📦 Setup do Projeto

### 1. Clonar o Repositório

```bash
# HTTPS
git clone https://github.com/NicolasMarrai/healthmed.git

# SSH (recomendado)
git clone git@github.com:NicolasMarrai/healthmed.git

# Entrar no diretório
cd healthmed/healthmed-app
```

### 2. Instalar Dependências

```bash
npm install
```

**Dependências Principais Instaladas:**
- Next.js 16.0.7
- React 19.2.0
- TypeScript 5.x
- Tailwind CSS 4.x
- Supabase Client
- PostHog (Analytics)
- Mercado Pago SDK
- Sanity Client

### 3. Configurar Variáveis de Ambiente

#### Passo 3.1: Criar arquivo `.env.local`

```bash
# Copiar template
cp .env.example .env.local

# Ou no Windows
copy .env.example .env.local
```

#### Passo 3.2: Configurar Supabase

1. Acesse: https://supabase.com/dashboard
2. Crie um novo projeto
3. Vá em **Settings → API**
4. Copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
```

#### Passo 3.3: Configurar Sanity

1. Acesse: https://www.sanity.io/manage
2. Crie um novo projeto
3. Copie o **Project ID**
4. Configure o dataset (production)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

#### Passo 3.4: Configurar Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers
2. Crie uma aplicação
3. Vá em **Credenciais**
4. Use as credenciais de **teste** para desenvolvimento

```env
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=TEST-sua-public-key
MERCADO_PAGO_ACCESS_TOKEN=TEST-seu-access-token
```

#### Passo 3.5: Configurar PostHog (Opcional)

1. Acesse: https://posthog.com/signup
2. Crie uma conta
3. Copie a **Project API Key**

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_sua_chave_aqui
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Arquivo `.env.local` completo:**

```env
# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon

# SANITY
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# MERCADO PAGO
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=TEST-sua-public-key
MERCADO_PAGO_ACCESS_TOKEN=TEST-seu-access-token

# POSTHOG (Opcional)
NEXT_PUBLIC_POSTHOG_KEY=phc_sua_chave
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# APP
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🗄️ Setup do Banco de Dados

### Supabase Schema

Execute no **SQL Editor** do Supabase:

```sql
-- Tabela de usuários
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  plano TEXT CHECK (plano IN ('free', 'mensal', 'anual')),
  data_expiracao TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de progresso das aulas
CREATE TABLE progresso_aulas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  aula_id TEXT NOT NULL,
  concluida BOOLEAN DEFAULT FALSE,
  progresso INTEGER DEFAULT 0,
  ultima_visualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(usuario_id, aula_id)
);

-- Tabela de pagamentos
CREATE TABLE pagamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  mercadopago_id TEXT UNIQUE,
  status TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  plano TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_progresso_usuario ON progresso_aulas(usuario_id);
CREATE INDEX idx_pagamentos_usuario ON pagamentos(usuario_id);
CREATE INDEX idx_pagamentos_mercadopago ON pagamentos(mercadopago_id);

-- Row Level Security (RLS)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE progresso_aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Usuários podem ver seus próprios dados"
  ON usuarios FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seus próprios dados"
  ON usuarios FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem ver seu próprio progresso"
  ON progresso_aulas FOR ALL
  USING (usuario_id = auth.uid());

CREATE POLICY "Usuários podem ver seus próprios pagamentos"
  ON pagamentos FOR SELECT
  USING (usuario_id = auth.uid());
```

---

## 🎨 Setup do Sanity Studio

### 1. Instalar Sanity CLI

```bash
npm install -g @sanity/cli
```

### 2. Criar schemas das aulas

Crie `sanity/schemas/aula.ts`:

```typescript
export default {
  name: 'aula',
  title: 'Aula',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
    },
    {
      name: 'videoUrl',
      title: 'URL do Vídeo',
      type: 'url',
    },
    {
      name: 'duracao',
      title: 'Duração (minutos)',
      type: 'number',
    },
    {
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Cardiologia', value: 'cardiologia' },
          { title: 'Pediatria', value: 'pediatria' },
          { title: 'Cirurgia', value: 'cirurgia' },
        ],
      },
    },
    {
      name: 'ordem',
      title: 'Ordem',
      type: 'number',
    },
    {
      name: 'disponivel',
      title: 'Disponível',
      type: 'boolean',
      initialValue: true,
    },
  ],
};
```

---

## ▶️ Executar o Projeto

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Servidor estará em http://localhost:3000
```

### Build

```bash
# Build de produção
npm run build

# Iniciar servidor de produção
npm start
```

### Testes

```bash
# Executar testes
npm test

# Testes em watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Lint

```bash
# Verificar código
npm run lint

# Corrigir automaticamente
npm run lint -- --fix
```

---

## 🔍 Verificar Instalação

### Health Check

```bash
# Com servidor rodando
curl http://localhost:3000/api/health
```

Resposta esperada:
```json
{
  "timestamp": "2025-12-04T10:00:00.000Z",
  "status": "healthy",
  "checks": {
    "database": {
      "status": "healthy",
      "message": "Connected"
    },
    "cms": {
      "status": "healthy",
      "message": "Connected"
    }
  }
}
```

### Checklist de Verificação

- [ ] Node.js instalado (v20+)
- [ ] npm instalado (v10+)
- [ ] Git configurado
- [ ] Repositório clonado
- [ ] Dependências instaladas (`node_modules/` existe)
- [ ] `.env.local` configurado
- [ ] Supabase funcionando
- [ ] Sanity configurado
- [ ] Mercado Pago (credenciais de teste)
- [ ] Servidor rodando (`npm run dev`)
- [ ] Health check retorna status healthy
- [ ] Nenhum erro no console
- [ ] Páginas carregam corretamente

---

## 🐛 Troubleshooting

### Erro: "Module not found"

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3000 already in use"

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Erro: Supabase connection failed

1. Verifique se as credenciais estão corretas no `.env.local`
2. Verifique se o projeto Supabase está ativo
3. Teste a URL manualmente: `curl https://seu-projeto.supabase.co`

### Erro: TypeScript errors

```bash
# Limpar cache do TypeScript
rm -rf .next
npm run dev
```

### Erro: ESLint warnings

```bash
# Corrigir automaticamente
npm run lint -- --fix
```

---

## 📱 Desenvolvimento Mobile-First

### Testar Responsividade

1. **Chrome DevTools:**
   - F12 → Toggle device toolbar (Ctrl+Shift+M)
   - Teste: iPhone 12, iPad, Desktop

2. **Navegadores Reais:**
   - Abra `http://seu-ip:3000` no celular
   - Mesmo WiFi que o computador

3. **Ferramentas:**
   - Responsively App: https://responsively.app
   - BrowserStack: https://www.browserstack.com

---

## 🚀 Próximos Passos

Após setup completo:

1. **Leia a documentação:**
   - `README.md` - Visão geral
   - `CONTRIBUTING.md` - Como contribuir
   - `MONITORING.md` - Sistema de monitoramento

2. **Explore o código:**
   - `app/` - Páginas e rotas
   - `components/` - Componentes reutilizáveis
   - `src/lib/` - Utilitários e integrações

3. **Faça sua primeira contribuição:**
   - Issues com label `good first issue`
   - Melhorar documentação
   - Adicionar testes

---

## 📞 Suporte

Problemas durante o setup?

- **Issues:** https://github.com/NicolasMarrai/healthmed/issues
- **Discussions:** https://github.com/NicolasMarrai/healthmed/discussions
- **Email:** suporte@healthmed.com.br

---

**Ambiente configurado com sucesso! 🎉**

Agora execute `npm run dev` e comece a desenvolver!
