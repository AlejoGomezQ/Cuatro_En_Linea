import './App.css'
import AppLayout from './components/layout/AppLayout'
import { GameProvider } from './context/GameContext'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Login from './screens/Login'
import Register from './screens/Register'
import About from './screens/About'

// Importando módulos de Firebase
import appFirebase from './credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

const auth = getAuth(appFirebase)

function App() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState(null)

  return (
    <div className="h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700 flex flex-col items-center justify-between p-4 overflow-hidden">
      <GameProvider>
        <Router>
          <AuthRedirect setUser={setUser} setEmail={setEmail} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/game" element={<AppLayout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<div className="text-white">404 - Página no encontrada</div>} />

          </Routes>
        </Router>
      </GameProvider>
    </div>
  )
}

// 
function AuthRedirect({ setUser, setEmail }) {
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setEmail(user.email);
        // Solo permite acceso si el correo está verificado
        if (user.emailVerified) {
          navigate('/game', { replace: true });
        } else {
          // Si no está verificado, cierra sesión y muestra mensaje
          auth.signOut();
          alert('Por favor, verifica tu correo electrónico antes de iniciar sesión.');
          navigate('/', { replace: true });
        }
      } else {
        setEmail(null);
        if (location.pathname !== '/register') {
          navigate('/', { replace: true });
        }

        if (location.pathname === '/about') return;

      }
    });
    return () => unsubscribe();
  }, [navigate, setUser, setEmail, location.pathname])

  return null
}

export default App
