'use client';

import { useState } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = 'md', color = 'primary', className = '', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  return (
    <div role="status" aria-label="Carregando" className="flex items-center space-x-2">
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && <span className="text-sm">{text}</span>}
    </div>
  );
}

interface LoadingButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

export function LoadingButton({ 
  loading = false,
  loadingText,
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '' 
}: LoadingButtonProps) {
  const baseClasses = "flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {loading && <LoadingSpinner size="sm" color="white" className="mr-2" />}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}

interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
}

export function LoadingOverlay({ visible, text = 'Carregando...' }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div 
      role="status"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
        <LoadingSpinner />
        <span className="text-lg font-medium">{text}</span>
      </div>
    </div>
  );
}

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({ className = 'h-4', lines = 1 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          data-testid="skeleton"
          className={`animate-pulse bg-gray-300 rounded ${className}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </>
  );
}

// Hook customizado para estados de loading
export function useLoading(initialState = false) {
  const [loading, setLoading] = useState(initialState);

  const withLoading = async (asyncFunction: () => Promise<any>) => {
    setLoading(true);
    try {
      await asyncFunction();
    } catch (error) {
      console.error('Erro na operação:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, setLoading, withLoading };
}