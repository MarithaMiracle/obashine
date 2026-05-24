import Link from 'next/link';

const mediaBase =
  "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

export default function SellCTA() {
  return (
    <>
      {/* ── LAND / CTA SECTION ── */}
      <section style={{
        minHeight: 600,
        backgroundImage: `url(${mediaBase}/4ec396e1c0c655c3f47ffda198a340715e5f6eec865d5fbeefa0f4dafc4c68f5.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "60px 24px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        position: "relative",
      }}>
        <div style={{ maxWidth: 623, textAlign: "center", paddingTop: 20 }}>
          <p style={{
            fontSize: 32, lineHeight: "42px", color: "#0F242A", margin: 0,
            fontFamily: "Georgia, serif",
          }}>
            Find strategically located land options carefully verified by the Oba Shine team.
          </p>
          <Link
            href="/contact"
            style={{
              marginTop: 32,
              display: "inline-flex",
              borderRadius: 7,
              background: "#2F3E5A",
              padding: "10px 24px",
              fontSize: 16,
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
      <section style={{ background: "#fff", padding: "96px 24px" }}>
        <div style={{ maxWidth: 888, margin: "0 auto", display: "grid", gridTemplateColumns: "338px 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 18, fontWeight: 600, lineHeight: "24px", color: "#2F3E5A", margin: 0 }}>
              Ready to Sell or Need Help Finding the Right Property?
            </p>
            <h2 style={{ marginTop: 16, fontSize: 52, fontWeight: 900, lineHeight: "35px", color: "#DEA674" }}>
              Sell with Us
            </h2>
            <p style={{ marginTop: 48, maxWidth: 338, fontSize: 16, fontWeight: 600, lineHeight: "18px", color: "#8D8D8F" }}>
              Let us handle your property with professionalism and care
            </p>
            <Link
              href="/contact"
              style={{
                marginTop: 32,
                display: "inline-flex",
                borderRadius: 7,
                background: "#2D3A52",
                padding: "8px 16px",
                fontSize: 20,
                fontWeight: 600,
                color: "#F2E1D2",
                textDecoration: "none",
              }}
            >
              Contact
            </Link>
          </div>

          <div style={{ justifySelf: "end" }}>
            <img
              src={`${mediaBase}/5aa173055d05d7fc50c1c7ec1e4b037072a4447966fdfd9c3d4ea7a0d921f7e4.png`}
              alt="Sell with us"
              style={{ width: "100%", maxWidth: 636, objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}