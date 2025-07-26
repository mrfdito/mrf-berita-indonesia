import React from "react";
import { Link } from "react-router-dom";
import { categoryAlias } from "../data/categoryAlias"; // sesuaikan path-nya

const Navbar = () => {
  // Ambil kategori utama unik dari categoryAlias
  const mainCategories = Array.from(new Set(Object.values(categoryAlias)));

  // Optional: ubah nama agar tampilan lebih rapi
  const labelMap = {
    terbaru: "Terbaru",
    nasional: "Nasional",
    internasional: "Internasional",
    ekonomi: "Ekonomi",
    olahraga: "Olahraga",
    tekno: "Teknologi",
    hiburan: "Hiburan",
    "gaya-hidup": "Gaya Hidup",
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MRF.<span className="text-black">NEWS</span>
        </Link>

        {/* Menu Dinamis */}
        <div className="space-x-4 text-sm font-medium">
          {mainCategories.map((cat) => (
            <Link
              key={cat}
              to={`/${cat}`}
              className="text-gray-700 hover:text-blue-600"
            >
              {labelMap[cat] || cat}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
