import { NextResponse } from 'next/server';
import { serverClient } from '@src/lib/sanity';

export const dynamic = 'force-dynamic';

export async function GET() {
  const query = `*[_type == "aula" && !(_id in path("drafts.**"))] | order(ordem asc, _createdAt asc) {
    _id,
    titulo,
    ordem,
    materia->{ titulo },
    "videoUrl": videoFile.asset->url
  }`;

  try {
    // Se o serverClient não estiver configurado, lançará um erro ou retornará vazio
    const data = await serverClient.fetch(query);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    // Em desenvolvimento local sem Sanity configurado, retornamos dados mock para permitir testes locais
    console.error('Erro ao buscar aulas no Sanity (server):', error?.message || error);

    const mock = [
      {
        _id: 'mock-1',
        titulo: 'Aula de demonstração: Introdução',
        ordem: 1,
        materia: { titulo: 'Introdução' },
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
      {
        _id: 'mock-2',
        titulo: 'Aula de demonstração: Anatomia básica',
        ordem: 2,
        materia: { titulo: 'Anatomia' },
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      },
    ];

    return NextResponse.json({ data: mock, warning: 'mocked' }, { status: 200 });
  }
}
