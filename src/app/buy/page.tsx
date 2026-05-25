"use client";

import SearchAndFilter from '@/components/SearchAndFilter'
import Image from 'next/image'
import PropertyList from '@/components/PropertyList'
import { Suspense, useState, useEffect } from 'react'

const mediaBase = "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media"

const featuredProperties = [
  { id: 1, price: '₦500,000,000', type: '3 Bedroom Duplex', location: 'Lekki, Lagos', image: '/images/lone property.png' },
  { id: 2, price: '₦19.2million', type: '4 Bedroom Duplex', location: 'Lekki Phase 1', image: `${mediaBase}/f67ddb3a48feb66f9252383f2aaab62cd4837b13fe51c0764aa4a50cd1927ec1.png` },
  { id: 3, price: '₦17million', type: '3 Bedroom Apartment', location: 'Victoria Island', image: `${mediaBase}/3c86bb0f093ed7672fd136471ed2b99b24d32162b5ed521c9d235694b771b862.png` }
];

const whyBuyItems = [
  {
    title: 'Verified Properties Only',
    desc: 'Every property is inspected before it is listed, so you never deal with fake or misleading listings.',
    icon: '/images/verified properties only.png'
  },
  {
    title: 'No Guesswork',
    desc: 'What you see online reflects the real property. No hidden surprises during inspection.',
    icon: '/images/no guesswork.png'
  },
  {
    title: 'Professional Handling',
    desc: 'From first enquiry to final transaction, our team manages the process with care and expertise.',
    icon: '/images/professional handling.png'
  },
  {
    title: 'Faster Decision Making',
    desc: 'With trusted information and clear communication, you can make decisions quickly and confidently.',
    icon: '/images/faster decision making.png'
  },
  {
    title: 'Seamless Experience',
    desc: 'We simplify everything from booking inspections to connecting you with the right opportunities.',
    icon: '/images/seamless experience.png'
  },
]

