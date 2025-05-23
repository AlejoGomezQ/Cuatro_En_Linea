import './App.css'
import AppLayout from './components/layout/AppLayout'
import { GameProvider } from './context/GameContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login'; // Importa la pantalla de Login
import Register from './screens/Register'; // Importa la pantalla de registro

function App() {
  return (
    <div className="h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700 flex flex-col items-center justify-between p-4 overflow-hidden">
      <GameProvider>
        <Router>
            <Routes>
              <Route path="/" element={<Login />} /> {/* Ruta para la pantalla de Login */}
              <Route path="/game" element={<AppLayout />} /> {/* Ruta para la pantalla del juego */}
              <Route path="/register" element={<Register />} /> {/* Ruta para la pantalla de registro */}
            </Routes>
          </Router>
      </GameProvider>
    </div>
  );
}

export default App
