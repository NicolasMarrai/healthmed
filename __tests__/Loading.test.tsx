import { render, screen } from '@testing-library/react';
import { 
  LoadingSpinner, 
  LoadingButton, 
  LoadingOverlay, 
  LoadingSkeleton 
} from '../components/Loading';

describe('Loading Components', () => {
  describe('LoadingSpinner', () => {
    test('renders default spinner', () => {
      render(<LoadingSpinner />);
      
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner.querySelector('svg')).toHaveClass('animate-spin');
    });

    test('renders with custom text', () => {
      render(<LoadingSpinner text="Carregando dados..." />);
      
      expect(screen.getByText('Carregando dados...')).toBeInTheDocument();
    });
  });

  describe('LoadingButton', () => {
    test('renders in normal state', () => {
      render(<LoadingButton>Clique aqui</LoadingButton>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
      expect(screen.getByText('Clique aqui')).toBeInTheDocument();
    });

    test('renders in loading state', () => {
      render(<LoadingButton loading>Clique aqui</LoadingButton>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('shows loading text when provided', () => {
      render(
        <LoadingButton loading loadingText="Salvando...">
          Salvar
        </LoadingButton>
      );
      
      expect(screen.getByText('Salvando...')).toBeInTheDocument();
      expect(screen.queryByText('Salvar')).not.toBeInTheDocument();
    });
  });

  describe('LoadingOverlay', () => {
    test('renders overlay when visible', () => {
      render(<LoadingOverlay visible />);
      
      const overlays = screen.getAllByRole('status');
      expect(overlays.length).toBeGreaterThan(0);
      
      // Verifica se o overlay principal tem as classes corretas
      const mainOverlay = overlays.find(el => el.classList.contains('fixed'));
      expect(mainOverlay).toBeInTheDocument();
      expect(mainOverlay).toHaveClass('fixed', 'inset-0');
    });

    test('does not render when not visible', () => {
      render(<LoadingOverlay visible={false} />);
      
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    test('renders with custom text', () => {
      render(<LoadingOverlay visible text="Processando..." />);
      
      expect(screen.getByText('Processando...')).toBeInTheDocument();
    });
  });

  describe('LoadingSkeleton', () => {
    test('renders basic skeleton', () => {
      render(<LoadingSkeleton />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-300');
    });

    test('renders with custom className', () => {
      render(<LoadingSkeleton className="h-32 w-full" />);
      
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('h-32', 'w-full');
    });

    test('renders multiple lines', () => {
      render(<LoadingSkeleton lines={3} />);
      
      const skeletons = screen.getAllByTestId('skeleton');
      expect(skeletons).toHaveLength(3);
    });
  });
});