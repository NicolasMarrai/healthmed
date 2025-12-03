'use client';

import Link from "next/link";
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
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">HealthMed</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Entrar
              </Link>
              <Link 
                href="/cadastro" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
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
                  className="block px-3 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors text-center"
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
      <section className="px-3 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Transforme sua
              <br className="sm:hidden" />
              <span className="text-blue-600"> Educação Médica</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Acesse conteúdo médico de alta qualidade, desenvolvido por especialistas. 
              Estude no seu ritmo e acelere sua carreira na área da saúde.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link 
                href="/cadastro" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors shadow-lg text-center"
              >
                Começar Gratuitamente
              </Link>
              <Link 
                href="/login" 
                className="w-full sm:w-auto border border-gray-300 hover:border-gray-400 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors text-center"
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Por que escolher o HealthMed?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Nossa plataforma foi desenvolvida especificamente para profissionais da saúde
            </p>
          </div>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-6 sm:p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow bg-white">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Conteúdo Especializado</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Aulas desenvolvidas por médicos especialistas e atualizadas com as últimas evidências científicas.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow bg-white">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Aprenda no Seu Ritmo</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Acesso 24/7 ao conteúdo. Estude quando e onde quiser, no computador ou celular.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow bg-white md:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Certificação Reconhecida</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Receba certificados de conclusão validados e reconhecidos na área médica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Mobile First */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Como funciona
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Simples e rápido para começar
            </p>
          </div>
          
          <div className="space-y-8 sm:space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Crie sua conta</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4 sm:px-0">Cadastre-se gratuitamente e acesse nossa plataforma</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Escolha seu plano</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4 sm:px-0">Selecione a assinatura que melhor se adapta às suas necessidades</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Comece a estudar</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4 sm:px-0">Acesse todo o conteúdo e comece sua jornada de aprendizado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Plano Simples e Transparente
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4 sm:px-0">
              Acesso completo por um preço justo
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white text-center shadow-2xl mx-2 sm:mx-0">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Plano Premium</h3>
            <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">Acesso completo à plataforma</p>
            <div className="mb-6 sm:mb-8">
              <span className="text-4xl sm:text-5xl font-bold">R$ 10</span>
              <span className="text-lg sm:text-xl text-blue-100">/mês</span>
            </div>
            <ul className="text-left mb-6 sm:mb-8 space-y-3 max-w-sm mx-auto">
              <li className="flex items-center text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Acesso a todas as aulas e cursos
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Certificados de conclusão
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Suporte prioritário
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Atualizações contínuas
              </li>
            </ul>
            <Link 
              href="/cadastro" 
              className="block w-full bg-white text-blue-600 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-50 transition-colors touch-manipulation min-h-[48px] flex items-center justify-center"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-xl font-bold">HealthMed</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base max-w-xs">
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
