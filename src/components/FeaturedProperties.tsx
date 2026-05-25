"use client";

import Link from 'next/link';
import { useMediaQuery } from '@/lib/utils';

const mediaBase =
  "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";
const verifiedBadgeUrl = `${mediaBase}/ae496f9ef257bbc55871511540d0896c688b180e4eaf8dc0186ba5703d00d02b.png`;

const featuredProperties = [
  "f67ddb3a48feb66f9252383f2aaab62cd4837b13fe51c0764aa4a50cd1927ec1.png",
  "3c86bb0f093ed7672fd136471ed2b99b24d32162b5ed521c9d235694b771b862.png",
  "6d7929fefd98864e7550b34ca7e187ae675b63d681fc03c6a5dabc674f1a5d06.png",
  "1d33d8145e115620f4933d3c93d11458d4f503188439eece399d2eaa72087e72.png",
  "a9585637ed6ad5ae736ccfdc13740cbd2067ef70d910686116771ef57a3688bd.png",
  "1019d5c0afc5e7cd28bdb35b4ab1e57e254ece0ea79d64b0864290b82e03364f.png",
  "9c6cfc04dc804ae4d58e4f91c46dc0f45d81cca14920fc18cdab8f15e56ec5c4.png",
  "10890b440dee1a982239442426100416e9963bb1f703a8f0f8914e27bf1cb9ff.png",
];

function PropertyCard({ image, index, isMobile }: { image: string; index: number; isMobile: boolean }) {
  return (
    <div style={{ position: "relative", width: isMobile ? "100%" : 220, flexShrink: 0 }}>
      <div style={{
        position: "absolute", right: -8, top: -8, zIndex: 10,
        width: 29, height: 29,
      }}>
        <img
          src={verifiedBadgeUrl}
          alt="Verified"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div style={{ borderRadius: 14, overflow: "hidden", background: "#d9d9d9" }}>
        <img
          src={`${mediaBase}/${image}`}
          alt={`Featured property ${index + 1}`}
          style={{ height: isMobile ? 110 : 186, width: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
}

export default function FeaturedProperties() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const scrollRowStyle: React.CSSProperties = isMobile
    ? {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
      }
    : {};

  return (
    <>
      {isMobile && (
        <style>{`
          .fp-scroll-row::-webkit-scrollbar { display: none; }
        `}</style>
      )}

      <section style={{ padding: isMobile ? "48px 16px" : "96px 24px" }}>
        <div style={{ maxWidth: 1062, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: isMobile ? 32 : 50,
            fontWeight: 600, color: "#2F3E5A",
            margin: 0, lineHeight: 1.1,
          }}>
            Featured Properties
          </h2>
          <p style={{
            marginTop: 16,
            fontSize: isMobile ? 16 : 24,
            fontWeight: 600, color: "#8A8B8E",
            lineHeight: 1.1, maxWidth: 395,
            margin: "16px auto 0",
          }}>
            Carefully selected homes available for sale and rent
          </p>

          <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 12 }}>
            <Link href="/sell-with-us" style={{ textDecoration: "none" }}>
              <span style={{ borderRadius: 21, background: "#E2E9F4", padding: "8px 20px", fontSize: 13, fontWeight: 600, color: "#2F3E5A", cursor: "pointer" }}>
                Sell with Us
              </span>
            </Link>
            <Link href="/property-details" style={{ textDecoration: "none" }}>
              <span style={{ borderRadius: 21, background: "#2F3E5A", padding: "8px 20px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
                Properties
              </span>
            </Link>
          </div>

          <div style={{ marginTop: isMobile ? 32 : 48, display: isMobile ? "grid" : "flex", gridTemplateColumns: isMobile ? "1fr" : "none", flexDirection: isMobile ? "column" : "column", gap: 10 }}>

            {/* Row 1 */}
            <div
              className={isMobile ? "" : "fp-scroll-row"}
              style={{
                ...scrollRowStyle,
                ...(!isMobile && {
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 20,
                  paddingRight: 20,
                }),
              }}
            >
              {featuredProperties.slice(0, 4).map((image, index) => (
                <PropertyCard key={image} image={image} index={index} isMobile={isMobile} />
              ))}
            </div>

            {/* Row 2 */}
            <div
              className={isMobile ? "" : "fp-scroll-row"}
              style={{
                ...scrollRowStyle,
                ...(!isMobile && {
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 20,
                }),
              }}
            >
              {featuredProperties.slice(4, 8).map((image, index) => (
                <PropertyCard key={image} image={image} index={index + 4} isMobile={isMobile} />
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}