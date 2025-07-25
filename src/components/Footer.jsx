import React from "react";
import {
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Logo dan Sosial Media */}
        <div>
          <h1 className="text-xl font-bold mb-2">Berita Kini</h1>
          <p className="text-sm text-gray-400 mb-4">
            © 2023 Berita Kini. All Rights Reserved.
          </p>
          <p className="mb-2">Ikuti Kami</p>
          <div className="flex gap-3">
            <a
              href="#"
              className="bg-gray-700 p-2 rounded-full hover:bg-white hover:text-black"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="bg-gray-700 p-2 rounded-full hover:bg-white hover:text-black"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-gray-700 p-2 rounded-full hover:bg-white hover:text-black"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Telusuri */}
        <div>
          <h2 className="font-semibold mb-3">Telusuri</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <a href="#">Beranda</a>
            </li>
            <li>
              <a href="#">Kesehatan</a>
            </li>
            <li>
              <a href="#">Otomotif</a>
            </li>
            <li>
              <a href="#">Politik</a>
            </li>
            <li>
              <a href="#">Olahraga</a>
            </li>
            <li>
              <a href="#">Nasional</a>
            </li>
            <li>
              <a href="#">Internasional</a>
            </li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h2 className="font-semibold mb-3">Bantuan</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <a href="#">Kontak Kami</a>
            </li>
            <li>
              <a href="#">Laporan Pembajakan</a>
            </li>
            <li>
              <a href="#">Kebijakan</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-semibold mb-3">Berlangganan Berita Terbaru</h2>
          <div className="flex">
            <input
              type="email"
              placeholder="Masukkan email"
              className="px-3 py-2 w-full rounded-l-md bg-white text-black text-sm focus:outline-none"
            />
            <button className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600">
              <FaPaperPlane className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
