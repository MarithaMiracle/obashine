import { BadgeCheck, ShieldCheck, BriefcaseBusiness, Workflow, Clock, HandCoins } from "lucide-react";

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
  return (
    <section style={{ background: "#FCF8F4", padding: "80px 24px" }}>
      <div style={{ maxWidth: 955, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 36, fontWeight: 600, lineHeight: "54px", color: "#2F3E5A", margin: 0 }}>
          Why Choose ObaShine
        </h2>

        <div style={{ maxWidth: 1000, margin: "56px auto 0", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 24,
                paddingBottom: index < 4 ? 40 : 0,
                paddingTop: index >= 2 ? 40 : 0,
                paddingRight: index % 2 === 0 ? 40 : 0,
                paddingLeft: index % 2 === 1 ? 40 : 0,
                borderBottom: index < 4 ? "1px solid #A4B1CC" : "none",
                borderRight: index % 2 === 0 ? "1px solid #A4B1CC" : "none",
              }}
            >
              {/* Circle icon */}
              <div style={{
                width: 121, height: 121, borderRadius: "50%",
                border: "2px solid #97A7C7",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                color: "#97A7C7",
              }}>
                {benefit.icon}
              </div>

              <div style={{ paddingTop: 24 }}>
                <h3 style={{ fontSize: 28, fontWeight: 600, color: "#566D98", margin: 0 }}>
                  {benefit.title}
                </h3>
                <p style={{ marginTop: 8, maxWidth: 233, fontSize: 13, fontWeight: 600, lineHeight: "16px", color: "#252D3C" }}>
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