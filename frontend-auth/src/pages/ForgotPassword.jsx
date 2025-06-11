import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaUserTie, FaUserPlus, FaHome } from "react-icons/fa";
import msc from "../assets/msc-logo.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/forgot-password`, { correo });
      toast.success("Revisa tu correo para restablecer tu contraseña");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al enviar el correo");
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={msc} alt="msc-logo" className="h-21" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#ffc800]">
          Recuperar Contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input con ícono */}
          <div className="relative">
            <input
              type="email"
              placeholder="Correo registrado"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full pl-4 pr-10 py-3 border border-[#0056A6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02225f] text-gray-700"
            />
            <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#02225f]" />
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className="w-full bg-[#02225f] text-[#fff] px-4 py-3 rounded-lg hover:text-[#ffc800] hover:bg-[#02225f] transition"
          >
            Enviar correo de recuperación
          </button>
        </form>

        {/* Enlaces */}
        <div className="mt-6">
          {/* Iniciar sesión y crear cuenta en fila */}
          <div className="flex justify-center gap-6 mb-4 text-sm text-gray-700">
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-[#ffc800] transition font-medium"
            >
              <FaUserTie /> Iniciar Sesión
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 hover:text-[#ffc800] transition font-medium"
            >
              <FaUserPlus /> Crear Cuenta
            </Link>
          </div>

          {/* Volver al inicio centrado */}
          <div className="text-center text-sm text-gray-700">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 hover:text-[#ffc800] transition font-medium"
            >
              <FaHome /> Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
