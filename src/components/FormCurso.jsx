import React, { useState, useEffect } from 'react';
import { cursosAPI, categoriasAPI } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const FormCurso = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    duracion: '',
    precio: '',
    instructor: '',
    nivel: 'principiante',
    categoria: '',
    activo: true
  });
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenActual, setImagenActual] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCategorias();
    if (id) {
      setIsEditing(true);
      fetchCurso();
    }
  }, [id]);

  const fetchCategorias = async () => {
    try {
      const response = await categoriasAPI.getAll();
      setCategorias(response.data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const fetchCurso = async () => {
    try {
      setLoading(true);
      const response = await cursosAPI.getById(id);
      const curso = response.data;
      setFormData({
        nombre: curso.nombre || '',
        descripcion: curso.descripcion || '',
        duracion: curso.duracion || '',
        precio: curso.precio || '',
        instructor: curso.instructor || '',
        nivel: curso.nivel || 'principiante',
        categoria: curso.categoria || '',
        activo: curso.activo !== undefined ? curso.activo : true
      });
      if (curso.imagen) {
        setImagenActual(curso.imagen);
      }
      setError(null);
    } catch (err) {
      setError('Error al cargar el curso');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim() || !formData.instructor.trim() || !formData.categoria) {
      setError('Por favor completa los campos obligatorios');
      return;
    }

    if (!formData.duracion || formData.duracion <= 0) {
      setError('La duración debe ser mayor a 0');
      return;
    }

    if (!formData.precio || formData.precio <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    try {
      setLoading(true);
      const dataToSubmit = {
        ...formData,
        duracion: parseInt(formData.duracion),
        precio: parseFloat(formData.precio)
      };
      if (imagen) {
        dataToSubmit.imagen = imagen;
      }
      
      if (isEditing) {
        await cursosAPI.update(id, dataToSubmit);
      } else {
        await cursosAPI.create(dataToSubmit);
      }
      navigate('/cursos');
    } catch (err) {
      setError(isEditing ? 'Error al actualizar el curso' : 'Error al crear el curso');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Cargando curso...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {isEditing ? 'Editar Curso' : 'Nuevo Curso'}
          </h1>
          <button
            onClick={() => navigate('/cursos')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Volver
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
                Nombre del Curso *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ej: Python para Principiantes"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Describe el contenido del curso..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="duracion" className="block text-gray-700 text-sm font-bold mb-2">
                  Duración (horas) *
                </label>
                <input
                  type="number"
                  id="duracion"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleChange}
                  min="1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="40"
                  required
                />
              </div>

              <div>
                <label htmlFor="precio" className="block text-gray-700 text-sm font-bold mb-2">
                  Precio (S/) *
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="99.99"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="instructor" className="block text-gray-700 text-sm font-bold mb-2">
                Instructor *
              </label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nombre del instructor"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="nivel" className="block text-gray-700 text-sm font-bold mb-2">
                  Nivel *
                </label>
                <select
                  id="nivel"
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>

              <div>
                <label htmlFor="categoria" className="block text-gray-700 text-sm font-bold mb-2">
                  Categoría *
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="imagen" className="block text-gray-700 text-sm font-bold mb-2">
                Imagen
              </label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {imagenPreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                  <img src={imagenPreview} alt="Preview" className="max-w-xs rounded shadow" />
                </div>
              )}
              {!imagenPreview && imagenActual && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
                  <img src={imagenActual} alt="Actual" className="max-w-xs rounded shadow" />
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm font-bold">Curso activo</span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/cursos')}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCurso;