import React, { useState, useEffect } from 'react';
import { categoriasAPI } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const FormCategoria = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenActual, setImagenActual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchCategoria();
    }
  }, [id]);

  const fetchCategoria = async () => {
    try {
      setLoading(true);
      const response = await categoriasAPI.getById(id);
      setFormData({
        nombre: response.data.nombre,
        descripcion: response.data.descripcion
      });
      if (response.data.imagen) {
        setImagenActual(response.data.imagen);
      }
      setError(null);
    } catch (err) {
      setError('Error al cargar la categoría');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData.nombre.trim() || !formData.descripcion.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      const dataToSubmit = { ...formData };
      if (imagen) {
        dataToSubmit.imagen = imagen;
      }
      if (isEditing) {
        await categoriasAPI.update(id, dataToSubmit);
      } else {
        await categoriasAPI.create(dataToSubmit);
      }
      navigate('/categorias');
    } catch (err) {
      setError(isEditing ? 'Error al actualizar la categoría' : 'Error al crear la categoría');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Cargando categoría...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
          </h1>
          <button
            onClick={() => navigate('/categorias')}
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
                Nombre de la Categoría *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ej: Programación, Diseño, Marketing..."
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
                Descripción *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Describe el tipo de cursos que incluirá esta categoría..."
                required
              />
            </div>

            <div className="mb-6">
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
                onClick={() => navigate('/categorias')}
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

export default FormCategoria;