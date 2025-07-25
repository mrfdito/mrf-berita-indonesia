import React, { useEffect, useState } from "react";

const categoryEndpoints = [
  {
    url: "https://api-berita-indonesia.vercel.app/cnn/terbaru",
    category: "Terbaru",
  },
  {
    url: "https://api-berita-indonesia.vercel.app/cnn/nasional",
    category: "Nasional",
  },
  {
    url: "https://api-berita-indonesia.vercel.app/cnn/olahraga",
    category: "Olahraga",
  },
];

const PopularNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const result = [];

      for (const item of categoryEndpoints) {
        try {
          const res = await fetch(item.url);
          const data = await res.json();
          const firstArticle = data.data.posts[0];

          result.push({
            ...firstArticle,
            category: item.category,
          });
        } catch (error) {
          console.error("Error fetching:", item.category, error);
        }
      }

      setNews(result);
    };

    fetchAll();
  }, []);

  return (
    <div className="px-6 py-10">
      <h2 className="text-xl font-semibold mb-4">Berita Populer</h2>
      <div className="flex gap-6 overflow-x-auto">
        {news.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[400px] relative bg-white shadow rounded overflow-hidden"
          >
            <div className="flex">
              <div className="w-1/3">
                <img
                  src={item.thumbnail}
                  alt="thumbnail"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-2/3 p-3">
                <p className="text-xs text-gray-500 mb-1">
                  {item.category} - {item.pubDate}
                </p>
                <h3 className="text-sm font-semibold line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
            <div className="absolute top-2 left-2 bg-red-600 text-white w-6 h-6 rounded-full text-center text-sm">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularNews;
