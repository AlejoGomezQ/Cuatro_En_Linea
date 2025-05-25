import React from 'react';
import { motion } from 'framer-motion';


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

const About = () => (
  <div className="flex flex-col items-center justify-center h-full w-full p-4">
    
    <motion.header
      className="w-full flex flex-col items-center justify-center px-4 py-5 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 backdrop-blur-md rounded-2xl mb-6 shadow-lg"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

        <motion.button
          className="absolute top-7 left-7 text-white hover:text-yellow-300 transition-colors"
          onClick={() => window.history.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">        
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l9-9m-9 9l9 9" />
          </svg>
        </motion.button>


      <motion.h1
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 tracking-tight mb-2"
      >
        About
      </motion.h1>
      
    </motion.header>

    <motion.section
      className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-slate-700/50 w-full max-w-lg flex flex-col gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <section>
        <h2 className="text-xl font-semibold text-yellow-300 mb-1">¿Qué es Konect4?</h2>
        <p className="text-white leading-relaxed">
          Konect4 es una app hibrida interactiva del clásico juego "Conecta 4", desarrollada empleando tecnologías modernas como <span className="font-bold text-pink-300">React</span> para la interfaz y <span className="font-bold text-indigo-300">Firebase</span> para la autenticación y el almacenamiento de datos.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-yellow-300 mb-1">Características</h2>
        <ul className="list-disc list-inside text-white ml-2 space-y-1">
          <li>Juego en tiempo real contra otro jugador o contra la IA.</li>
          <li>Interfaz intuitiva y adaptativa para todos los dispositivos.</li>
          <li>Gestión de usuarios con autenticación segura.</li>
          <li>Historial y estadísticas de partidas. <span className="font-bold text-yellow-300">Proximamente!</span></li> 
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-yellow-300 mb-1">Equipo de desarrollo</h2>
        <ul className="divide-y divide-slate-600">
          {contributors.map(({ name, email }) => (
            <li key={email} className="py-2">
              <span className="text-white font-medium">{name}</span>
              <span className="block text-sm text-slate-300">{email}</span>
            </li>
          ))}
        </ul>
      </section>
    </motion.section>

    <footer className="mt-8 text-slate-400 text-xs">
      © 2025 Konect4 — Universidad Pontificia Bolivariana. Todos los derechos reservados.
    </footer>
  </div>
);


export default About;