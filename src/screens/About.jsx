import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const contributors = [
  {
    name: "Carlos Sanabria",
    email: "carlos.sanabria@upb.edu.co",
  },
  {
    name: "Jesús Díaz",
    email: "jesus.diaz@upb.edu.co",
  },
  {
    name: "Alejandro",
    email: "alejandro@upb.edu.co",
  },
];

const About = () => {
  const navigate = useNavigate();

  // Puedes ajustar si quieres que regrese a la pantalla anterior o a /game:
  const handleBack = () => navigate(-1);

  return (
    <div className="h-screen flex flex-col items-center justify-between px-4 py-4">
      <motion.header
        className="w-full flex items-center justify-center relative px-3 py-3 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 backdrop-blur-md rounded-2xl mb-3 shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          aria-label="volver"
          onClick={handleBack}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
       
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 flex flex-col items-center">
          <motion.h1
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 tracking-tight"
          >
            About
          </motion.h1>
        </div>
      </motion.header>

      <motion.section
        className="bg-slate-800/80 backdrop-blur-md rounded-2xl px-3 py-3 shadow-xl border border-slate-700/50 w-full max-w-lg flex flex-col gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <section>
          <h2 className="text-lg font-semibold text-yellow-300 mb-1">¿Qué es Konect4?</h2>
          <p className="text-white text-sm leading-tight">
            Konect4 es una app híbrida interactiva del clásico juego "Conecta 4", desarrollada empleando tecnologías modernas como <span className="font-bold text-pink-300">React</span> para la interfaz y <span className="font-bold text-indigo-300">Firebase</span> para la autenticación y el almacenamiento de datos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-yellow-300 mb-1">Características</h2>
          <ul className="list-disc list-inside text-white text-sm ml-1 space-y-0.5">
            <li>Juego en tiempo real contra otro jugador o contra la IA.</li>
            <li>Interfaz intuitiva y adaptativa para todos los dispositivos.</li>
            <li>Gestión de usuarios con autenticación segura.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-yellow-300 mb-1">Equipo de desarrollo</h2>
          <ul className="divide-y divide-slate-600">
            {contributors.map(({ name, email }) => (
              <li key={email} className="py-1">
                <span className="text-white font-medium text-sm">{name}</span>
                <span className="block text-xs text-slate-300">{email}</span>
              </li>
            ))}
          </ul>
        </section>
      </motion.section>

      <footer className="py-2 border-t border-white/10 text-center">
        <p className="text-white/50 text-xs">© 2025 Konect4 — UPB.</p>
        <p className="text-white/50 text-xs">Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default About;