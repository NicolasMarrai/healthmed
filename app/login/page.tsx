// app/login/page.tsx

'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Conexão Supabase

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  
  // Verifica se já está logado
  useEffect(() => {
    setCarregando(false); // Apenas define que terminou de carregar
  }, []); 
  
  // Função para checar o status e redirecionar
  const checarStatusAssinatura = async (userId: string) => {
      console.log('Verificando usuário ID:', userId);
      
      const { data: userData, error: supabaseError } = await supabase
        .from('usuarios')
        .select('status_assinatura') 
        .eq('id', userId) 
        .single(); 

      console.log('Dados do usuário:', userData);
      console.log('Erro Supabase:', supabaseError);

      if (supabaseError || !userData) {
        console.log('Usuário não encontrado, redirecionando para pagamento');
        router.push('/pagamento-inicial'); 
        return;
      }

      //Verifica status (aceita 'ativo' ou 'ACTIVE')....
      const status = userData.status_assinatura?.toLowerCase();
      console.log('Status encontrado:', status);
      
      if (status === 'ativo' || status === 'active') {
        console.log('Status ativo! Redirecionando para dashboard');
        router.push('/dashboard'); 
      } else {
        console.log('Status inativo, redirecionando para pagamento');
        router.push('/pagamento-inicial'); 
      }
      setCarregando(false);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(''); 
    setCarregando(true);

    try {
      // 1. Tenta logar o usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (authError) {
        setErro(authError.message || 'E-mail ou senha incorretos.');
        setCarregando(false);
        return;
      }
      
      const userId = authData.user?.id;
      if (!userId) throw new Error("ID de usuário não encontrado após login.");

      // 2. Continua a checagem e redireciona
      await checarStatusAssinatura(userId);


    } catch (error: any) {
      setErro(error.message || 'Erro desconhecido durante o login.');
      setCarregando(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600">HealthMed - Login</h2>
        
        {/* EXIBIÇÃO DE ERRO */}
        {erro && (<div className="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">{erro}</div>)}
        
        {/* FORMULÁRIO COM CAMPOS INPUT CORRIGIDOS */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* CAMPO EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          
          {/* CAMPO SENHA */}
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
            <input id="senha" type="password" required value={senha} onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          
          <button type="submit" disabled={carregando}
            className={`w-full py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white ${
              carregando ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Não tem conta? <a href="/cadastro" className="font-medium text-blue-600 hover:text-blue-500">Fazer Cadastro</a>
        </p>
      </div>
    </div>
  );
}