// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import msc from "../assets/msc-logo.png";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const navigate = useNavigate();

  // 1) Si ya estoy logueado, voy directo a dashboard o checkout
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const cart = JSON.parse(localStorage.getItem("farmacenter_cart") || "[]");
      if (cart.length > 0) {
        navigate("/checkout", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        correo,
        password,
      });

      // 2) Guardamos token y user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Inicio de sesión exitoso");

      // 3) Luego redirijo según carrito
      const cart = JSON.parse(localStorage.getItem("farmacenter_cart") || "[]");
      if (cart.length > 0) {
        navigate("/checkout");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={msc} alt="msc-logo" className="h-21" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#ffc800]">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* correo */}
          <div className="relative">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full pl-4 pr-10 py-3 border border-[#0056A6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02225f] text-gray-700"
            />
            <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#02225f]" />
          </div>

          {/* password */}
          <div className="relative">
            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-4 pr-10 py-3 border border-[#0056A6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02225f] text-gray-700"
            />
            <button
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#02225f]"
            >
              {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* submit */}
          <button
            type="submit"
            className="w-full bg-[#02225f] text-white px-4 py-3 rounded-lg hover:text-[#ffc800] hover:bg-[#02225f] transition"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* enlaces secundarios */}
        <div className="mt-6 flex flex-col items-center gap-2 text-sm text-[#0056A6]">
          <Link
            to="/forgot-password"
            className="font-semibold hover:text-[#ffc800] transition"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <span>
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-semibold hover:text-[#ffc800] transition"
            >
              Regístrate
            </Link>
          </span>
          <Link to="/" className="font-semibold hover:text-[#ffc800] transition">
            Volver al Farmacenter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
