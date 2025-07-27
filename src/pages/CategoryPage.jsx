import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ITEMS_PER_PAGE = 10;

// --- Helper Functions ---
const formatPageTitle = (text = "") => {
  if (!text) return "";
  // Mengganti 'gayaHidup' menjadi 'Gaya Hidup' sebelum kapitalisasi
  const formattedText = text === "gayaHidup" ? "Gaya Hidup" : text;
  return formattedText
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

// --- Child Components ---

const NewsCard = ({ article }) => {
  const formattedDate = new Date(article.pubDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-bold text-gray-800 line-clamp-3 flex-grow group-hover:text-blue-700">
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
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4">
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
    scrollTargetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

// --- Main Page Component ---
const CategoryPage = () => {
  const { source, category } = useParams();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      setNewsData([]);
      setCurrentPage(1);

      try {
        const url = `https://api-berita-indonesia.vercel.app/${source}/${category}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Gagal memuat data (Status: ${res.status})`);
        }
        const json = await res.json();

        if (json?.data?.posts) {
          setNewsData(json.data.posts);
        } else {
          setNewsData([]); // Fallback jika struktur data tidak sesuai
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (source && category) {
      fetchNews();
    }
  }, [source, category]);

  const { paginatedItems, totalPages } = useMemo(() => {
    const total = Math.ceil(newsData.length / ITEMS_PER_PAGE);
    const items = newsData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    return { paginatedItems: items, totalPages: total };
  }, [newsData, currentPage]);

  return (
    <div ref={pageRef} className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 scroll-mt-16">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="font-semibold text-gray-700 capitalize">
            {source}
          </span>
          <span className="mx-2">&gt;</span>
          <span className="font-semibold text-gray-900">
            {formatPageTitle(category)}
          </span>
        </nav>

        <h1 className="text-3xl font-bold mb-6 border-b pb-4 text-gray-800">
          Kategori: {formatPageTitle(category)}
        </h1>

        {error && <p className="text-center text-red-500 py-10">{error}</p>}

        {/* PERUBAHAN UTAMA DI SINI */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[500px]">
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : paginatedItems.length > 0
            ? paginatedItems.map((item) => (
                <NewsCard key={item.link} article={item} />
              ))
            : !error && (
                <div className="col-span-full text-center py-16">
                  <p className="text-lg text-gray-500">
                    Tidak ada berita ditemukan di kategori ini.
                  </p>
                </div>
              )}
        </div>

        {!loading && !error && newsData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            scrollTargetRef={pageRef}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
