import React, { useState, useEffect } from 'react';
import { categoriasAPI } from '../services/api';
import { Link } from 'react-router-dom';

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const response = await categoriasAPI.getAll();
      setCategorias(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las categorías');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      try {
        await categoriasAPI.delete(id);
        setCategorias(categorias.filter(cat => cat.id !== id));
      } catch (err) {
        setError('Error al eliminar la categoría');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Cargando categorías...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-2 border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">Categorías</h1>
          <p className="text-sm sm:text-base text-gray-600">Gestiona todas las categorías de tus cursos</p>
        </div>
        <Link 
          to="/categorias/nueva" 
          className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-3 px-6 sm:px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 hover:scale-105 text-sm sm:text-base"
        >
          <span className="text-xl sm:text-2xl">+</span>
          Nueva Categoría
        </Link>
      </div>

      {categorias.length === 0 ? (
        <div className="bg-white shadow-xl border-2 border-gray-200 text-gray-600 px-4 sm:px-6 py-12 sm:py-16 rounded-2xl text-center">
          <div className="text-5xl sm:text-7xl mb-4">📁</div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No hay categorías registradas</p>
          <p className="text-sm sm:text-base text-gray-500">Crea tu primera categoría para empezar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-sky-400 transition-all hover-lift shadow-lg">
              {categoria.imagen_url && (
                <div className="w-full h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-sky-100 to-blue-100">
                  <img 
                    src={categoria.imagen_url} 
                    alt={categoria.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors">
                  {categoria.nombre}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                  {categoria.descripcion}
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t-2 border-gray-100 gap-3 sm:gap-0">
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">
                    ID: {categoria.id}
                  </span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Link 
                      to={`/categorias/editar/${categoria.id}`} 
                      className="flex-1 sm:flex-none bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-all shadow-md hover:shadow-lg text-center"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(categoria.id)}
                      className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-all shadow-md hover:shadow-lg"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaCategorias;