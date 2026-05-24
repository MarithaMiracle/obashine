"use client";

import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import SellCTA from "../components/SellCTA";

export default function ObaShineHomePage() {
  return (
    <main style={{ overflowX: "hidden", background: "#fff", color: "#0F242A", fontFamily: "system-ui, sans-serif" }}>
      <Hero />
      <FeaturedProperties />
      <WhyChoose />
      <HowItWorks />
      <SellCTA />
    </main>
  );
}