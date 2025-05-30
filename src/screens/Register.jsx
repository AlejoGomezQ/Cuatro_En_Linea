import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Importar modulos necesarios para Firebase
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const Register = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // Mostrar/Ocultar contraseña
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Mostrar/Ocultar confirmación de contraseña

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleBack = () => navigate("/");

    // Validaciones del formulario
    const validateForm = () => {
        const { firstName, lastName, email, phone, password, confirmPassword } = formData;
        
        // Validar que todos los campos esten llenos
        if (!firstName && !lastName && !email && !phone && !password && !confirmPassword) {
            return 'Por favor, completa los campos.';
        }

        // Validar nombre
        if (!firstName || firstName.length < 2 || firstName.length > 10) {
          return 'El nombre debe tener entre 2 y 10 caracteres.';
        }
    
        // Validar apellido
        if (!lastName || lastName.length < 2 || lastName.length > 10) {
          return 'El apellido debe tener entre 2 y 10 caracteres.';
        }
    
        // Validar correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          return 'Por favor, ingresa un correo electrónico válido.';
        }
    
        // Validar número de teléfono
        const phoneRegex = /^[0-9]{10}$/; // Acepta solo 10 dígitos
        if (!phone || !phoneRegex.test(phone)) {
          return 'Por favor, ingresa un número de teléfono válido (10 dígitos).';
        }
    
        // Validar contraseña
        const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
        if (!password || password.length < 6 || !passwordregex.test(password)) {
          return 'La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.';
        }
    
        // Validar confirmación de contraseña
        if (password !== confirmPassword) {
          return 'Las contraseñas no coinciden.';
        }
    
        return null;
      };
  
    const handleRegister = async() => {
        const validationError = validateForm();
        if (validationError) {
          setError(validationError);
          return;
        }
    
        setError('');

        // Lógica para registrar al usuario
        try{
          // Crear usuario en Authentication
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );
          const user = userCredential.user;

          // Enviar correo de verificación
          await sendEmailVerification(user, {
            url: 'http://localhost:5173/',
            handleCodeInApp: false
          });

          // Almacenar datos en Firestore
          await setDoc(doc(db, 'users', user.uid), {
            email: formData.email,
            name: formData.firstName,
            lastname: formData.lastName,
            phoneNumber: formData.phone,
          });

          
          await signOut(auth);

          // Mensaje de éxito y redirección al login
          Swal.fire({
                  title: 'Por favor revisa tu correo y verifica tu cuenta antes de iniciar sesión.',
                  text: "¡Registro exitoso!",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 3000,
                  background: "linear-gradient(90deg, #3730a3 0%, #a21caf 100%)",
                  color: "#fff",
                }).then(() => {
                  navigate('/');
                });
                
        }catch(error){
          if (error.code === 'auth/email-already-in-use') {
            setError('El correo ya está registrado.');
          } else if (error.code === 'auth/invalid-email') {
            setError('Correo electrónico inválido.');
          } else if (error.code === 'auth/weak-password') {
            setError('La contraseña es muy débil.');
          } else {
            setError('Error al registrar. Intenta de nuevo.');
          }
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-3">
        <div className="flex items-center justify-center mb-4">
          <button
            aria-label="volver"
            onClick={handleBack}
            className="p-1 mr-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <motion.h1
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Registro de Usuario
          </motion.h1>
        </div>

        
        
  
        <motion.div
          className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-700/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error && (
            <motion.p
              className="text-red-500 text-xs mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
          <div className="mb-3">
            <label className="block text-slate-300 text-xs font-bold mb-1">Nombre</label>
            <input
              type="text"
              name="firstName"
              placeholder="Ingresa tu primer nombre"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 text-sm rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-3">
            <label className="block text-slate-300 text-xs font-bold mb-1">Apellido</label>
            <input
              type="text"
              name="lastName"
              placeholder="Ingresa tu primer apellido"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 text-sm rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-3">
            <label className="block text-slate-300 text-xs font-bold mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-sm rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-3">
            <label className="block text-slate-300 text-xs font-bold mb-1">Número de Teléfono</label>
            <input
              type="tel"
              name="phone"
              placeholder="Ingresa tu número de teléfono"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 text-sm rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-3 relative">
            <label className="block text-slate-300 text-xs font-bold mb-1">Contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 text-sm rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-7 text-slate-400 hover:text-yellow-400"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="mb-4 relative">
            <label className="block text-slate-300 text-xs font-bold mb-1">Confirmar Contraseña</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirma tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 text-sm rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-7 text-slate-400 hover:text-yellow-400"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <Button onClick={handleRegister} fullWidth={true}>
            Registrarse
          </Button>
        </motion.div>

        {/* Footer */}
      <footer className="py-3 border-t border-white/10 text-center">
        <p className="text-white/50 text-xs">© 2025 Konect4 — UPB.</p>
        <p className="text-white/50 text-xs">Todos los derechos reservados.</p>
      </footer>

      </div>
    );
  };
  
  export default Register;