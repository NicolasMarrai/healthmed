// app/cadastro/page.tsx

'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Conexão Supabase......

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      // 1. Tenta criar o usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          // Passa o nome para ser usado pelo Trigger SQL (Passo 5)
          data: { nome: nome }, 
        },
      });

      if (authError) {
        // Exibe a mensagem de erro do Supabase (ex: "Anonymous sign-ins are disabled")
        setErro(authError.message || 'Erro no cadastro. Verifique a senha (mínimo 6 caracteres)');
        setCarregando(false);
        return;
      }
      
      // Se o cadastro Auth for um sucesso, redireciona para o pagamento.
      router.push('/pagamento-inicial'); 

    } catch (error: any) {
      console.error(error);
      setErro('Erro desconhecido durante o cadastro.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600">HealthMed - Cadastro</h2>
        
        {/* EXIBIÇÃO DE ERRO */}
        {erro && (
            <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                {erro}
            </div>
        )}

        {/* FORMULÁRIO COM CAMPOS INPUT CORRIGIDOS */}
        <form onSubmit={handleCadastro} className="space-y-4">
          
          {/* CAMPO NOME */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input id="nome" type="text" required value={nome} onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          {/* CAMPO EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          {/* CAMPO SENHA */}
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha (mín. 6 caracteres)</label>
            <input id="senha" type="password" required value={senha} onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          <button type="submit" disabled={carregando}
            className={`w-full py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white ${
              carregando ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {carregando ? 'Cadastrando...' : 'Cadastrar e Ir para o Pagamento'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Já tem conta? <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">Fazer Login</a>
        </p>
      </div>
    </div>
  );
}