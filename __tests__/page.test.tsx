import { render, screen } from '@testing-library/react';
import Home from '../app/page';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe('Landing Page', () => {
  test('renders main heading', () => {
    render(<Home />);
    
    const heading = screen.getByText('Transforme sua');
    expect(heading).toBeInTheDocument();
    expect(screen.getByText('Educação Médica')).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    render(<Home />);
    
    // Test logo - using getAllByText para multiplos elementos
    const healthMedElements = screen.getAllByText('HealthMed');
    expect(healthMedElements.length).toBeGreaterThan(0);
    
    // Test navigation links - using getAllByRole para múltiplos links
    const entrarLinks = screen.getAllByRole('link', { name: /Entrar/i });
    expect(entrarLinks.length).toBeGreaterThan(0);
  });

  test('renders call-to-action buttons', () => {
    render(<Home />);
    
    // Main CTA button
    expect(screen.getByRole('link', { name: /Começar Gratuitamente/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Já tenho conta/i })).toBeInTheDocument();
  });

  test('renders features section', () => {
    render(<Home />);
    
    expect(screen.getByText('Conteúdo Especializado')).toBeInTheDocument();
    expect(screen.getByText('Aprenda no Seu Ritmo')).toBeInTheDocument();
    expect(screen.getByText('Certificação Reconhecida')).toBeInTheDocument();
  });

  test('renders how it works section', () => {
    render(<Home />);
    
    expect(screen.getByRole('heading', { name: /Como funciona/i })).toBeInTheDocument();
    expect(screen.getByText('Crie sua conta')).toBeInTheDocument();
    expect(screen.getByText('Escolha seu plano')).toBeInTheDocument();
    expect(screen.getByText('Comece a estudar')).toBeInTheDocument();
  });

  test('renders pricing section', () => {
    render(<Home />);
    
    expect(screen.getByText('Plano Premium')).toBeInTheDocument();
    expect(screen.getByText('R$ 10')).toBeInTheDocument();
    expect(screen.getByText('/mês')).toBeInTheDocument();
    expect(screen.getByText('Acesso a todas as aulas e cursos')).toBeInTheDocument();
  });

  test('renders footer with all links', () => {
    render(<Home />);
    
    // Test footer sections
    expect(screen.getByText('Plataforma')).toBeInTheDocument();
    expect(screen.getByText('Suporte')).toBeInTheDocument();
    expect(screen.getByText('Empresa')).toBeInTheDocument();
    
    // Test footer links
    expect(screen.getByText('Central de Ajuda')).toBeInTheDocument();
    expect(screen.getByText('© 2024 HealthMed. Todos os direitos reservados.')).toBeInTheDocument();
  });

  test('mobile menu button exists', () => {
    render(<Home />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /abrir menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
  });
});