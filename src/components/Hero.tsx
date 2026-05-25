"use client";

import { useState, useEffect } from "react";
import SearchAndFilter from "./SearchAndFilter";

const mediaBase =
  "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

const heroSlides = [
  {
    image: `${mediaBase}/65b17f007545c077642bb8ca19819809c0c5a1ea7326cd73cac818f730079e2c.png`,
    overlay: "linear-gradient(180deg, rgba(50, 20, 3, 0.95) 0%, rgba(80, 32, 5, 0.75) 25%, rgba(200, 118, 44, 0.3) 65%, rgba(200, 118, 44, 0.1) 100%)",
    title: "Find trusted<br />properties instantly",
    titleColor: "#f0d9a0",
    taglineColor: "#f0d9a0",
  },
  {
    image: "/images/3d-electric-car-building 2.png",
    overlay: "linear-gradient(180deg, rgba(15, 36, 42, 0.95) 0%, rgba(47, 62, 90, 0.75) 25%, rgba(47, 62, 90, 0.3) 65%, rgba(47, 62, 90, 0.1) 100%)",
    title: "Smart investments start<br />with the right property",
    titleColor: "#f0d9a0",
    taglineColor: "#f0d9a0",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-container {
            padding: 0 12px !important;
          }
          .hero-main {
            height: 420px !important;
            border-radius: 20px !important;
          }
          .hero-headline {
            top: 10% !important;
            width: 90% !important;
          }
          .hero-headline h1 {
            font-size: 28px !important;
            line-height: 1.2 !important;
            white-space: normal !important;
          }
          .hero-search-area {
            bottom: 24px !important;
            padding: 0 !important;
            width: calc(100% - 32px) !important;
          }
          .hero-tagline {
            font-size: 9px !important;
            letter-spacing: 0.18em !important;
            margin-top: 16px !important;
            padding: 0 8px !important;
          }
        }
      `}</style>
      <div className="hero-container" style={{ padding: "0 16px" }}>
        <div
          className="hero-main"
          style={{
            maxWidth: 1380,
            margin: "0 auto",
            borderRadius: 44,
            overflow: "hidden",
            position: "relative",
            height: 600,
          }}
        >
          {/* Sliding background images */}
          {heroSlides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: index === 1 ? "center top" : "center 30%",
                opacity: index === currentSlide ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            />
          ))}

          {/* Colored gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: heroSlides[currentSlide].overlay,
              transition: "background 1s ease-in-out",
            }}
          />

          {/* Content */}
          <div style={{ position: "relative", height: "100%" }}>
            {/* Headline */}
            <div
              className="hero-headline"
              style={{
                position: "absolute",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: 56,
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: heroSlides[currentSlide].titleColor,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
                dangerouslySetInnerHTML={{ __html: heroSlides[currentSlide].title }}
              />
            </div>

            {/* Search area */}
            <div
              className="hero-search-area"
              style={{
                width: "100%",
                maxWidth: 900,
                position: "absolute",
                bottom: 60,
                left: "50%",
                transform: "translateX(-50%)",
                boxSizing: "border-box",
              }}
            >
              <SearchAndFilter page="buy" />
            </div>
          </div>
        </div>

        {/* Tagline below hero */}
        <p
          className="hero-tagline"
          style={{
            textAlign: "center",
            margin: "24px 0 0",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.40em",
            textTransform: "uppercase",
            color:
              heroSlides[currentSlide].titleColor === "#f0d9a0"
                ? "#C8762C"
                : "#2F3E5A",
          }}
        >
          100% Verified Listings &nbsp;•&nbsp; Professionally Managed &nbsp;•&nbsp;
          Trusted Process
        </p>
      </div>
    </>
  );
}