'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@src/lib/supabase';
import { logger } from '@/lib/logger.client';
import { analytics } from '@/lib/analytics';

export default function PagamentoInicialPage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // 1. Verificar quem é o usuário logado
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login'); // Se não tiver logado, manda pro login
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [router]);

  // 2. Função para criar o pagamento
  const handleCheckout = async () => {
  setLoading(true);
  
  try {
    logger.payment.initiated(user.id, 0.50);
    analytics.payment.initiated(0.50, 'premium');

    // Chama a nossa API
    const response = await fetch('/api/pagamento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
      }),
    });

    const data = await response.json();

    if (data.data?.init_point) {
      logger.info('Redirecionando para Mercado Pago', { userId: user.id });
      // Redireciona para o Mercado Pago
      window.location.href = data.data.init_point;
    } else {
      logger.error('Erro ao gerar link de pagamento', { userId: user.id, data });
      analytics.payment.failed('Link de pagamento não gerado');
      alert('Erro ao gerar link de pagamento');
    }
  } catch (error) {
    logger.error('Erro ao conectar com servidor', { error, userId: user.id });
    analytics.payment.failed('Erro de conexão');
    console.error(error);
    alert('Erro ao conectar com o servidor');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <span className="text-4xl">🔒</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Acesso Restrito
        </h1>
        
        <p className="text-gray-600 mb-8">
          Para acessar as aulas e materiais exclusivos da HealthMed, é necessário ativar sua assinatura.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg mb-8 text-left">
          <h3 className="font-semibold text-blue-900 mb-2">O que está incluído:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✅ Acesso às aulas</li>
            <li>✅ Materiais em PDF</li>
            <li>✅ Suporte exclusivo</li>
          </ul>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          {loading ? 'Carregando...' : 'Pagar Agora - R$ 0.10'}
        </button>
        
        <p className="mt-4 text-xs text-gray-400">
          Pagamento seguro processado pelo Mercado Pago
        </p>
      </div>
    </div>
  );
}