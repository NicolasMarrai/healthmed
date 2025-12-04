'use client';

import { useEffect, useState } from 'react';
import { client } from "@src/lib/sanity";
import { analytics } from '@/lib/analytics';

interface Aula {
  _id: string;
  titulo: string;
  videoUrl: string;
  ordem?: number;
  materia?: {
    titulo: string;
  };
}

export default function DashboardPage() {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAulas = async () => {
      try {
        console.log('🔍 Iniciando busca de aulas...');
        
        // Query GROQ corrigida
        const query = `*[_type == "aula" && !(_id in path("drafts.**"))] | order(ordem asc, _createdAt asc) {
          _id,
          titulo,
          ordem,
          materia->{
            titulo
          },
          "videoUrl": videoFile.asset->url
        }`;
        
        console.log('🔍 Executando query...');
        
        const data = await client.fetch(query);
        
        console.log('✅ Dados recebidos:', data);
        console.log('📊 Quantidade de aulas:', data.length);
        
        setAulas(data);
        analytics.page.view('Dashboard');
      } catch (error) {
        console.error('❌ Erro ao carregar aulas:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    loadAulas();
  }, []);

  const handleVideoPlay = (aula: Aula) => {
    console.log('▶️ Vídeo iniciado:', aula.titulo);
    analytics.content.videoStarted(aula._id, aula.titulo);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-bold mb-2">Erro ao carregar aulas</h2>
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabeçalho */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            HealthMed - Meus Cursos
          </h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 mt-4">Carregando aulas...</p>
            </div>
          ) : (
            <>
              {aulas.length === 0 ? (
                <div className="text-center py-20">
                  <div className="mb-4">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma aula disponível</h3>
                  <p className="text-gray-500 mb-4">
                    As aulas ainda estão sendo preparadas.
                  </p>
                  <p className="text-sm text-gray-400">
                    Entre em contato com o suporte se você já deveria ter acesso.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aulas.map((aula) => (
                    <div key={aula._id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
                      <div className="p-5">
                        {/* Badge da matéria (se tiver) */}
                        {aula.materia?.titulo && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                            {aula.materia.titulo}
                          </span>
                        )}
                        
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                          {aula.titulo}
                        </h3>
                        
                        {aula.videoUrl ? (
                          <div className="aspect-video bg-black rounded-lg overflow-hidden">
                            <video 
                              controls 
                              className="w-full h-full"
                              src={aula.videoUrl}
                              poster="https://via.placeholder.com/640x360?text=HealthMed"
                              onPlay={() => handleVideoPlay(aula)}
                              preload="metadata"
                            >
                              Seu navegador não suporta a tag de vídeo.
                            </video>
                          </div>
                        ) : (
                          <div className="aspect-video bg-gray-200 flex items-center justify-center rounded-lg">
                            <div className="text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span className="text-gray-500 text-sm mt-2 block">Vídeo indisponível</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}