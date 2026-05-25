const mediaBase =
  "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

const navLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/property-details", label: "Property Details" },
  { href: "/sell-with-us", label: "Sell with Us" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .footer-logo {
            width: 160px !important;
          }
          .footer-desc {
            font-size: 13px !important;
            max-width: 100% !important;
          }
          .footer-links-col {
            padding-top: 0 !important;
            border-top: 1px solid rgba(255,255,255,0.12);
            padding-top: 32px !important;
          }
          .footer-nav-links {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 12px 16px !important;
          }
          .footer-nav-links a {
            font-size: 15px !important;
          }
          .footer-root {
            padding: 40px 20px 48px !important;
          }
          .footer-copyright {
            margin-top: 28px !important;
            font-size: 10px !important;
          }
        }
      `}</style>

      <footer
        className="footer-root"
        style={{ background: "#2F3E5A", padding: "64px 24px", color: "#fff" }}
      >
        <div
          className="footer-grid"
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 180px",
            gap: 48,
          }}
        >
          {/* Left col */}
          <div>
            <img
              className="footer-logo"
              src={`${mediaBase}/2bdbe27c490d2d8534ad40bbad1ab3b34f5b64277cf2c67193e3e609f0f03a1c.png`}
              alt="ObaShine footer logo"
              style={{ width: 216, height: "auto" }}
            />

            <p
              className="footer-desc"
              style={{
                marginTop: 32,
                maxWidth: 578,
                fontSize: 14,
                lineHeight: "23px",
                color: "#fff",
              }}
            >
              Oba Shine is a modern property platform focused on verified property
              listings and professional property management. Every listing is internally
              reviewed by the team to ensure a more trusted and seamless experience for
              buyers, renters, and property owners.
            </p>

            <p
              className="footer-copyright"
              style={{ marginTop: 40, fontSize: 11, fontWeight: 600, lineHeight: "23px" }}
            >
              Copyright © 2026 Obashine Properties. All rights reserved.
            </p>
          </div>

          {/* Right col */}
          <div className="footer-links-col" style={{ paddingTop: 24 }}>
            <div
              className="footer-nav-links"
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    textDecoration: "none",
                    color: link.active ? "#DEA674" : "#fff",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="/contact"
              style={{
                marginTop: 24,
                display: "inline-flex",
                borderRadius: 7,
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "8px 16px",
                fontSize: 16,
                fontWeight: 600,
                color: "#F2E1D2",
                textDecoration: "none",
              }}
            >
              Contact us
            </a>

            <p style={{ marginTop: 32, fontSize: 12 }}>Visit us on social media</p>

            <div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src={`${mediaBase}/e205a99536f99a523ba7632923df320ade587d31a54a52a93a5ba0e0512d0ca5.png`}
                  alt="Instagram"
                  style={{ height: 28, width: 28 }}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src={`${mediaBase}/7dcbc6147b5ba1f1da63566505a0bee3a7c044fc9c9ab8935f8298eb6b231340.png`}
                  alt="Twitter"
                  style={{ height: 29, width: 29 }}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src={`${mediaBase}/2929c10bfb13d8aed015032cad3693276bca484fe2a8d096f2804b2f65505189.png`}
                  alt="Facebook"
                  style={{ height: 29, width: 29 }}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src={`${mediaBase}/77fcc9dbaf4dd949f654f9d391f699c1e8beff7efc149aa26571fddfd88e0108.png`}
                  alt="LinkedIn"
                  style={{ height: 29, width: 29 }}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}