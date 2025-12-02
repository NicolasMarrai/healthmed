# 🧪 Testes - HealthMed

## 📋 Configuração de Testes

Este projeto utiliza **Jest** e **React Testing Library** para testes unitários e de integração.

### 🛠️ Tecnologias
- **Jest**: Framework de testes
- **@testing-library/react**: Utilitários para testar componentes React
- **@testing-library/user-event**: Simulação de interações do usuário
- **@testing-library/jest-dom**: Matchers customizados para DOM

## 🚀 Como Executar

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch (desenvolvimento)
```bash
npm run test:watch
```

### Executar testes com relatório de cobertura
```bash
npm run test:coverage
```

## 📁 Estrutura dos Testes

```
__tests__/
├── page.test.tsx              # Testes da landing page
├── login.test.tsx             # Testes da página de login
├── cadastro.test.tsx          # Testes da página de cadastro
├── ErrorBoundary.test.tsx     # Testes do error boundary
├── Loading.test.tsx           # Testes dos componentes de loading
└── errors.test.ts             # Testes dos utilitários de erro
```

## 📊 Cobertura de Testes

### Componentes Testados
- ✅ **Landing Page**: Renderização de seções, navegação, CTAs
- ✅ **Login Page**: Formulário, validações, interações
- ✅ **Cadastro Page**: Campos do form, validações
- ✅ **Error Boundary**: Captura de erros, fallback UI
- ✅ **Loading Components**: Spinner, botões, overlays, skeletons
- ✅ **Error Utilities**: Classes de erro, error handling

### Funcionalidades Testadas
- ✅ Renderização correta de elementos
- ✅ Navegação entre páginas
- ✅ Interações do usuário (cliques, digitação)
- ✅ Tratamento de erros
- ✅ Estados de loading
- ✅ Responsividade básica
- ✅ Acessibilidade (roles, labels)

## 🎯 Boas Práticas Implementadas

### 1. **Testes de Acessibilidade**
- Uso de `getByRole` para elementos interativos
- Verificação de `aria-label` e labels
- Testes de navegação por teclado

### 2. **Simulação Realista**
- `userEvent` para interações autênticas
- Mocks apropriados para dependências externas
- Testes de fluxos completos

### 3. **Isolamento de Testes**
- Mocks para Next.js (navigation, Link)
- Mocks para Supabase
- Setup e teardown adequados

### 4. **Cobertura Abrangente**
- Testes de happy path
- Testes de error handling
- Testes de edge cases
- Testes de estados de loading

## 🔧 Configuração

### jest.config.js
```javascript
// Configuração do Jest com Next.js
// Suporte a JSX/TSX, aliases de path
// Ambiente jsdom para DOM testing
```

### jest.setup.js
```javascript
// Setup global para jest-dom matchers
// Configurações globais de teste
```

## 📈 Exemplos de Testes

### Teste de Renderização
```typescript
test('renders main heading', () => {
  render(<Home />);
  
  const heading = screen.getByRole('heading', { 
    name: /Transformando a Educação Médica/i 
  });
  expect(heading).toBeInTheDocument();
});
```

### Teste de Interação
```typescript
test('allows user to type in email input', async () => {
  const user = userEvent.setup();
  render(<LoginPage />);

  const emailInput = screen.getByLabelText(/E-mail/i);
  await user.type(emailInput, 'test@example.com');

  expect(emailInput).toHaveValue('test@example.com');
});
```

### Teste de Error Boundary
```typescript
test('renders error UI when there is an error', () => {
  render(
    <ErrorBoundary>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  );

  expect(screen.getByText('Ops! Algo deu errado')).toBeInTheDocument();
});
```

## 🎯 Próximos Passos

1. **Testes E2E**: Implementar com Playwright ou Cypress
2. **Testes de Performance**: Adicionar testes de lighthouse
3. **Testes de API**: Expandir cobertura das routes
4. **Visual Regression**: Testes de screenshot
5. **Testes de Acessibilidade**: Integrar axe-core

## 🐛 Debugging

### Visualizar DOM durante teste
```typescript
import { screen } from '@testing-library/react';

// Debug do DOM atual
screen.debug();

// Debug de elemento específico
screen.debug(screen.getByRole('button'));
```

### Log de queries
```typescript
// Mostrar todas as queries disponíveis
screen.logTestingPlaygroundURL();
```

---

**Desenvolvido com ❤️ para garantir qualidade e confiabilidade da HealthMed**