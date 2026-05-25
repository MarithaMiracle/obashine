"use client";

import Link from 'next/link';
import { useMediaQuery } from '@/lib/utils';

const mediaBase =
  "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

export default function SellCTA() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {/* ── LAND / CTA SECTION ── */}
      <section style={{
        minHeight: isMobile ? 320 : 600,
        backgroundImage: `url(${mediaBase}/4ec396e1c0c655c3f47ffda198a340715e5f6eec865d5fbeefa0f4dafc4c68f5.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: isMobile ? "40px 20px" : "60px 24px",
        display: "flex",
        alignItems: isMobile ? "center" : "flex-start",
        justifyContent: "center",
        position: "relative",
      }}>
        <div style={{
          maxWidth: isMobile ? "100%" : 623,
          textAlign: "center",
          paddingTop: isMobile ? 0 : 20,
        }}>
          <p style={{
            fontSize: isMobile ? 18 : 32,
            lineHeight: isMobile ? "26px" : "42px",
            color: "#0F242A",
            margin: 0,
            fontFamily: "Georgia, serif",
          }}>
            Find strategically located land options carefully verified by the Oba Shine team.
          </p>
          <Link
            href="/contact"
            style={{
              marginTop: isMobile ? 24 : 32,
              display: "inline-flex",
              borderRadius: 7,
              background: "#2F3E5A",
              padding: isMobile ? "9px 22px" : "10px 24px",
              fontSize: isMobile ? 15 : 16,
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Contact
          </Link>
        </div>
      </section>

      {/* ── SELL WITH US ── */}
      <section style={{
        background: "#fff",
        padding: isMobile ? "40px 20px 56px" : "96px 24px",
      }}>
        <div style={{
          maxWidth: 888,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "338px 1fr",
          gap: isMobile ? 24 : 48,
          alignItems: "center",
        }}>

          {/* Text block */}
          <div>
            <p style={{
              fontSize: isMobile ? 14 : 18,
              fontWeight: 600,
              lineHeight: isMobile ? "20px" : "24px",
              color: "#2F3E5A",
              margin: 0,
            }}>
              Ready to Sell or Need Help Finding the Right Property?
            </p>
            <h2 style={{
              marginTop: 12,
              fontSize: isMobile ? 40 : 52,
              fontWeight: 900,
              lineHeight: isMobile ? "44px" : "35px",
              color: "#DEA674",
            }}>
              Sell with Us
            </h2>
            <p style={{
              marginTop: isMobile ? 16 : 48,
              maxWidth: isMobile ? "100%" : 338,
              fontSize: isMobile ? 14 : 16,
              fontWeight: 600,
              lineHeight: "20px",
              color: "#8D8D8F",
            }}>
              Let us handle your property with professionalism and care
            </p>
            <Link
              href="/contact"
              style={{
                marginTop: isMobile ? 24 : 32,
                display: "inline-flex",
                borderRadius: 7,
                background: "#2D3A52",
                padding: isMobile ? "9px 20px" : "8px 16px",
                fontSize: isMobile ? 16 : 20,
                fontWeight: 600,
                color: "#F2E1D2",
                textDecoration: "none",
              }}
            >
              Contact
            </Link>
          </div>

          {/* Image block */}
          <div style={{
            justifySelf: isMobile ? "stretch" : "end",
            order: isMobile ? -1 : 1,
          }}>
            <img
              src={`${mediaBase}/5aa173055d05d7fc50c1c7ec1e4b037072a4447966fdfd9c3d4ea7a0d921f7e4.png`}
              alt="Sell with us"
              style={{
                width: "100%",
                maxWidth: isMobile ? "100%" : 636,
                borderRadius: isMobile ? 16 : 0,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}