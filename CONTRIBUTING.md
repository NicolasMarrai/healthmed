# Contributing Guidelines - HealthMed

Obrigado por considerar contribuir com o HealthMed! 🎉

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Testes](#testes)
- [Documentação](#documentação)

---

## 📜 Código de Conduta

Este projeto adota um Código de Conduta. Ao participar, você concorda em manter um ambiente respeitoso e inclusivo.

### Comportamento Esperado:
- ✅ Seja respeitoso e profissional
- ✅ Aceite feedback construtivo
- ✅ Foque no que é melhor para a comunidade
- ✅ Demonstre empatia com outros membros

### Comportamento Inaceitável:
- ❌ Linguagem ou imagens ofensivas
- ❌ Ataques pessoais ou políticos
- ❌ Assédio público ou privado
- ❌ Publicar informações privadas de terceiros

---

## 🚀 Como Contribuir

### 1. Issues

**Reportar Bugs:**
```markdown
**Descrição do Bug:**
Descrição clara do problema

**Passos para Reproduzir:**
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado:**
O que deveria acontecer

**Screenshots:**
Se aplicável, adicione screenshots

**Ambiente:**
- OS: [ex: Windows 11]
- Browser: [ex: Chrome 120]
- Node: [ex: 20.11.0]
```

**Sugerir Melhorias:**
```markdown
**Problema Atual:**
Descreva a limitação atual

**Solução Proposta:**
Como você resolveria isso

**Alternativas:**
Outras soluções consideradas

**Contexto Adicional:**
Informações relevantes
```

### 2. Pull Requests

1. **Fork o repositório**
   ```bash
   git clone https://github.com/seu-usuario/healthmed.git
   cd healthmed/healthmed-app
   ```

2. **Crie uma branch**
   ```bash
   git checkout -b feature/nome-da-feature
   # ou
   git checkout -b fix/nome-do-bug
   ```

3. **Faça suas mudanças**
   - Siga os padrões de código
   - Adicione testes se aplicável
   - Atualize a documentação

4. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade X"
   ```

5. **Push para o GitHub**
   ```bash
   git push origin feature/nome-da-feature
   ```

6. **Abra um Pull Request**

---

## 💻 Padrões de Código

### TypeScript

```typescript
// ✅ BOM
/**
 * Calcula o valor total do carrinho
 * @param items - Array de itens do carrinho
 * @returns Valor total em reais
 */
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ❌ RUIM
export function calc(i: any) {
  return i.reduce((s: any, x: any) => s + x.p * x.q, 0);
}
```

### React Components

```typescript
// ✅ BOM
interface ButtonProps {
  /** Texto do botão */
  label: string;
  /** Função chamada ao clicar */
  onClick: () => void;
  /** Variante visual do botão */
  variant?: 'primary' | 'secondary';
}

/**
 * Componente de botão reutilizável
 */
export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}

// ❌ RUIM
export function Btn(props: any) {
  return <button onClick={props.click}>{props.txt}</button>;
}
```

### Naming Conventions

```typescript
// Componentes: PascalCase
export function UserProfile() {}

// Funções: camelCase
export function calculateTotal() {}

// Constantes: UPPER_SNAKE_CASE
export const MAX_RETRY_COUNT = 3;

// Interfaces/Types: PascalCase
export interface UserData {}

// Arquivos de componentes: PascalCase
// Button.tsx, UserProfile.tsx

// Arquivos utilitários: camelCase
// dateUtils.ts, stringHelpers.ts
```

### Imports

```typescript
// ✅ BOM - Organizado e agrupado
// 1. React e bibliotecas externas
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Componentes internos
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

// 3. Utilitários e helpers
import { formatDate } from '@/src/lib/utils';
import { logger } from '@/src/lib/logger.client';

// 4. Tipos
import type { User } from '@/types';

// ❌ RUIM - Desorganizado
import type { User } from '@/types';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { formatDate } from '@/src/lib/utils';
```

### Error Handling

```typescript
// ✅ BOM - Error tracking integrado
import { errorTracker, ErrorCategory } from '@/src/lib/errors';

async function fetchUserData(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    errorTracker.captureError(error as Error, {
      component: 'UserProfile',
      action: 'fetchUserData',
      category: ErrorCategory.NETWORK,
      metadata: { userId },
    });
    throw error;
  }
}

