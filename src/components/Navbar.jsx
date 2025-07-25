import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MRF.<span className="text-black">NEWS</span>
        </Link>

        {/* Menu */}
        <div className="space-x-4 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Beranda
          </Link>
          <Link to="/terbaru" className="text-gray-700 hover:text-blue-600">
            Terbaru
          </Link>
          <Link to="/hiburan" className="text-gray-700 hover:text-blue-600">
            Hiburan
          </Link>
          <Link to="/gaya-hidup" className="text-gray-700 hover:text-blue-600">
            Gaya Hidup
          </Link>
          <Link to="/olahraga" className="text-gray-700 hover:text-blue-600">
            Olahraga
          </Link>
          <Link to="/nasional" className="text-gray-700 hover:text-blue-600">
            Nasional
          </Link>
          <Link
            to="/internasional"
            className="text-gray-700 hover:text-blue-600"
          >
            Internasional
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
