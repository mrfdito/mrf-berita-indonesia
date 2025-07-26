import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams(); // ambil nama kategori dari URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await fetch(
          `https://api-berita-indonesia.vercel.app/antara/${category}`
        );
        const json = await res.json();
        setData(json.data.posts);
        setLoading(false);
      } catch (err) {
        console.error("Gagal fetch data:", err);
        setLoading(false);
      }
    };

    fetchBerita();
  }, [category]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {category.replace("-", " ")}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.pubDate}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Baca Selengkapnya
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
