// src/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-900 text-white flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/logo.png" // poné tu logo en la carpeta /public
          alt="Logo TecNM"
          className="w-12 h-12 rounded-full mr-3"
        />
        <span className="text-xl font-semibold">TecNM</span>
      </div>

      {/* Botón ingresar */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded">
        ingresar
      </button>
    </header>
  );
};

export default Header;
