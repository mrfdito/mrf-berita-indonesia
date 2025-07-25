import React, { useState, useEffect } from "react";

const images = [
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", // kantor meeting
  "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg", // ruangan kantor
  "https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg", // koran & kopi
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // ganti slide setiap 4 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[300px] md:h-[500px] overflow-hidden relative rounded-xl mb-10">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
