"use client";

import { useState } from 'react';
import Image from 'next/image';
import SearchAndFilter from '@/components/SearchAndFilter';
import WhyChoose from '@/components/WhyChoose';

const mediaBase = "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

const howItWorksSteps = [
  {
    title: "Submit Your Property",
    description: "Provide basic details about your property",
    image: `${mediaBase}/bbb0c3a88b51fbd39253636b3d1b7f33ad16b471fd6f47e20350c3404688cef6.png`
  },
  {
    title: "We Review & Verify",
    description: "Our team assesses and verifies the property before listing",
    image: `${mediaBase}/321e7bf19daacaa7b3e362fcd91a764b5177b991a41c7584e9a64a2943b670f5.png`
  },
  {
    title: "We List & Promote",
    description: "Your property is professionally presented to the right audience",
    image: `${mediaBase}/31ff56e0adc7a785284c6ae75e471c64322056a8d395cec527ced80550280e27.png`
  },
  {
    title: "Connect with Buyers",
    description: "We manage enquiries and guide you through the process",
    image: `${mediaBase}/36a52bbd9ec3d49a688e86d3d21b305df4fe4ac6304b31be24ac987a2f364dfd.png`
  }
];

export default function SellWithUsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    propertyType: '',
    location: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const scrollToForm = () => {
    const formSection = document.getElementById('sell-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          property_type: formData.propertyType,
          property_location: formData.location,
          message: formData.message,
          type: 'sell'
        })
      });
      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          propertyType: '',
          location: '',
          message: ''
        });
        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
      }
    } catch (error) {
      console.error('Error sending property enquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ overflowX: "hidden", background: "#fff" }}>
      {/* Hero Section */}
      <section style={{
        width: "100%", margin: 0,
        height: 443, position: "relative", borderRadius: 0, overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start",
      }}>
        <Image
          src={`${mediaBase}/2f9b9b2c4764004c5ee89abecb754755d8db46d9b9964cd7244fdb58ec6b3919.png`}
          alt="Sell Properties Hero"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(10,34,45,0.9) 0%, rgba(10,34,45,0.3) 50%, rgba(10,34,45,0.1) 100%)",
        }} />

        <div style={{
          position: "relative", zIndex: 3, textAlign: "left", paddingLeft: 109,
          width: "100%", maxWidth: 1416, margin: "0 auto"
        }}>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 48, fontWeight: 600,
            color: "#fff", lineHeight: "49px", margin: "0 0 10px 0"
          }}>
            Sell Your Property<br />
            <span style={{ color: "#F2E1D2" }}>with Confidence</span>
          </h1>
          <p style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 400,
            color: "#fff", lineHeight: "21px", margin: "0 0 40px 0"
          }}>
            We handle everything from verification to<br />
            connecting you with serious buyers.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={scrollToForm} style={{
              background: "#AB6430", color: "#fff", fontSize: 13, fontWeight: 600,
              padding: "8px 24px", borderRadius: 999, border: "none", cursor: "pointer"
            }}>
              Get started
            </button>
            <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{
                background: "#fff", color: "#AB6430", fontSize: 13, fontWeight: 600,
                padding: "8px 24px", borderRadius: 999, border: "none", cursor: "pointer"
              }}>
                Talk to an Agent
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section style={{ maxWidth: 954, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
        <div style={{ width: 619, height: 3, background: "#AB6430", margin: "0 auto 12px auto" }} />
        <p style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 30, fontWeight: 400, lineHeight: "41px",
          color: "#2F3E5A", margin: 0
        }}>
          We don’t operate like a marketplace. Every property is managed and verified by our team before it goes live.<br />
          This is your biggest differentiator. Make it clear.
        </p>
      </section>

      {/* How It Works Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 24px" }}>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 36, fontWeight: 700,
          color: "#5D5D5E", textAlign: "center", lineHeight: "42px", margin: "0 0 60px 0"
        }}>
          How it Works
        </h2>
        {/* Top row: 3 steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginBottom: 48 }}>
          {howItWorksSteps.slice(0, 3).map((step, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <div style={{ width: 180, height: 180, borderRadius: 12, overflow: "hidden", margin: "0 auto 24px auto" }}>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={180}
                  height={180}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#AB6430", marginBottom: 12 }}>
                  0{index + 1}
                </div>
                <h3 style={{
                  fontFamily: "'Aileron', sans-serif", fontSize: 24, fontWeight: 600,
                  color: "#2F3E5A", margin: "0 0 12px 0"
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'Aileron', sans-serif", fontSize: 16, fontWeight: 400,
                  color: "#555", margin: 0, lineHeight: "22px"
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom row: 1 step centered */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {howItWorksSteps.slice(3, 4).map((step, index) => (
            <div key={index + 3} style={{ textAlign: "center", maxWidth: 320 }}>
              <div style={{ width: 180, height: 180, borderRadius: 12, overflow: "hidden", margin: "0 auto 24px auto" }}>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={180}
                  height={180}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#AB6430", marginBottom: 12 }}>
                  0{index + 4}
                </div>
                <h3 style={{
                  fontFamily: "'Aileron', sans-serif", fontSize: 24, fontWeight: 600,
                  color: "#2F3E5A", margin: "0 0 12px 0"
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'Aileron', sans-serif", fontSize: 16, fontWeight: 400,
                  color: "#555", margin: 0, lineHeight: "22px"
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose ObaShine */}
      <WhyChoose />

      {/* Ready to List Your Property Section */}
      <section style={{ position: "relative", height: 404, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("${mediaBase}/4c46ede4ab6e095641e900aa8df6556f7adf6adc1c29793ba3084574594eff40.png")`,
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(47, 62, 90, 0.3) 0%, rgba(47, 62, 90, 0.5) 50%, rgba(47, 62, 90, 0.85) 100%)"
        }} />
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 1416, margin: "0 auto", padding: "0 24px",
          height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "flex-end"
        }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif", fontSize: 48, fontWeight: 600,
            color: "#fff", lineHeight: "54px", margin: 0,
            textAlign: "right"
          }}>
            Ready to List<br />
            Your Property?
          </h2>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="sell-form" style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px 80px 24px" }}>
        {/* Form Container */}
        <div style={{
          background: "#F2E1D2",
          padding: "36px 32px",
          borderRadius: 16,
          boxSizing: "border-box",
        }}>
          {/* Success Animation */}
          {showSuccess ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 20px',
              textAlign: 'center'
            }}>
              <style>{`
                @keyframes pulse {
                  0%, 100% { transform: scale(1); opacity: 1; }
                  50% { transform: scale(1.1); opacity: 0.9; }
                }
                @keyframes checkmark {
                  0% { stroke-dashoffset: 100; }
                  100% { stroke-dashoffset: 0; }
                }
              `}</style>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: 'pulse 0.8s ease-in-out infinite' }}>
                <circle cx="40" cy="40" r="36" fill="#AB6430" />
                <path
                  d="M25 40 L35 50 L55 30"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray="100"
                  style={{ animation: 'checkmark 0.6s ease-out forwards' }}
                />
              </svg>
              <h3 style={{
                marginTop: '24px',
                fontSize: '24px',
                fontWeight: 600,
                color: '#2F3E5A',
                fontFamily: "'Poppins', sans-serif",
                margin: '24px 0 8px 0'
              }}>
                Property Enquiry Sent!
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#5D5D5E',
                fontFamily: "'Poppins', sans-serif",
                margin: 0
              }}>
                Our team will get back to you shortly
              </p>
            </div>
          ) : (
            // Form
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Name Fields */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#2F3E5A", marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #E0D5C5",
                    fontSize: 15, background: "#fff", fontFamily: "'Poppins', sans-serif",
                    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box"
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#2F3E5A", marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #E0D5C5",
                    fontSize: 15, background: "#fff", fontFamily: "'Poppins', sans-serif",
                    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box"
                  }}
                />
              </div>
            </div>
            {/* Phone */}
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#2F3E5A", marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 801 234 5678"
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #E0D5C5",
                  fontSize: 15, background: "#fff", fontFamily: "'Poppins', sans-serif",
                  outline: "none", transition: "border-color 0.2s", boxSizing: "border-box"
                }}
              />
            </div>
            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#2F3E5A", marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #E0D5C5",
                  fontSize: 15, background: "#fff", fontFamily: "'Poppins', sans-serif",
                  outline: "none", transition: "border-color 0.2s", boxSizing: "border-box"
                }}
              />
            </div>
            {/* Property Type & Location */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#2F3E5A", marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #E0D5C5",
                    fontSize: 15, background: "#fff", fontFamily: "'Poppins', sans-serif",
                    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
                    cursor: "pointer", appearance: "none",
                    backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23AB6430%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                    backgroundSize: "12px auto",
                    paddingRight: "40px"
                  }}
                >
                  <option value="">Select property type</option>
                  <option value="1 Bedroom Flat">1 Bedroom Flat</option>
                  <option value="2 Bedroom Flat">2 Bedroom Flat</option>
                  <option value="3 Bedroom Flat">3 Bedroom Flat</option>
                  <option value="4 Bedroom Flat">4 Bedroom Flat</option>
                  <option value="5 Bedroom Flat">5 Bedroom Flat</option>
                  <option value="1 Bedroom Apartment">1 Bedroom Apartment</option>
                  <option value="2 Bedroom Apartment">2 Bedroom Apartment</option>
                  <option value="3 Bedroom Apartment">3 Bedroom Apartment</option>
                  <option value="4 Bedroom Apartment">4 Bedroom Apartment</option>
                  <option value="5 Bedroom Apartment">5 Bedroom Apartment</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Terraced Duplex">Terraced Duplex</option>
                  <option value="Semi-Detached Duplex">Semi-Detached Duplex</option>
                  <option value="Detached Duplex">Detached Duplex</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Land">Land</option>
                  <option value="Commercial Property">Commercial Property</option>
                  <option value="Office Space">Office Space</option>
                  <option value="Shop">Shop</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#2F3E5A", marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Lekki, Lagos"
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #E0D5C5",
                    fontSize: 15, background: "#fff", fontFamily: "'Poppins', sans-serif",
                    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box"
                  }}
                />
              </div>
            </div>
            {/* Message */}
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#2F3E5A", marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>
                Tell us more about your property
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your property, size, amenities, etc."
                rows={3}
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #E0D5C5",
                  fontSize: 15, background: "#fff", resize: "none", fontFamily: "'Poppins', sans-serif",
                  outline: "none", transition: "border-color 0.2s", lineHeight: "1.5", boxSizing: "border-box"
                }}
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%", padding: "14px 24px", background: "#AB6430", color: "#fff",
                fontSize: 16, fontWeight: 600, borderRadius: 12, border: "none", cursor: "pointer",
                fontFamily: "'Poppins', sans-serif", marginTop: 8, transition: "background 0.2s",
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Submitting...' : 'Submit Property'}
            </button>
            {/* WhatsApp Contact */}
            <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", cursor: "pointer" }}>
              <p style={{ textAlign: "center", fontSize: 14, color: "#AB6430", margin: 0, fontFamily: "'Poppins', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                Prefer to chat? Contact us directly on
                <span style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  <Image
                    src="/images/whatsapp_3536445 1.png"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                  />
                  WhatsApp
                </span>
              </p>
            </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}