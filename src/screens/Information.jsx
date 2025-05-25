import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Information = () => {
  const navigate = useNavigate();

  // Puedes ajustar si quieres que regrese a la pantalla anterior o a /game:
  const handleBack = () => navigate(-1);

return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-6">
        {/* Header con botón de volver */}
        <motion.header
            className="w-full flex items-center justify-center relative px-4 py-5 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 backdrop-blur-md rounded-2xl mb-6 shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <button
                aria-label="volver"
                onClick={handleBack}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="flex-1 flex flex-col items-center">
                <motion.h1
                    className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 tracking-tight mb-1"
                >
                    Information
                </motion.h1>
                <span className="text-slate-200 text-lg font-light tracking-wide">
                    Novedades y actualizaciones
                </span>
            </div>
        </motion.header>

        {/* Cuerpo de la ayuda */}
        <motion.section
            className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-slate-700/50 w-full max-w-lg flex flex-col gap-5 py-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            

            <section>
                <h2 className="text-xl font-semibold text-yellow-300 mb-2">Novedades</h2>
                <ul className="list-disc list-inside text-white ml-2 space-y-1">
                    <li>Nuevo modo de juego: " 1 vs IA".</li>
                    <li>Mejoras en la IA para una experiencia de juego más desafiante.</li>
                    <li>Interfaz de usuario actualizada con nuevos gráficos y animaciones.</li>
                    <li>Historial y estadísticas de partidas. <span className="font-bold text-yellow-300">¡Próximamente!</span></li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-yellow-300 mb-2">Actualizaciones</h2>
                <ul className="list-disc list-inside text-white ml-2 space-y-1">
                    <li>Mejoras en la IA para una experiencia de juego más desafiante.</li>
                    <li>Corrección de errores y optimización del rendimiento.</li>
                    <li>Interfaz de usuario mejorada para una navegación más fluida.</li>
                </ul>
            </section>

        
        </motion.section>

        <footer className="p-6  border-t border-white/10 text-center">
      <p className="text-white/50">© 2025 Konect4 — UPB.</p>
      <p className="text-white/50">Todos los derechos reservados.</p>
      </footer>
    </div>
);
};

export default Information;