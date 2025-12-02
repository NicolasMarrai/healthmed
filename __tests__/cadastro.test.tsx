import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CadastroPage from '../app/cadastro/page';

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock Supabase
jest.mock('../src/lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

describe('Cadastro Page', () => {
  test('renders registration form', () => {
    render(<CadastroPage />);

    expect(screen.getByRole('heading', { name: /HealthMed - Cadastro/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cadastrar e Ir para o Pagamento/i })).toBeInTheDocument();
  });

  test('renders login link', () => {
    render(<CadastroPage />);

    expect(screen.getByText(/Já tem conta?/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Fazer Login/i })).toBeInTheDocument();
  });

  test('allows user to fill registration form', async () => {
    const user = userEvent.setup();
    render(<CadastroPage />);

    const nameInput = screen.getByLabelText(/Nome Completo/i);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Senha/i);

    await user.type(nameInput, 'João Silva');
    await user.type(emailInput, 'joao@example.com');
    await user.type(passwordInput, 'password123');

    expect(nameInput).toHaveValue('João Silva');
    expect(emailInput).toHaveValue('joao@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('form submission is handled', async () => {
    const user = userEvent.setup();
    render(<CadastroPage />);

    const nameInput = screen.getByLabelText(/Nome Completo/i);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const submitButton = screen.getByRole('button', { name: /Cadastrar e Ir para o Pagamento/i });

    await user.type(nameInput, 'João Silva');
    await user.type(emailInput, 'joao@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Verify form values are maintained
    expect(nameInput).toHaveValue('João Silva');
    expect(emailInput).toHaveValue('joao@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});