import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import appFirebase from "../../credenciales"; // Ajusta la ruta si es necesario
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const auth = getAuth(appFirebase);

const AppHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
  Swal.fire({
    title: "¿Estás seguro que deseas cerrar sesión?",
    text: "Tu sesión actual se cerrará.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "No",
    confirmButtonColor: "#4f46e5",
    cancelButtonColor: "#a21caf",
    background: "linear-gradient(90deg, #3730a3 0%, #a21caf 100%)",
    color: "#fff",
  }).then((result) => {
    if (result.isConfirmed) {
      auth.signOut();
      Swal.fire({
        title: "¡Has cerrado sesión exitosamente!",
        text: "¡Hasta luego!",
        icon: "success",
        showConfirmButton: false,         
        timer: 1500,                      
        background: "linear-gradient(90deg, #3730a3 0%, #a21caf 100%)", 
        color: "#fff",
      }).then(() => {
        navigate("/");
      });
    }
  });
};


  return (
    <motion.header
      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-800/80 to-purple-800/80 backdrop-blur-md rounded-xl mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        aria-label="volver"
        onClick={handleBack}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/20 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <motion.h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
        Konect4
      </motion.h1>
    </motion.header>
  );
};

export default AppHeader;
