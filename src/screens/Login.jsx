import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Importando módulos de Firebase
import appFirebase from "../credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(appFirebase);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        await auth.signOut();
        setError("Por favor verifica tu correo antes de iniciar sesión.");
        return;
      }

      Swal.fire({
        title: "¡Has iniciado sesión exitosamente!",
        text: "¡Bienvenido!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        background: "linear-gradient(90deg, #3730a3 0%, #a21caf 100%)",
        color: "#fff",
      }).then(() => {
        navigate("/game");
      });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado.");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else if (error.code === "auth/invalid-email") {
        setError("Correo electrónico inválido.");
      } else {
        setError("Error al iniciar sesión. Intenta de nuevo.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      
      <motion.h1
      className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-4 flex items-center space-x-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="w-16 h-16 inline-block transform scale-110">
        <img src="../public/loguito.png" alt="K logo" className="w-full h-full object-contain inline-block" />
      </span>
      <span className="-ml-4">onect4</span>
    </motion.h1>


      <motion.p
        className="text-lg text-slate-300 mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        ¡Bienvenido a Konect4!
      </motion.p>


      <motion.div
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-slate-700/50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error && (
          <motion.p
            className="text-red-500 text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}

        <div className="mb-4">
          <label className="block text-slate-300 text-sm font-bold mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 text-sm font-bold mb-2">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-yellow-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Button onClick={handleLogin} fullWidth={true}>
            Iniciar Sesión
          </Button>
          <Button
            onClick={() => navigate("/register")}
            fullWidth={true}
            variant="secondary"
          >
            Registrarse
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
