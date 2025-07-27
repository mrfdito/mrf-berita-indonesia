import React, { useEffect, useState } from "react";

// --- Configuration ---
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

// --- Helper Component: A single news card ---
// The card's width is now responsive.
const PopularNewsCard = ({ article, index }) => {
  if (!article) return null;

  // Format the date for better readability
  const formattedDate = new Date(article.pubDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      // CHANGE: w-full for mobile, md:w-96 for desktop. flex-shrink-0 prevents shrinking in the flex row on desktop.
      className="flex-shrink-0 w-full md:w-96 group relative bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex h-full">
        {/* Image */}
        <div className="w-1/3">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Content */}
        <div className="w-2/3 p-4 flex flex-col">
          <p className="text-xs text-blue-600 font-semibold mb-1">
            {article.category}
          </p>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-3 group-hover:text-blue-700 transition-colors">
            {article.title}
          </h3>
          <p className="text-xs text-gray-400 mt-auto pt-2">{formattedDate}</p>
        </div>
      </div>
      {/* Number Badge */}
      <div className="absolute top-2 left-2 bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
        {index + 1}
      </div>
    </a>
  );
};

// --- Helper Component: Skeleton loader for a card ---
// The skeleton's width is also responsive.
const CardSkeleton = () => (
  <div className="flex-shrink-0 w-full md:w-96 bg-white shadow-md rounded-lg overflow-hidden animate-pulse">
    <div className="flex h-28">
      <div className="w-1/3 bg-gray-200"></div>
      <div className="w-2/3 p-4 flex flex-col">
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3 mt-auto"></div>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const PopularNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // Create an array of fetch promises
        const promises = categoryEndpoints.map(async (endpoint) => {
          const res = await fetch(endpoint.url);
          if (!res.ok) {
            throw new Error(
              `HTTP error! status: ${res.status} for ${endpoint.category}`
            );
          }
          const data = await res.json();
          const firstArticle = data?.data?.posts[0];

          // Return the article with its category, or null if not found
          return firstArticle
            ? { ...firstArticle, category: endpoint.category }
            : null;
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        // Filter out any null results and update state
        setNews(results.filter(Boolean));
      } catch (err) {
        console.error("Error fetching popular news:", err);
        setError("Gagal memuat berita populer. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Berita Populer
        </h2>
        {/* MAIN CHANGE HERE:
          - flex-col: Default to a vertical column layout (for mobile).
          - md:flex-row: Switch back to a horizontal row on medium screens and up.
          - md:overflow-x-auto: Only allow horizontal scrolling on medium screens and up.
        */}
        <div className="flex flex-col md:flex-row gap-6 md:overflow-x-auto md:pb-4 md:-mx-4 md:px-4">
          {loading &&
            // Show skeleton loaders while loading
            categoryEndpoints.map((_, index) => <CardSkeleton key={index} />)}

          {error && <p className="text-red-500">{error}</p>}

          {!loading &&
            !error &&
            news.map((item, index) => (
              <PopularNewsCard
                key={item.link || index}
                article={item}
                index={index}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default PopularNews;
