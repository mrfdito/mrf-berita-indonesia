import React, { useEffect, useState, useMemo, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";

const BASE_URL = "https://api-berita-indonesia.vercel.app";
const CNN_CATEGORIES = [
  "terbaru",
  "nasional",
  "internasional",
  "ekonomi",
  "olahraga",
  "teknologi",
  "hiburan",
  "gayaHidup",
];
const ITEMS_PER_PAGE = 8;

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const NewsCard = ({ article }) => {
  const formattedDate = new Date(article.pubDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
  });

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full
        ${article.isMatch ? "ring-2 ring-blue-500 shadow-lg" : "shadow-md"}
      `}
    >
      <div className="h-40 overflow-hidden">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-blue-600 uppercase mb-2">
          {article.category}
        </p>
        <h3 className="text-sm font-bold text-gray-800 line-clamp-3 flex-grow group-hover:text-blue-700">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
          {formattedDate}
        </p>
      </div>
    </a>
  );
};

const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3 mt-4"></div>
    </div>
  </div>
);

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  scrollTargetRef,
}) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
    scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const pageNumbers = [];
  const pagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-10 flex justify-center items-center gap-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
        aria-label="Previous Page"
      >
        <FiChevronLeft size={20} />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageClick(1)}
            className="px-4 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => handlePageClick(num)}
          className={`px-4 py-2 text-sm rounded-md ${
            currentPage === num
              ? "bg-blue-600 text-white font-bold"
              : "hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          <button
            onClick={() => handlePageClick(totalPages)}
            className="px-4 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
        aria-label="Next Page"
      >
        <FiChevronRight size={20} />
      </button>
    </nav>
  );
};

const RecommendedNews = () => {
  const [allNews, setAllNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const promises = CNN_CATEGORIES.map((category) =>
          fetch(`${BASE_URL}/cnn/${category}`)
            .then((res) => {
              if (!res.ok)
                throw new Error(`Gagal mengambil data untuk ${category}`);
              return res.json();
            })
            .then((data) =>
              data.data.posts.map((post) => ({ ...post, category }))
            )
        );
        const results = await Promise.allSettled(promises);
        const successfulPosts = results
          .filter((r) => r.status === "fulfilled")
          .flatMap((r) => r.value);

        if (successfulPosts.length === 0) {
          throw new Error("Tidak ada berita yang berhasil dimuat.");
        }

        setAllNews(shuffleArray(successfulPosts));
      } catch (err) {
        console.error("Gagal mengambil berita rekomendasi:", err);
        setError("Gagal memuat berita. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const { paginatedItems, totalPages } = useMemo(() => {
    let displayList = allNews;
    const hasSearchQuery = searchQuery.trim() !== "";

    if (hasSearchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const matches = [];
      const nonMatches = [];

      allNews.forEach((article) => {
        const isMatch = article.title.toLowerCase().includes(lowercasedQuery);
        const articleWithMatchFlag = { ...article, isMatch };

        if (isMatch) {
          matches.push(articleWithMatchFlag);
        } else {
          nonMatches.push({ ...articleWithMatchFlag, isMatch: false });
        }
      });
      displayList = [...matches, ...nonMatches];
    } else {
      displayList = allNews.map((article) => ({ ...article, isMatch: false }));
    }

    const total = Math.ceil(displayList.length / ITEMS_PER_PAGE);
    const items = displayList.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    return { paginatedItems: items, totalPages: total };
  }, [allNews, searchQuery, currentPage]);

  return (
    <section ref={sectionRef} className="bg-gray-50 scroll-mt-8">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 whitespace-nowrap">
            Rekomendasi Berita
          </h2>
          <div className="relative w-full md:max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch size={20} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul berita..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {error && !loading && (
          <div className="col-span-full text-center py-16">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <NewsCard key={item.link} article={item} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center text-center py-16">
              <p className="text-lg text-gray-500">
                {searchQuery
                  ? `Tidak ada berita dengan judul "${searchQuery}".`
                  : "Tidak ada berita yang tersedia."}
              </p>
            </div>
          )}
        </div>

        {!loading && !error && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            scrollTargetRef={sectionRef}
          />
        )}
      </div>
    </section>
  );
};

export default RecommendedNews;
