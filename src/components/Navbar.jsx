import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-sky-500 to-green-500 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-white font-bold text-lg sm:text-xl hover:scale-105 transition-transform">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="white" opacity="0.9"/>
              </svg>
              <span className="text-white drop-shadow-lg hidden xs:inline">
                CastroPlataforma
              </span>
              <span className="text-white drop-shadow-lg xs:hidden">
                Castro
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              🏠 Inicio
            </Link>
            <Link
              to="/categorias"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/categorias')
                  ? 'bg-white text-sky-600 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              📁 Categorías
            </Link>
            <Link
              to="/cursos"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/cursos')
                  ? 'bg-white text-green-600 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              📚 Cursos
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/20 p-2 rounded-lg focus:outline-none transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-lg mb-2 mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-all ${
                  isActive('/')
                    ? 'bg-white text-blue-600'
                    : 'text-white hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Inicio
              </Link>
              <Link
                to="/categorias"
                className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-all ${
                  isActive('/categorias')
                    ? 'bg-white text-sky-600'
                    : 'text-white hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                📁 Categorías
              </Link>
              <Link
                to="/cursos"
                className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-all ${
                  isActive('/cursos')
                    ? 'bg-white text-green-600'
                    : 'text-white hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                📚 Cursos
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;