import React from "react";
import HeadlineSection from "../components/HeadlineSection";
import PopulerSection from "../components/PopulerSection";
import RecommendationNews from "../components/RecommendationNews";
import HeroCarousel from "../components/HeroCarousel";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeadlineSection />
      <PopulerSection />
      <RecommendationNews />
      <HeroCarousel />
      <Footer />
    </div>
  );
}
