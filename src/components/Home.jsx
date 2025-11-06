import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-green-500 bg-clip-text text-transparent">
              Sistema de Gestión
            </span>
            <br />
            <span className="text-gray-800">de Cursos Online</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Administra categorías y cursos de manera sencilla y eficiente.
            <br />
            <span className="text-green-600 font-bold">Aprende, crea y crece sin límites</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
            <div className="flex items-center gap-2 bg-white shadow-lg px-3 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-green-200">
              <span className="text-green-500 text-xl sm:text-2xl">✓</span>
              <span className="text-gray-700 font-medium text-sm sm:text-base">Gestión Completa</span>
            </div>
            <div className="flex items-center gap-2 bg-white shadow-lg px-3 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-sky-200">
              <span className="text-sky-500 text-xl sm:text-2xl">✓</span>
              <span className="text-gray-700 font-medium text-sm sm:text-base">Interfaz Moderna</span>
            </div>
            <div className="flex items-center gap-2 bg-white shadow-lg px-3 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-purple-200">
              <span className="text-purple-500 text-xl sm:text-2xl">✓</span>
              <span className="text-gray-700 font-medium text-sm sm:text-base">Fácil de Usar</span>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
          {/* Tarjeta de Categorías */}
          <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-blue-100 hover:border-sky-400 transition-all duration-300 hover-lift shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl sm:rounded-2xl mb-4 shadow-lg">
                  <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                  Categorías
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Organiza tus cursos por categorías temáticas
                </p>
              </div>
              <div className="space-y-3">
                <Link
                  to="/categorias"
                  className="block w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold py-3 px-6 rounded-xl text-center transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Ver Categorías →
                </Link>
                <Link
                  to="/categorias/nueva"
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl text-center transition-all border-2 border-gray-200 hover:border-sky-400 text-sm sm:text-base"
                >
                  + Nueva Categoría
                </Link>
              </div>
            </div>
          </div>

          {/* Tarjeta de Cursos */}
          <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-green-100 hover:border-green-400 transition-all duration-300 hover-lift shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl mb-4 shadow-lg">
                  <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                  Cursos
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Crea y administra todos tus cursos online
                </p>
              </div>
              <div className="space-y-3">
                <Link
                  to="/cursos"
                  className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl text-center transition-all shadow-lg hover:shadow-xl"
                >
                  Ver Cursos →
                </Link>
                <Link
                  to="/cursos/nuevo"
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl text-center transition-all border-2 border-gray-200 hover:border-green-400"
                >
                  + Nuevo Curso
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white shadow-xl border-2 border-blue-100 rounded-2xl p-6 text-center hover-lift">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">
              100+
            </div>
            <div className="text-gray-600 font-medium">Cursos Disponibles</div>
          </div>
          <div className="bg-white shadow-xl border-2 border-green-100 rounded-2xl p-6 text-center hover-lift">
            <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              20+
            </div>
            <div className="text-gray-600 font-medium">Categorías</div>
          </div>
          <div className="bg-white shadow-xl border-2 border-purple-100 rounded-2xl p-6 text-center hover-lift">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-600 font-medium">Acceso Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;