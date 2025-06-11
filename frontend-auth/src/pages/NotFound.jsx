import { Link } from "react-router-dom";
import msc from "../assets/msc-logo.png";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center px-4">
      {/* Logo y nombre de la aplicación */}
      <div className="flex items-center mb-8">
        <img src={msc} alt="SENA Logo" className="h-21 mr-3" />
        <h1 className="text-2xl font-bold text-[#ffc800]">Mundo Servicios Carvajal</h1>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h2 className="text-6xl font-extrabold text-[#0056A6]-600 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Página no encontrada</h3>
        <p className="text-gray-600 mb-6">
          Lo sentimos, la ruta que estás buscando no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#0056A6] text-white rounded-md hover:bg-[#02225f] transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