export default function BuyPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProperties.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProperties.length);
  };

  const currentFeatured = featuredProperties[currentSlide];

  return (
    <main style={{ overflowX: "hidden", background: "#fff" }}>
      {/* Hero Section */}
      <section style={{
        width: "100%", margin: 0,
        height: isMobile ? 380 : 443, position: "relative", borderRadius: 0, overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center",
      }}>
        <Image
          src={`${mediaBase}/b58afd9cc10dba1391158fd3c69b722ed85048afa0dd41ef13d688bee0cade70.png`}
          alt="Buy Properties Hero"
          fill
          style={{ objectFit: "cover", filter: "saturate(1.06)" }}
          priority
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(45,58,82,1) 0%, rgba(115,115,115,0.36) 75.481%)",
        }} />

        <div style={{
          position: "relative", zIndex: 3, textAlign: "center", marginTop: isMobile ? 60 : 80, padding: isMobile ? "0 16px" : 0
        }}>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 36 : 64, fontWeight: 600,
            color: "#fff", lineHeight: isMobile ? "40px" : "29px",
            margin: 0,
          }}>
            Buy Properties
          </h1>
          <p style={{
            fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 16 : 24, fontWeight: 300,
            color: "#fff", lineHeight: isMobile ? "24px" : "29px",
            margin: isMobile ? "16px 0 0 0" : "32px 0 0 0",
          }}>
            Browse verified properties in your preferred location
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 3, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: 24 }}>
          <div style={{ width: "calc(100% - 32px)", maxWidth: 900, position: 'relative', boxSizing: "border-box" }}>
            <SearchAndFilter page="buy" />
          </div>
        </div>
      </section>

      {/* Properties Available Section */}
      <section style={{ maxWidth: 1062, margin: isMobile ? "40px auto 0" : "60px auto 0", padding: isMobile ? "0 16px" : "0 24px" }}>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 28 : 48, fontWeight: 600,
          color: "#2F3E5A", textAlign: "center", lineHeight: isMobile ? "36px" : "47px",
          margin: isMobile ? "0 0 32px 0" : "0 0 48px 0",
        }}>
          Properties Available for Buy
        </h2>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', color: '#8A8B8E', fontFamily: "'Poppins', sans-serif" }}>Loading properties...</div>}>
          <PropertyList type="sale" />
        </Suspense>
      </section>

      {/* Why Buy With Us Section */}
      <section style={{
        background: "#2F3E5A", padding: isMobile ? "48px 0" : "89px 0",
        position: "relative", width: "100%", overflow: "hidden",
        marginTop: isMobile ? 40 : 60,
      }}>
        <div style={{ maxWidth: 946, margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 32 : 48, fontWeight: 600,
            color: "#97A7C7", textAlign: "center", lineHeight: isMobile ? "40px" : "29px",
            margin: isMobile ? "0 0 48px 0" : "0 0 139px 0",
          }}>
            Why Buy with Oba Shine
          </h2>

          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 32 : 50, alignItems: isMobile ? "center" : "flex-start" }}>
            <div style={{ flex: 1, width: "100%" }}>
              {whyBuyItems.map((item, index) => (
                <div key={index} style={{
                  padding: isMobile ? "24px 0" : "40px 0",
                  borderBottom: index < whyBuyItems.length - 1 ? "1px solid rgba(255,255,255,1)" : "none",
                  display: "flex", gap: isMobile ? 16 : 24, alignItems: "flex-start",
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 20 : 24, fontWeight: 600,
                      color: "#97A7C7", textAlign: "left", lineHeight: isMobile ? "28px" : "29px",
                      margin: "0 0 12px 0",
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 14 : 16, fontWeight: 300,
                      color: "#fff", textAlign: "left", lineHeight: isMobile ? "24px" : "27px",
                      margin: 0,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                  <div style={{ flexShrink: 0, paddingTop: 4 }}>
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={isMobile ? 48 : 70}
                      height={isMobile ? 48 : 70}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ width: isMobile ? "100%" : 380, flexShrink: 0, display: isMobile ? "none" : "block" }}>
              <div style={{ position: "relative", height: 874, overflow: "hidden" }}>
                <Image
                  src={`${mediaBase}/6e5c5f40c02f94f3d6e1d2592282a4444a69cf0c15cf2caeac881ff32fec7b97.png`}
                  alt="Professional"
                  fill
                  style={{ objectFit: "cover", filter: "saturate(0)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Property Banner */}
      <section style={{
        width: "100%", height: isMobile ? 400 : 750, position: "relative", marginTop: 0,
        overflow: "hidden",
      }}>
        {featuredProperties.map((prop, index) => (
          <div key={prop.id} style={{
            position: "absolute", inset: 0,
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}>
            <Image
              src={prop.image}
              alt={prop.type}
              fill
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(101,130,184,0) 0%, rgba(0,0,0,0.64) 100%)",
            }} />
          </div>
        ))}

        <div style={{ position: "absolute", left: isMobile ? 24 : 136, bottom: isMobile ? 40 : 139, zIndex: 10, right: isMobile ? 24 : "auto" }}>
          <p style={{
            fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 20 : 36, fontWeight: 500,
            color: "#fbfbfb", margin: isMobile ? "0 0 8px 0" : "0 0 16px 0",
          }}>
            Price
          </p>
          <p style={{
            fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 36 : 64, fontWeight: 700,
            color: "#DEA674", margin: isMobile ? "0 0 8px 0" : "0 0 16px 0",
          }}>
            {currentFeatured.price}
          </p>
          <p style={{
            fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 20 : 36, fontWeight: 500,
            color: "#fbfbfb", margin: 0,
            lineHeight: isMobile ? "28px" : "normal"
          }}>
            {currentFeatured.type}<br />{currentFeatured.location}
          </p>
        </div>

        <div 
          onClick={handleNextSlide}
          style={{ position: "absolute", right: isMobile ? 24 : 192, bottom: isMobile ? 40 : 139, zIndex: 10, cursor: "pointer" }}
        >
          <div style={{
            width: isMobile ? 40 : 51, height: isMobile ? 40 : 51,
            backgroundImage: `url(${mediaBase}/f8206270041ef75e576bc4a1051fc84eced5dd6012d834eadce0dc09e1ecd2b7.png)`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }} />
        </div>
      </section>
    </main>
  );
}