// ❌ RUIM - Erro ignorado
async function getData(id: string) {
  try {
    return await fetch(`/api/data/${id}`).then(r => r.json());
  } catch (e) {
    console.log(e);
  }
}
```

---

## 🔄 Processo de Pull Request

### Checklist do PR

Antes de submeter um PR, verifique:

- [ ] Código segue os padrões do projeto
- [ ] Todos os testes passam (`npm test`)
- [ ] Não há erros de lint (`npm run lint`)
- [ ] Não há erros de TypeScript
- [ ] Documentação atualizada (se aplicável)
- [ ] JSDoc adicionado para funções públicas
- [ ] Commit messages seguem o padrão Conventional Commits
- [ ] Branch está atualizada com `main`

### Conventional Commits

Formato: `tipo(escopo): descrição`

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração de código
- `test`: Testes
- `chore`: Manutenção

**Exemplos:**
```bash
feat(auth): adiciona login com Google
fix(payment): corrige cálculo de desconto
docs(api): atualiza documentação do endpoint /health
refactor(dashboard): simplifica lógica de carregamento
test(utils): adiciona testes para formatDate
chore(deps): atualiza dependências
```

### Review Process

1. **Automated Checks:**
   - Build do Next.js
   - TypeScript compilation
   - ESLint
   - Testes automatizados

2. **Code Review:**
   - Pelo menos 1 aprovação necessária
   - Revisão de segurança
   - Verificação de performance

3. **Merge:**
   - Squash and merge (preferencial)
   - Merge commit (se histórico importante)

---

## 📁 Estrutura do Projeto

```
healthmed-app/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── health/          # Health checks
│   │   ├── pagamento/       # Pagamentos
│   │   └── mp-webhook/      # Webhooks
│   ├── cadastro/            # Página de cadastro
│   ├── dashboard/           # Dashboard de aulas
│   └── login/               # Página de login
├── components/              # Componentes reutilizáveis
│   └── ErrorBoundary.tsx   # Error boundary global
├── src/
│   └── lib/                 # Bibliotecas e utilitários
│       ├── analytics.ts     # PostHog analytics
│       ├── errors.ts        # Error tracking
│       ├── logger.client.ts # Logs client-side
│       ├── logger.server.ts # Logs server-side
│       ├── performance.ts   # Performance monitoring
│       ├── sanity.ts        # Sanity CMS client
│       └── supabase.ts      # Supabase client
├── public/                  # Assets estáticos
├── docs/                    # Documentação adicional
└── tests/                   # Testes automatizados
```

### Onde Adicionar Código

| Tipo de Código | Local |
|----------------|-------|
| Nova página | `app/nome-da-pagina/page.tsx` |
| API endpoint | `app/api/nome/route.ts` |
| Componente UI | `components/NomeComponente.tsx` |
| Utilitário | `src/lib/nomeUtil.ts` |
| Tipo TypeScript | `types/nome.ts` |
| Teste | `__tests__/nome.test.ts` |
| Documentação | `docs/nome.md` |

---

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Escrever Testes

```typescript
// __tests__/utils/formatDate.test.ts
import { formatDate } from '@/src/lib/utils';

describe('formatDate', () => {
  it('formata data corretamente', () => {
    const date = new Date('2025-12-04T10:00:00Z');
    expect(formatDate(date)).toBe('04/12/2025');
  });

  it('lida com data inválida', () => {
    expect(() => formatDate(null as any)).toThrow();
  });
});
```

### Convenções de Testes

- Use `describe` para agrupar testes relacionados
- Use `it` ou `test` para casos individuais
- Teste casos de sucesso e erro
- Mock serviços externos (Supabase, Sanity, etc)
- Mantenha testes rápidos e isolados

---

## 📚 Documentação

### JSDoc

Documente todas as funções e componentes públicos:

```typescript
/**
 * Formata um valor monetário para o padrão brasileiro
 * 
 * @param value - Valor numérico em reais
 * @param options - Opções de formatação
 * @param options.showSymbol - Exibir símbolo R$
 * @returns String formatada (ex: "R$ 1.234,56")
 * 
 * @example
 * ```ts
 * formatCurrency(1234.56); // "R$ 1.234,56"
 * formatCurrency(1234.56, { showSymbol: false }); // "1.234,56"
 * ```
 */
export function formatCurrency(
  value: number,
  options: { showSymbol?: boolean } = {}
): string {
  // ...
}
```

### README Updates

Ao adicionar features maiores, atualize:
- `README.md` - Visão geral
- `MONITORING.md` - Se relacionado a monitoramento
- `DEPLOY.md` - Se afeta deploy
- `openapi.yaml` - Se adicionar/modificar APIs

---

## 🎯 Áreas para Contribuir

### 🟢 Iniciante (Good First Issue)
- Adicionar testes unitários
- Melhorar documentação
- Corrigir typos
- Adicionar JSDoc

### 🟡 Intermediário
- Implementar novas features
- Otimizar performance
- Refatorar código legado
- Adicionar validações

### 🔴 Avançado
- Arquitetura e design patterns
- Segurança e vulnerabilidades
- Integração com serviços externos
- Performance crítica

---

## 💬 Comunicação

- **Issues:** Para bugs e features
- **Discussions:** Para perguntas e ideias
- **Pull Requests:** Para código
- **Email:** suporte@healthmed.com.br (urgências)

---

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto (MIT).

---

**Obrigado por contribuir com o HealthMed! 🚀**
