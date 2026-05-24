"use client";

const mediaBase =
  "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

const steps = [
  {
    title: "Browse",
    description: "Explore verified properties for sale or rent",
    image: `${mediaBase}/48f09ddeabe8d319b174cd9d575aa18c17147e557e0ee20f20f28875f8e270d4.png`,
  },
  {
    title: "Connect",
    description: "Contact us or book an inspection instantly",
    image: `${mediaBase}/6e5c5f40c02f94f3d6e1d2592282a4444a69cf0c15cf2caeac881ff32fec7b97.png`,
  },
  {
    title: "Secure",
    description: "Proceed with confidence through our managed process",
    image: `${mediaBase}/491b2899bb4aba1028878e20162d633555be45bc81d821d2340e4c2c4ab688da.png`,
  },
];

const imageBox: React.CSSProperties = {
  borderRadius: 20,
  overflow: "hidden",
  background: "#F2F6FF",
};

const textBox: React.CSSProperties = {
  borderRadius: 20,
  background: "#F2F6FF",
  padding: "22px 24px 28px",
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: 260,
  objectFit: "cover",
  display: "block",
};

export default function HowItWorks() {
  return (
    <section style={{ background: "#2F3E5A", padding: "80px 24px 100px", color: "#fff" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: 50,
            fontWeight: 700,
            lineHeight: 1.1,
            margin: "0 0 56px",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          {/* COL 1: Browse — image box top, text box bottom */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={imageBox}>
              <img src={steps[0].image} alt="Browse" style={imgStyle} />
            </div>
            <div style={textBox}>
              <h3 style={{ fontSize: 21, fontWeight: 700, color: "#2F3E5A", margin: 0 }}>
                {steps[0].title}
              </h3>
              <p style={{ fontSize: 13, fontWeight: 500, lineHeight: "18px", color: "#8A8B8E", margin: "8px 0 0" }}>
                {steps[0].description}
              </p>
            </div>
          </div>

          {/* COL 2: Connect — text box top, image box bottom */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={textBox}>
              <h3 style={{ fontSize: 21, fontWeight: 700, color: "#2F3E5A", margin: 0 }}>
                {steps[1].title}
              </h3>
              <p style={{ fontSize: 13, fontWeight: 500, lineHeight: "18px", color: "#8A8B8E", margin: "8px 0 0" }}>
                {steps[1].description}
              </p>
            </div>
            <div style={imageBox}>
              <img src={steps[1].image} alt="Connect" style={imgStyle} />
            </div>
          </div>

          {/* COL 3: Secure — image box top, text box bottom */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={imageBox}>
              <img src={steps[2].image} alt="Secure" style={imgStyle} />
            </div>
            <div style={textBox}>
              <h3 style={{ fontSize: 21, fontWeight: 700, color: "#2F3E5A", margin: 0 }}>
                {steps[2].title}
              </h3>
              <p style={{ fontSize: 13, fontWeight: 500, lineHeight: "18px", color: "#8A8B8E", margin: "8px 0 0" }}>
                {steps[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}