import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListaCategorias from './components/ListaCategorias';
import FormCategoria from './components/FormCategoria';
import ListaCursos from './components/ListaCursos';
import FormCurso from './components/FormCurso';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Rutas de Categorías */}
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/categorias/nueva" element={<FormCategoria />} />
            <Route path="/categorias/editar/:id" element={<FormCategoria />} />
            
            {/* Rutas de Cursos */}
            <Route path="/cursos" element={<ListaCursos />} />
            <Route path="/cursos/nuevo" element={<FormCurso />} />
            <Route path="/cursos/editar/:id" element={<FormCurso />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
