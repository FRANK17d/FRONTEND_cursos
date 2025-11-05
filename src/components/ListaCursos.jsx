import React, { useState, useEffect } from 'react';
import { cursosAPI, categoriasAPI } from '../services/api';
import { Link } from 'react-router-dom';

const ListaCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    fetchCursos();
    fetchCategorias();
  }, []);

  const fetchCursos = async () => {
    try {
      setLoading(true);
      const response = await cursosAPI.getAll();
      setCursos(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los cursos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await categoriasAPI.getAll();
      setCategorias(response.data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      try {
        await cursosAPI.delete(id);
        setCursos(cursos.filter(curso => curso.id !== id));
      } catch (err) {
        setError('Error al eliminar el curso');
        console.error('Error:', err);
      }
    }
  };

  const handleFiltroCategoria = async (categoriaId) => {
    try {
      setLoading(true);
      if (categoriaId === '') {
        const response = await cursosAPI.getAll();
        setCursos(response.data);
      } else {
        const response = await cursosAPI.getByCategoria(categoriaId);
        setCursos(response.data);
      }
      setFiltroCategoria(categoriaId);
      setError(null);
    } catch (err) {
      setError('Error al filtrar cursos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getNombreCategoria = (categoriaId) => {
    const categoria = categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  };

  const getNivelLabel = (nivel) => {
    const niveles = {
      'principiante': 'Principiante',
      'intermedio': 'Intermedio',
      'avanzado': 'Avanzado'
    };
    return niveles[nivel] || nivel;
  };

  const getNivelColor = (nivel) => {
    const colores = {
      'principiante': 'bg-green-100 text-green-700 border-2 border-green-300',
      'intermedio': 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300',
      'avanzado': 'bg-red-100 text-red-700 border-2 border-red-300'
    };
    return colores[nivel] || 'bg-gray-100 text-gray-700 border-2 border-gray-300';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Cargando cursos...</span>
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Cursos</h1>
          <p className="text-gray-600">Administra todos tus cursos disponibles</p>
        </div>
        <Link 
          to="/cursos/nuevo" 
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 hover:scale-105"
        >
          <span className="text-2xl">+</span>
          Nuevo Curso
        </Link>
      </div>

      {/* Filtro por categoría */}
      <div className="mb-8 bg-white shadow-lg border-2 border-gray-200 rounded-2xl p-6">
        <label htmlFor="filtro" className="block text-gray-800 text-sm font-bold mb-3 flex items-center gap-2">
          <span className="text-xl">🔍</span>
          Filtrar por categoría:
        </label>
        <select
          id="filtro"
          value={filtroCategoria}
          onChange={(e) => handleFiltroCategoria(e.target.value)}
          className="w-full md:w-64 bg-gray-50 border-2 border-gray-300 rounded-xl py-3 px-4 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      {cursos.length === 0 ? (
        <div className="bg-white shadow-xl border-2 border-gray-200 text-gray-600 px-6 py-16 rounded-2xl text-center">
          <div className="text-7xl mb-4">📚</div>
          <p className="text-2xl font-bold text-gray-800 mb-2">No hay cursos registrados</p>
          <p className="text-gray-500">Crea tu primer curso para empezar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <div key={curso.id} className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-green-400 transition-all hover-lift shadow-lg flex flex-col">
              {curso.imagen && (
                <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100">
                  <img 
                    src={curso.imagen} 
                    alt={curso.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors flex-1">
                    {curso.nombre}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${getNivelColor(curso.nivel)}`}>
                    {getNivelLabel(curso.nivel)}
                  </span>
                </div>
                
                {curso.descripcion && (
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {curso.descripcion.length > 100 
                      ? `${curso.descripcion.substring(0, 100)}...` 
                      : curso.descripcion}
                  </p>
                )}
                
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex justify-between text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="text-gray-600 font-medium">👨‍🏫 Instructor:</span>
                    <span className="text-gray-800 font-semibold">{curso.instructor}</span>
                  </div>
                  <div className="flex justify-between text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="text-gray-600 font-medium">⏱️ Duración:</span>
                    <span className="text-gray-800 font-semibold">{curso.duracion} horas</span>
                  </div>
                  <div className="flex justify-between text-sm bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-2 border-green-200">
                    <span className="text-gray-600 font-medium">💰 Precio:</span>
                    <span className="text-green-700 font-bold text-base">S/. {curso.precio}</span>
                  </div>
                  <div className="flex justify-between text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="text-gray-600 font-medium">📁 Categoría:</span>
                    <span className="text-sky-600 font-semibold">
                      {getNombreCategoria(curso.categoria)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="text-gray-600 font-medium">Estado:</span>
                    <span className={`font-bold ${curso.activo ? 'text-green-600' : 'text-red-600'}`}>
                      {curso.activo ? '✓ Activo' : '✗ Inactivo'}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    ID: {curso.id}
                  </span>
                  <div className="flex gap-2">
                    <Link to={`/cursos/editar/${curso.id}`} className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all shadow-md hover:shadow-lg">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(curso.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all shadow-md hover:shadow-lg"
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

export default ListaCursos;