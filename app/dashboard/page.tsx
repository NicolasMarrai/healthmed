import { client } from "@/lib/sanity"; // Importa nosso carteiro
import { supabase } from "@/lib/supabase"; // Para proteger a rota futuramente

// Esta interface define o formato dos dados que esperamos receber
interface Aula {
  _id: string;
  titulo: string;
  videoUrl: string;
}

// Função que vai buscar os dados no Sanity
async function getAulas() {
  // A QUERY MÁGICA (GROQ):
  // 1. *[_type == "aula"] -> Pegue todos os documentos do tipo "aula"
  // 2. videoFile.asset->url -> O "->" significa "siga o link do arquivo e me dê a URL dele"
  const query = `*[_type == "aula"] | order(_createdAt asc) {
    _id,
    titulo,
    "videoUrl": videoFile.asset->url
  }`;

  return await client.fetch(query);
}

export default async function DashboardPage() {
  // 1. Buscamos as aulas (Isso roda no servidor, é super rápido)
  const aulas: Aula[] = await getAulas();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabeçalho Simples */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            HealthMed - Meus Cursos
          </h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Grade de Aulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {aulas.map((aula) => (
              <div key={aula._id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {aula.titulo}
                  </h3>
                  
                  {/* O PLAYER DE VÍDEO HTML5 PADRÃO */}
                  {aula.videoUrl ? (
                    <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                      <video 
                        controls 
                        className="w-full h-full object-contain"
                        src={aula.videoUrl}
                        poster="https://via.placeholder.com/640x360?text=HealthMed" // Capa temporária
                      >
                        Seu navegador não suporta a tag de vídeo.
                      </video>
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                      <span className="text-gray-500">Vídeo indisponível</span>
                    </div>
                  )}
                  
                </div>
              </div>
            ))}

            {aulas.length === 0 && (
              <p className="text-gray-500 col-span-3 text-center py-10">
                Nenhuma aula encontrada. Vá ao Sanity e publique uma aula!
              </p>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}