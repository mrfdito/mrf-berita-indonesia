import React from "react";
import {
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaPaperPlane,
} from "react-icons/fa";

// (Opsional) Refactor untuk membuat ikon sosial lebih mudah dikelola
const socialLinks = [
  { href: "#", icon: <FaYoutube /> },
  { href: "#", icon: <FaInstagram /> },
  { href: "#", icon: <FaFacebookF /> },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-6">
      {/* Perubahan pada grid:
        - grid-cols-1: Default untuk mobile (satu kolom)
        - md:grid-cols-2: Untuk tablet (dua kolom)
        - lg:grid-cols-4: Untuk desktop (empat kolom seperti semula)
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo dan Sosial Media */}
        {/* Perubahan: text-center di mobile, kembali ke text-left di desktop */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold mb-2">Berita Kini</h1>
          <p className="text-sm text-gray-400 mb-4">
            © 2025 Berita Kini. All Rights Reserved.
          </p>
          <p className="mb-2">Ikuti Kami</p>
          {/* Perubahan: justify-center di mobile, kembali normal di desktop */}
          <div className="flex gap-3 justify-center md:justify-start">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="bg-gray-700 p-2 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Telusuri */}
        <div>
          <h2 className="font-semibold mb-3">Telusuri</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                Beranda
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Kesehatan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Otomotif
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Politik
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Olahraga
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Nasional
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Internasional
              </a>
            </li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h2 className="font-semibold mb-3">Bantuan</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                Kontak Kami
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Laporan Pembajakan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Kebijakan
              </a>
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
            <button className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
              <FaPaperPlane className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
