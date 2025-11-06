import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-msn0.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios para Categorías
export const categoriasAPI = {
  // Obtener todas las categorías
  getAll: () => api.get('/categorias/'),
  
  // Obtener una categoría por ID
  getById: (id) => api.get(`/categorias/${id}/`),
  
  // Crear una nueva categoría
  create: (categoria) => {
    const formData = new FormData();
    Object.keys(categoria).forEach(key => {
      if (categoria[key] !== null && categoria[key] !== undefined) {
        formData.append(key, categoria[key]);
      }
    });
    return api.post('/categorias/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Actualizar una categoría
  update: (id, categoria) => {
    const formData = new FormData();
    Object.keys(categoria).forEach(key => {
      if (categoria[key] !== null && categoria[key] !== undefined) {
        formData.append(key, categoria[key]);
      }
    });
    return api.put(`/categorias/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Eliminar una categoría
  delete: (id) => api.delete(`/categorias/${id}/`),
};

// Servicios para Cursos
export const cursosAPI = {
  // Obtener todos los cursos
  getAll: () => api.get('/cursos/'),
  
  // Obtener un curso por ID
  getById: (id) => api.get(`/cursos/${id}/`),
  
  // Crear un nuevo curso
  create: (curso) => {
    const formData = new FormData();
    Object.keys(curso).forEach(key => {
      if (curso[key] !== null && curso[key] !== undefined) {
        formData.append(key, curso[key]);
      }
    });
    return api.post('/cursos/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Actualizar un curso
  update: (id, curso) => {
    const formData = new FormData();
    Object.keys(curso).forEach(key => {
      if (curso[key] !== null && curso[key] !== undefined) {
        formData.append(key, curso[key]);
      }
    });
    return api.put(`/cursos/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Eliminar un curso
  delete: (id) => api.delete(`/cursos/${id}/`),
  
  // Obtener cursos por categoría
  getByCategoria: (categoriaId) => api.get(`/cursos/categoria/${categoriaId}/`),
};

export default api;