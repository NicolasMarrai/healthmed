'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation - Mobile First */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo - Otimizado para mobile */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image 
                  src="/favicon-192x192.png" 
                  alt="HealthMed Logo" 
                  width={40} 
                  height={40} 
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <span className="text-xl sm:text-2xl font-bold" style={{ color: '#000033' }}>HealthMed</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <Link 
                href="/login" 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ color: '#5C9EAD' }}
              >
                Entrar
              </Link>
              <Link 
                href="/cadastro" 
                className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                style={{ backgroundColor: '#4DD0E1' }}
              >
                Começar Agora
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Abrir menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link 
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link 
                  href="/cadastro"
                  className="block px-3 py-2 text-base font-medium text-white rounded-md transition-all text-center hover:shadow-md"
                  style={{ backgroundColor: '#4DD0E1' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Começar Agora
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section - Mobile First */}
      <section className="px-3 py-12 sm:py-16 lg:py-20" style={{ background: 'linear-gradient(135deg, #E8F5F7 0%, #ffffff 100%)' }}>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: '#000033' }}>
              Transforme sua
              <br className="sm:hidden" />
              <span style={{ color: '#4DD0E1' }}> Educação Médica</span>
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0" style={{ color: '#5C9EAD' }}>
              Acesse conteúdo médico de alta qualidade, desenvolvido por alunos. 
              Estude no seu ritmo e acelere sua carreira na área da saúde.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link 
                href="/cadastro" 
                className="w-full sm:w-auto text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all shadow-lg hover:shadow-xl text-center"
                style={{ backgroundColor: '#4DD0E1' }}
              >
                Começar Gratuitamente
              </Link>
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all text-center border-2 hover:shadow-md"
                style={{ borderColor: '#4DD0E1', color: '#000033' }}
              >
                Já tenho conta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile First */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4" style={{ color: '#000033' }}>
              Por que escolher o HealthMed?
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4 sm:px-0" style={{ color: '#5C9EAD' }}>
              Nossa plataforma foi desenvolvida especificamente para alunos que desejam se tornar ótimos profissionais da saúde
            </p>
          </div>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-6 sm:p-8 rounded-xl border transition-all bg-white hover:shadow-xl" style={{ borderColor: '#E8F5F7' }}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#E8F5F7' }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="#4DD0E1" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: '#000033' }}>Conteúdo Especializado</h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#5C9EAD' }}>
                Aulas desenvolvidas por alunos especialistas, com conteúdos atualizados continuamente.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-xl border transition-all bg-white hover:shadow-xl" style={{ borderColor: '#E8F5F7' }}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#E8F5F7' }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="#40C4FF" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: '#000033' }}>Aprenda no Seu Ritmo</h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#5C9EAD' }}>
                Estude quando e onde quiser, no computador ou celular.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-xl border transition-all bg-white md:col-span-2 lg:col-span-1 hover:shadow-xl" style={{ borderColor: '#E8F5F7' }}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#E8F5F7' }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="#6BA3BE" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: '#000033' }}>Suporte Especializado</h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#5C9EAD' }}>
                Tire suas dúvidas com profissionais da saúde e tenha apoio durante todo o aprendizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Mobile First */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#E8F5F7' }}>
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4" style={{ color: '#000033' }}>
              Como funciona
            </h2>
            <p className="text-lg sm:text-xl" style={{ color: '#5C9EAD' }}>
              Simples e rápido para começar
            </p>
          </div>
          
          <div className="space-y-8 sm:space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold" style={{ backgroundColor: '#4DD0E1' }}>
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#000033' }}>Crie sua conta</h3>
              <p className="text-sm sm:text-base px-4 sm:px-0" style={{ color: '#5C9EAD' }}>Cadastre-se gratuitamente e acesse nossa plataforma</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold" style={{ backgroundColor: '#40C4FF' }}>
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#000033' }}>Escolha seu plano</h3>
              <p className="text-sm sm:text-base px-4 sm:px-0" style={{ color: '#5C9EAD' }}>Selecione a assinatura que melhor se adapta às suas necessidades</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold" style={{ backgroundColor: '#6BA3BE' }}>
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#000033' }}>Comece a estudar</h3>
              <p className="text-sm sm:text-base px-4 sm:px-0" style={{ color: '#5C9EAD' }}>Acesse todo o conteúdo e comece sua jornada de aprendizado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: '#000033' }}>
              Plano Simples e Transparente
            </h2>
            <p className="text-lg sm:text-xl px-4 sm:px-0" style={{ color: '#5C9EAD' }}>
              Acesso completo por um preço justo
            </p>
          </div>
          
          <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white text-center shadow-2xl mx-2 sm:mx-0" style={{ background: 'linear-gradient(135deg, #000033 0%, #00004D 100%)' }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Plano Premium</h3>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base" style={{ color: '#E8F5F7' }}>Acesso completo à plataforma</p>
            <div className="mb-6 sm:mb-8">
              <span className="text-4xl sm:text-5xl font-bold">R$ 10</span>
              <span className="text-lg sm:text-xl" style={{ color: '#E8F5F7' }}>/mês</span>
            </div>
            <ul className="text-left mb-6 sm:mb-8 space-y-3 max-w-sm mx-auto">
              <li className="flex items-center text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" fill="#4DD0E1" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Acesso a todas as aulas e cursos
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" fill="#4DD0E1" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Certificados de conclusão
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" fill="#4DD0E1" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Suporte prioritário
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" fill="#4DD0E1" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Atualizações contínuas
              </li>
            </ul>
            <Link 
              href="/cadastro" 
              className="block w-full bg-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all touch-manipulation min-h-[48px] flex items-center justify-center hover:shadow-lg"
              style={{ color: '#000033' }}
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-8 sm:py-12" style={{ backgroundColor: '#000033' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Image 
                  src="/favicon-192x192.png" 
                  alt="HealthMed Logo" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">HealthMed</span>
              </div>
              <p className="text-sm sm:text-base max-w-xs" style={{ color: '#6BA3BE' }}>
                Transformando a educação médica através da tecnologia.
              </p>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Plataforma</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <Link 
                    href="/dashboard" 
                    className="hover:text-white transition-colors py-1 block touch-manipulation"
                  >
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/login" 
                    className="hover:text-white transition-colors py-1 block touch-manipulation"
                  >
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/cadastro" 
                    className="hover:text-white transition-colors py-1 block touch-manipulation"
                  >
                    Cadastrar
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors py-1 block touch-manipulation"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors py-1 block touch-manipulation"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors py-1 block touch-manipulation"
                  >
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors py-1 block touch-manipulation"
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors py-1 block touch-manipulation"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition-colors py-1 block touch-manipulation"
                  >
                    Carreiras
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2026 HealthMed. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
