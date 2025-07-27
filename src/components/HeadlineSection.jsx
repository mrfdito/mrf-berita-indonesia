import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const API_URL = "https://api-berita-indonesia.vercel.app/cnn/terbaru";
const HEADLINE_COUNT = 5;

const HeadlineSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-lg overflow-hidden animate-pulse">
    <div className="p-6 flex flex-col justify-center">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="h-10 bg-gray-200 rounded w-36"></div>
    </div>
    <div className="bg-gray-200 w-full h-full min-h-[250px] md:min-h-0"></div>
  </div>
);

const HeadlineSection = () => {
  const [headlines, setHeadlines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();

        if (data && data.data && data.data.posts) {
          setHeadlines(data.data.posts.slice(0, HEADLINE_COUNT));
        } else {
          throw new Error("Invalid data structure from API.");
        }
      } catch (err) {
        console.error("Error fetching headlines:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  const handlePrev = () => {
    const newIndex =
      currentIndex === 0 ? headlines.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex === headlines.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentHeadline = headlines[currentIndex];

  const renderContent = () => {
    if (loading) {
      return <HeadlineSkeleton />;
    }

    if (error) {
      return (
        <p className="text-center mt-6 text-red-500">
          Error loading headlines: {error}
        </p>
      );
    }

    if (!currentHeadline) {
      return (
        <p className="text-center mt-6 text-gray-500">
          No headlines available.
        </p>
      );
    }

    return (
      <div
        key={currentIndex}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-lg overflow-hidden transition-opacity duration-500 animate-fadeIn"
      >
        <div className="p-6 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {currentHeadline.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {currentHeadline.description || "No description available."}
          </p>
          <p className="text-gray-400 text-xs mb-6">
            {new Date(currentHeadline.pubDate).toLocaleString("id-ID", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </p>
          <a
            href={currentHeadline.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm font-semibold w-fit"
          >
            Baca Selengkapnya
          </a>
        </div>

        {/* Right Side: Image */}
        <div className="order-1 md:order-2">
          <img
            src={currentHeadline.thumbnail}
            alt={currentHeadline.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h3 className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wider">
        Headline
      </h3>

      {renderContent()}

      {!loading && !error && headlines.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Previous headline"
          >
            <FiChevronLeft size={24} className="text-blue-600" />
          </button>

          <div className="flex items-center gap-2">
            {headlines.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentIndex === index
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to headline ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Next headline"
          >
            <FiChevronRight size={24} className="text-blue-600" />
          </button>
        </div>
      )}
    </section>
  );
};

export default HeadlineSection;
