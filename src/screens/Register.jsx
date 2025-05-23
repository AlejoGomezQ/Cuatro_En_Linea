import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { s } from 'framer-motion/client';

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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    // Validaciones del formulario
    const validateForm = () => {
        const { firstName, lastName, email, phone, password, confirmPassword } = formData;
    
        // Validar nombre
        if (!firstName || firstName.length < 2 || firstName.length > 50) {
          return 'El nombre debe tener entre 2 y 50 caracteres.';
        }
    
        // Validar apellido
        if (!lastName || lastName.length < 2 || lastName.length > 50) {
          return 'El apellido debe tener entre 2 y 50 caracteres.';
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
  
    const handleRegister = () => {
        const validationError = validateForm();
        if (validationError) {
          setError(validationError);
          return;
        }
    
        setError('');
        // Aquí puedes agregar la lógica para registrar al usuario
        console.log('Usuario registrado:', formData);
        navigate('/'); // Redirige a la pantalla de login después del registro
      };
  
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-4">
        <motion.h1
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Registro de Usuario
        </motion.h1>
  
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
            <label className="block text-slate-300 text-sm font-bold mb-2">Nombre</label>
            <input
              type="text"
              name="firstName"
              placeholder="Ingresa tu nombre"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 text-sm font-bold mb-2">Apellido</label>
            <input
              type="text"
              name="lastName"
              placeholder="Ingresa tu apellido"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 text-sm font-bold mb-2">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 text-sm font-bold mb-2">Número de Teléfono</label>
            <input
              type="tel"
              name="phone"
              placeholder="Ingresa tu número de teléfono"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-300 text-sm font-bold mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-bold mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirma tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <Button onClick={handleRegister} fullWidth={true}>
            Registrarse
          </Button>
        </motion.div>
      </div>
    );
  };
  
  export default Register;