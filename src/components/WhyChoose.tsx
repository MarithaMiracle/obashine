"use client";

import { BadgeCheck, ShieldCheck, BriefcaseBusiness, Workflow, Clock, HandCoins } from "lucide-react";
import { useMediaQuery } from "@/lib/utils";

const benefits = [
  {
    title: "Verified Listings",
    description: "Every property is inspected and approved before it goes live.",
    icon: <BadgeCheck size={40} />,
  },
  {
    title: "No Fake Listings",
    description: "What you see is exactly what you get. No surprises.",
    icon: <ShieldCheck size={40} />,
  },
  {
    title: "Expert Handling",
    description: "We manage the entire process from listing to final transaction.",
    icon: <BriefcaseBusiness size={40} />,
  },
  {
    title: "Seamless Experience",
    description: "From search to inspection, everything is simple and guided.",
    icon: <Workflow size={40} />,
  },
  {
    title: "Time-Saving Approach",
    description: "We manage the entire process from listing to final transaction.",
    icon: <Clock size={40} />,
  },
  {
    title: "Trusted Handling",
    description: "From search to inspection, everything is simple and guided.",
    icon: <HandCoins size={40} />,
  },
];

export default function WhyChoose() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section style={{ background: "#FCF8F4", padding: isMobile ? "48px 16px" : "80px 24px" }}>
      <div style={{ maxWidth: 955, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: isMobile ? 28 : 36, fontWeight: 600, lineHeight: isMobile ? "36px" : "54px", color: "#2F3E5A", margin: 0 }}>
          Why Choose ObaShine
        </h2>

        <div style={{ maxWidth: 1000, margin: isMobile ? "32px auto 0" : "56px auto 0", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: isMobile ? 16 : 24,
                paddingBottom: isMobile ? (index < 5 ? 24 : 0) : (index < 4 ? 40 : 0),
                paddingTop: isMobile ? (index > 0 ? 24 : 0) : (index >= 2 ? 40 : 0),
                paddingRight: isMobile ? 0 : (index % 2 === 0 ? 40 : 0),
                paddingLeft: isMobile ? 0 : (index % 2 === 1 ? 40 : 0),
                borderBottom: isMobile ? (index < 5 ? "1px solid #A4B1CC" : "none") : (index < 4 ? "1px solid #A4B1CC" : "none"),
                borderRight: isMobile ? "none" : (index % 2 === 0 ? "1px solid #A4B1CC" : "none"),
              }}
            >
              {/* Circle icon */}
              <div style={{
                width: isMobile ? 80 : 121, height: isMobile ? 80 : 121, borderRadius: "50%",
                border: "2px solid #97A7C7",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                color: "#97A7C7",
              }}>
                {benefit.icon}
              </div>

              <div style={{ paddingTop: isMobile ? 12 : 24 }}>
                <h3 style={{ fontSize: isMobile ? 20 : 28, fontWeight: 600, color: "#566D98", margin: 0 }}>
                  {benefit.title}
                </h3>
                <p style={{ marginTop: 8, maxWidth: isMobile ? "100%" : 233, fontSize: 13, fontWeight: 600, lineHeight: "16px", color: "#252D3C" }}>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}