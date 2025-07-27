import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const defaultImages = [
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
  "https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg",
];

const HeroCarousel = ({ images = defaultImages, autoPlayInterval = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(timerRef.current);
  }, [current, autoPlayInterval, handleNext]);

  return (
    // ----- SECTION DITAMBAHKAN UNTUK MEMBUAT JARAK KIRI-KANAN -----
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="w-full h-[250px] md:h-[400px] overflow-hidden relative rounded-xl shadow-lg">
        {/* Image Container */}
        <div>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out
                ${current === index ? "opacity-100 z-10" : "opacity-0 z-0"}
                ${current === index ? "animate-kenburns" : ""}
              `}
              style={{
                animationDirection: index % 2 === 0 ? "normal" : "reverse",
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>

        {/* Navigation Controls */}
        <div className="absolute inset-0 z-20 flex justify-between items-center px-4">
          <button
            onClick={handlePrev}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors"
            aria-label="Previous Slide"
          >
            <FiChevronLeft size={28} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors"
            aria-label="Next Slide"
          >
            <FiChevronRight size={28} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${
                  current === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
