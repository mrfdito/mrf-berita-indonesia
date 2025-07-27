import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

// --- Konfigurasi Kategori ---
const cnnCategories = [
  "terbaru",
  "nasional",
  "internasional",
  "ekonomi",
  "olahraga",
  "teknologi",
  "hiburan",
  "gayaHidup",
];

const labelMap = {
  terbaru: "Terbaru",
  nasional: "Nasional",
  internasional: "Internasional",
  ekonomi: "Ekonomi",
  olahraga: "Olahraga",
  teknologi: "Teknologi",
  hiburan: "Hiburan",
  gayaHidup: "Gaya Hidup",
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const activeLinkStyle = {
    color: "#2563EB", // Warna biru (blue-600)
    fontWeight: "600",
  };

  return (
    // Navbar dibuat 'sticky' dan diberi z-index tinggi agar tetap di atas
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              MRF.<span className="text-gray-800">Berita</span>
            </Link>
          </div>

          {/* Menu Kategori untuk Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {cnnCategories.map((cat) => (
                <NavLink
                  key={cat}
                  to={`/cnn/${cat}`}
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {labelMap[cat] || cat}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Tombol Hamburger untuk Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Buka menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- PERUBAHAN UTAMA DI SINI --- */}
      {/* Menu Dropdown untuk Mobile */}
      {/* Diberi posisi absolute agar "melayang" dan tidak mendorong konten lain. */}
      {/* Transisi opacity ditambahkan untuk efek fade-in/out. */}
      <div
        className={`
          md:hidden absolute top-full left-0 w-full bg-white shadow-lg
          transition-opacity duration-300 ease-in-out
          ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {cnnCategories.map((cat) => (
            <NavLink
              key={cat}
              to={`/cnn/${cat}`}
              onClick={() => setIsMenuOpen(false)} // Tutup menu setelah link diklik
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
            >
              {labelMap[cat] || cat}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
