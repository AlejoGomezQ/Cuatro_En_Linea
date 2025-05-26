import './App.css'
import AppLayout from './components/layout/AppLayout'
import { GameProvider } from './context/GameContext'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Login from './screens/Login'
import Register from './screens/Register'
import About from './screens/About'
import Help from './screens/Help';
import Information from './screens/Information';
import { SoundProvider } from './context/SoundContext';


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
      <SoundProvider>
      <GameProvider>
      <Router>
          <AuthRedirect setUser={setUser} setEmail={setEmail} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/game" element={<AppLayout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/information" element={<Information />} />
            <Route path="*" element={<div className="text-white">404 - Página no encontrada</div>} />
          </Routes>  
          </Router> 
      </GameProvider>
      </SoundProvider>

      
    </div>
  )
}

// --- Redirección automática según autenticación y ruta ---
function AuthRedirect({ setUser, setEmail }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setEmail(user.email);
        if (user.emailVerified) {
          // El usuario autenticado y verificado puede acceder a cualquier ruta
        } else if (location.pathname === '/register') {
          // Permite registro sin verificar
        } else {
          // Si el correo no está verificado, cierra sesión y muestra mensaje
          auth.signOut();
          alert('Por favor, verifica tu correo electrónico antes de iniciar sesión.');
          navigate('/', { replace: true });
        }
      } else {
        setEmail(null);
        // Solo redirige a login si está en rutas protegidas
        if (
          location.pathname !== '/register' &&
          location.pathname !== '/about' &&
          location.pathname !== '/help'
        ) {
          navigate('/', { replace: true });
        }
      }
    });
    return () => unsubscribe();
  }, [navigate, setUser, setEmail, location.pathname]);

  return null;
}


export default App
