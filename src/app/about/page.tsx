"use client";

import Image from 'next/image';

const mediaBase = "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

export default function AboutPage() {
  return (
    <main style={{ overflowX: "hidden", background: "#fff", paddingTop: 120 }}>
      {/* Hero Section */}
      <section style={{ 
        width: "100%", margin: 0, height: 350, position: "relative", 
        background: "#F8DAC0", display: "flex", alignItems: "center"
      }}>
        {/* Frame Background */}
        <div style={{ 
          position: "absolute", inset: 0, zIndex: 1,
          backgroundImage: "url('/images/frame behind about hero section.png')",
          backgroundSize: "cover", backgroundPosition: "center"
        }} />
        <div style={{ 
          position: "absolute", top: -100, right: 0, width: 600, height: 450, zIndex: 2,
          backgroundImage: `url("${mediaBase}/1761044db791f52557c4a195b48ac7124069cc3132ca8bee8618f4cc7fb90a7b.png")`,
          backgroundSize: "cover", backgroundPosition: "center"
        }} />
        
        <div style={{
          position: "relative", zIndex: 3, maxWidth: 940, margin: "0 auto", padding: "0 24px", width: "100%"
        }}>
          <div style={{ maxWidth: 490 }}>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 36, fontWeight: 600,
              color: "#AB6430", lineHeight: "42px", margin: 0
            }}>
              A More Reliable Way to<br />Find and Manage Property
            </h1>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 300,
              color: "#2F3E5A", lineHeight: "22px", margin: "16px 0 0 0"
            }}>
              Oba Shine is built on trust, structure, and a commitment to verified property listings. We provide a more controlled and professional alternative to traditional property marketplaces.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section style={{ maxWidth: 940, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "flex", gap: 64, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ width: 274, height: 360, overflow: "hidden" }}>
              <Image
                src={`${mediaBase}/76843465e673dc35faee7fc240790407587a7170ccffc9123a7c3728858ce89f.png`}
                alt="Who We Are"
                width={274}
                height={360}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div style={{ flex: 2 }}>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 40, fontWeight: 300,
              color: "#2F3E5A", lineHeight: "44px", margin: "0 0 24px 0"
            }}>
              Who We Are
            </h2>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 15,
              color: "#5D5D5E", lineHeight: "22px", margin: 0
            }}>
              Oba Shine is a property platform focused on delivering a more reliable and structured experience for buyers, renters, and property owners.<br /><br />
              Unlike open marketplaces, every listing on our platform is managed and verified internally before it is published. This ensures that users interact only with genuine, well-presented properties.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 940, margin: "0 auto", height: 1, background: "#000", opacity: 0.5 }} />

      {/* Our Approach */}
      <section style={{ maxWidth: 940, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "flex", gap: 64, alignItems: "center" }}>
          <div style={{ flex: 2 }}>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 40, fontWeight: 300,
              color: "#2F3E5A", lineHeight: "44px", margin: "0 0 24px 0"
            }}>
              Our Approach
            </h2>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 300,
              color: "#5D5D5E", lineHeight: "22px", margin: 0
            }}>
              We take a hands-on approach to property management and listings.<br /><br />
              Every property goes through a review and verification process before it is presented to users. This allows us to maintain quality, accuracy, and trust across the platform.<br /><br />
              Our goal is to remove uncertainty and make property transactions simpler and more transparent.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ width: 311, height: 307, overflow: "hidden", borderRadius: 21 }}>
              <Image
                src={`${mediaBase}/f3cb97a40c21ae45fd243337e43ffad09a9e0f63f4fd71bf8deba1ce89a97754.png`}
                alt="Our Approach"
                width={311}
                height={307}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 940, margin: "0 auto", height: 1, background: "#000", opacity: 0.5 }} />

      {/* Why Oba Shine Exists */}
      <section style={{ maxWidth: 940, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "flex", gap: 64, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ width: 311, height: 307, overflow: "hidden", borderRadius: 21 }}>
              <Image
                src={`${mediaBase}/2d14e9f073eb8a87d99868ac24ad57787befa1d142658176baa41575c11ee222.png`}
                alt="Why Oba Shine Exists"
                width={311}
                height={307}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div style={{ flex: 2 }}>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 40, fontWeight: 300,
              color: "#2F3E5A", lineHeight: "44px", margin: "0 0 24px 0"
            }}>
              Why Oba Shine Exists
            </h2>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 300,
              color: "#5D5D5E", lineHeight: "22px", margin: 0
            }}>
              The property space is often filled with uncertainty, misinformation, and unverified listings.<br /><br />
              Oba Shine was created to provide a more dependable alternative, where users can explore properties with confidence and property owners can trust that their listings are handled professionally.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 940, margin: "0 auto", height: 1, background: "#000", opacity: 0.5 }} />

      {/* Final CTA */}
      <section style={{ maxWidth: 940, margin: "0 auto", padding: "80px 24px", display: "flex", gap: 64, alignItems: "center" }}>
        <div style={{ flex: 2 }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 40,
            lineHeight: "44px", margin: "0 0 24px 0"
          }}>
            <span style={{ color: "#AB6430" }}>Start</span> <span style={{ color: "#2F3E5A", fontWeight: 300 }}>Your Property Journey with Confidence</span>
          </h2>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="/property-details" style={{
              background: "#AB6430", color: "#fff", fontSize: 13, fontWeight: 600,
              padding: "8px 24px", borderRadius: 21, border: "none", cursor: "pointer",
              fontFamily: "'Aileron', sans-serif", textDecoration: "none"
            }}>
              Properties
            </a>
            <a href="/sell-with-us" style={{
              background: "#F2E1D2", color: "#AB6430", fontSize: 13, fontWeight: 600,
              padding: "8px 24px", borderRadius: 21, border: "none", cursor: "pointer",
              fontFamily: "'Aileron', sans-serif", textDecoration: "none"
            }}>
              Sell with Us
            </a>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ width: 240, height: 240, overflow: "hidden" }}>
            <Image
              src={`${mediaBase}/aae728fa1074837e8c3c8a73dee03e8d8498158689b4ffdcf3a581ab9ff57584.png`}
              alt="Property Journey"
              width={240}
              height={240}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}