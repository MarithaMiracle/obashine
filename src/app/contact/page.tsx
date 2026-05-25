"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const mediaBase = "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
          message: formData.message,
          type: 'contact'
        })
      });
      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          message: ''
        });
        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ overflowX: "hidden", background: "#F0F4F9", paddingTop: isMobile ? 80 : 100, position: 'relative' }}>
      {/* Hero Section */}
      <section style={{ 
        width: "100%", margin: 0, height: isMobile ? 180 : 260, position: "relative", 
        background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        paddingTop: isMobile ? 20 : 40
      }}>
        {/* Background icon pattern */}
        <div style={{ 
          position: "absolute", inset: 0, opacity: 0.02,
          backgroundImage: `url("${mediaBase}/d93d6b5bc3386b9e1ea4b3539bf8961de6f1bcb314e8216220c444f3e3eab703.png")`,
          backgroundSize: "cover", backgroundPosition: "center"
        }} />
        
        <div style={{ 
          position: "relative", zIndex: 10, maxWidth: 1000, width: "100%", 
          display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 20 : 50
        }}>
          {/* Phone Image */}
          <div style={{ width: isMobile ? 200 : 650, height: isMobile ? 180 : 580, position: "relative", marginTop: isMobile ? -50 : -169, marginBottom: 0, display: isMobile ? "none" : "block" }}>
            <Image
              src={`${mediaBase}/f8c7abfe86435a1808840200b6c504261ba654ded19d39b10a37859024733e0d.png`}
              alt="Phone"
              width={650}
              height={580}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </div>
          
          {/* Contact Us Text */}
          <div>
            <h1 style={{ 
              fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 36 : 48, fontWeight: 600,
              color: "#B3B3B3", lineHeight: isMobile ? "42px" : "54px", margin: "0 0 8px 0", textAlign: "center"
            }}>
              Contact Us
            </h1>
            <p style={{ 
              fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 13 : 14, fontWeight: 300,
              color: "#000", margin: 0, textAlign: "center"
            }}>
              Get quick responses and support
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Container */}
      <div style={{ padding: isMobile ? "24px 16px 60px 16px" : "40px 24px 80px 24px" }}>
        <div style={{ 
          maxWidth: 1100, margin: "0 auto", background: "rgba(226, 233, 244, 0.5)", 
          borderRadius: 28, padding: isMobile ? "32px 20px" : "80px 60px", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 40 : 80
        }}>
          {/* Left: Contact Info */}
          <div style={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
            <p style={{ 
              fontFamily: "'Poppins', sans-serif", fontSize: 16, fontWeight: 300,
              color: "#2F3E5A", margin: "0 0 8px 0"
            }}>
              We are here to help you
            </p>
            <h2 style={{ 
              fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 36 : 48, fontWeight: 300,
              color: "#2F3E5A", lineHeight: isMobile ? "44px" : "56px", margin: "0 0 16px 0"
            }}>
              Get in Touch
            </h2>
            <p style={{ 
              fontFamily: "'Poppins', sans-serif", fontSize: 16, fontWeight: 300,
              color: "#5D5D5E", lineHeight: "22px", margin: isMobile ? "0 auto 32px auto" : "0 0 32px 0",
              maxWidth: 280
            }}>
              Our team is available to assist you with property enquiries, inspections, and listings
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: isMobile ? "center" : "flex-start" }}>
              <div>
                <p style={{ 
                  fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 600,
                  color: "#4F5E7B", margin: "0 0 8px 0"
                }}>
                  Call Us
                </p>
                <p style={{ 
                  fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 400,
                  color: "#5D5D5E", margin: 0, lineHeight: 1.6
                }}>
                  Speak directly with our team +234 XXX XXX XXXX
                </p>
              </div>

              <div>
                <p style={{ 
                  fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 600,
                  color: "#4F5E7B", margin: "0 0 8px 0"
                }}>
                  Chat on WhatsApp
                </p>
                <p style={{ 
                  fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 400,
                  color: "#5D5D5E", margin: "0 0 8px 0", lineHeight: 1.6
                }}>
                  Get quick responses and support
                </p>
                <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <button style={{
                    background: "#AB6430", color: "#fff", fontSize: 9, fontWeight: 600,
                    padding: "4px 16px", borderRadius: 21, border: "none", cursor: "pointer",
                    fontFamily: "'Aileron', sans-serif"
                  }}>
                    Start Chat
                  </button>
                </a>
              </div>

              <div>
                <p style={{ 
                  fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 600,
                  color: "#4F5E7B", margin: "0 0 8px 0"
                }}>
                  Email Us
                </p>
                <p style={{ 
                  fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 400,
                  color: "#5D5D5E", margin: 0, lineHeight: 1.6
                }}>
                  Send us your enquiry anytime hello@obashine.com
                </p>
              </div>

              <div>
                <p style={{ 
                  fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 600,
                  color: "#4F5E7B", margin: "0 0 8px 0"
                }}>
                  Visit Us
                </p>
                <p style={{ 
                  fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 400,
                  color: "#5D5D5E", margin: 0, lineHeight: 1.6
                }}>
                  Lagos State, Nigeria
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div style={{ flex: 1.3 }}>
            <div style={{ 
              background: "#D1DAEA", borderRadius: 24, padding: isMobile ? "40px 20px" : "60px 70px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)", position: "relative"
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
                    <circle cx="40" cy="40" r="36" fill="#2F3E5A" />
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
                    Message Sent!
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
                <div>
                  <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 16, marginBottom: 20 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ 
                        display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 500,
                        color: "#898989", marginBottom: 8
                      }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        style={{
                          width: "100%", padding: "10px 18px", borderRadius: 999, 
                          border: "none", background: "#F9F8F8",
                          fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 16 : 14,
                          outline: "none", boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ 
                        display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 500,
                        color: "#898989", marginBottom: 8
                      }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        style={{
                          width: "100%", padding: "10px 18px", borderRadius: 999, 
                          border: "none", background: "#F9F8F8",
                          fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 16 : 14,
                          outline: "none", boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ 
                      display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 500,
                      color: "#898989", marginBottom: 8
                    }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: "100%", padding: "10px 18px", borderRadius: 999, 
                        border: "none", background: "#F9F8F8",
                        fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 16 : 14,
                        outline: "none", boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ 
                      display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 500,
                      color: "#898989", marginBottom: 8
                    }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%", padding: "10px 18px", borderRadius: 999, 
                        border: "none", background: "#F9F8F8",
                        fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 16 : 14,
                        outline: "none", boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 32 }}>
                    <label style={{ 
                      display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 500,
                      color: "#898989", marginBottom: 8
                    }}>
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      style={{
                        width: "100%", padding: "14px 18px", borderRadius: 24, 
                        border: "none", background: "#F9F8F8",
                        fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 16 : 14,
                        outline: "none", boxSizing: "border-box", resize: "none",
                        minHeight: 90
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {!showSuccess && (
              <form onSubmit={handleSubmit} style={{ position: "relative", zIndex: 10, marginTop: -25, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button 
                  type="submit"
                  disabled={loading}
                  style={{
                  width: isMobile ? "90%" : "70%", padding: "12px 24px", background: "#2F3E5A", color: "#97A7C7",
                  fontSize: isMobile ? 16 : 20, fontWeight: 600, borderRadius: 999, border: "none", cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  opacity: loading ? 0.6 : 1
                }}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                <p style={{ 
                  textAlign: "center", fontFamily: "'Poppins', sans-serif", fontSize: 13,
                  color: "#ACA5A5", marginTop: 12, marginBottom: 0
                }}>
                  Our team will get back to you shortly
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}