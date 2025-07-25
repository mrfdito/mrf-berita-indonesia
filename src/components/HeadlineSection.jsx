import React, { useEffect, useState } from "react";

const HeadlineSection = () => {
  const [headlines, setHeadlines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHeadlines = async () => {
      const res = await fetch(
        "https://api-berita-indonesia.vercel.app/cnn/terbaru"
      );
      const data = await res.json();
      setHeadlines(data.data.posts.slice(0, 5)); // Ambil 5 berita saja
    };

    fetchHeadlines();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === headlines.length - 1 ? prev : prev + 1
    );
  };

  const headline = headlines[currentIndex];

  if (headlines.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-500">Loading headline...</p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <p className="text-sm text-blue-600 font-semibold mb-2">Headline</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Kiri: Teks */}
        <div className="p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {headline.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {headline.description || "Tidak ada deskripsi"}
          </p>
          <p className="text-gray-400 text-xs mb-4">{headline.pubDate}</p>
          <a
            href={headline.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm w-fit"
          >
            Baca Selengkapnya
          </a>
        </div>

        {/* Kanan: Gambar */}
        <div>
          <img
            src={headline.thumbnail}
            alt="Headline"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigasi Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="text-blue-600 font-bold disabled:text-gray-300"
        >
          &lt;
        </button>
        <p className="text-sm text-gray-600">
          [{currentIndex + 1}] dari [{headlines.length}]
        </p>
        <button
          onClick={handleNext}
          disabled={currentIndex === headlines.length - 1}
          className="text-blue-600 font-bold disabled:text-gray-300"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default HeadlineSection;
