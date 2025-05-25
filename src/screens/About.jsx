import { motion } from 'framer-motion';
import React from 'react';

const About = () => {
    
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <motion.div 
                className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-700/50 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-white mb-4">Acerca de este juego</h1>
                <p className="text-white mb-2">Este es un juego de Conecta 4 desarrollado con React y Firebase.</p>
                <p className="text-white mb-2">Puedes jugar contra otro jugador o contra la IA.</p>
                <p className="text-white mb-2">Desarrollado por [Tu Nombre].</p>
            </motion.div>
        </div>
    );
        
};

export default About;