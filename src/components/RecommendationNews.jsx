import React, { useEffect, useState } from "react";

const BASE_URL = "https://api-berita-indonesia.vercel.app";

const sourceCategories = [
  { source: "antara", category: "politik" },
  { source: "cnbc", category: "market" },
  { source: "merdeka", category: "dunia" },
  { source: "okezone", category: "sports" },
  { source: "republika", category: "news" },
  { source: "sindonews", category: "nasional" },
  { source: "suara", category: "entertainment" },
  { source: "tempo", category: "tekno" },
  { source: "tribun", category: "sport" },
];

const ITEMS_PER_PAGE = 8;

const RecommendedNews = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      const results = [];
      for (const { source, category } of sourceCategories) {
        const url = `${BASE_URL}/${source}/${category}`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          const posts = data.data.posts.map((post) => ({
            ...post,
            source,
            category,
          }));
          results.push(...posts);
        } catch (err) {
          console.error(`Failed to fetch from ${url}`, err);
        }
      }
      setNews(results);
    };

    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const currentItems = news.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];

    // Previous
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2"
      >
        &lt;
      </button>
    );

    // First page + ellipsis
    if (currentPage > 2) {
      pages.push(
        <button key={1} onClick={() => handlePageChange(1)} className="px-2">
          1
        </button>
      );
      if (currentPage > 3) pages.push(<span key="dots1">...</span>);
    }

    // Current ±1
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 ${
            i === currentPage ? "font-bold text-blue-600" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    // Ellipsis + Last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2)
        pages.push(<span key="dots2">...</span>);
      pages.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className="px-2"
        >
          {totalPages}
        </button>
      );
    }

    // Next
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2"
      >
        &gt;
      </button>
    );

    return <div className="mt-6 flex gap-2 flex-wrap">{pages}</div>;
  };

  return (
    <div className="px-6 py-10">
      <h2 className="text-xl font-bold mb-4">Rekomendasi Untuk Anda</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="h-[150px] bg-gray-200 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col justify-between h-[150px]">
              <h3 className="text-sm font-semibold line-clamp-2 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">
                {item.source} - {item.category} - {item.pubDate}
              </p>
            </div>
          </div>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default RecommendedNews;
