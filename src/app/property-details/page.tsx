// /Users/decagon/obashine-properties/src/app/property-details/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchAndFilter from '@/components/SearchAndFilter';
import { createClient } from '@/lib/supabase/client';

const mediaBase = "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: string;
  description?: string;
  property_type?: string;
  bedrooms?: number;
  bathrooms?: number;
  images?: string[];
}

const ITEMS_PER_PAGE = 5;

function PropertyCard({ property }: { property: Property }) {
  // Add a features string since our seeded properties don't have a features column
  const features = [
    property.bedrooms && `${property.bedrooms} Bedrooms`,
    property.bathrooms && `${property.bathrooms} Bathrooms`,
    property.property_type && property.property_type
  ].filter(Boolean).join(' • ');

  const [activeIndex, setActiveIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const images = property.images || [];
  const activeImage = images[activeIndex] || '';
  const thumbnails = images.filter((_, i) => i !== activeIndex).slice(0, 4);

  const handleBookingSubmit = async () => {
    const dataToSend = {
      ...bookingForm,
      property_id: property.id
    };
    console.log('Sending inspection booking:', dataToSend);
    setBookingLoading(true);
    try {
      const res = await fetch('/api/inspections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (res.ok) {
        setShowBookingSuccess(true);
        setShowBookingForm(false);
        setBookingForm({
          full_name: '',
          email: '',
          phone: '',
          preferred_date: '',
          preferred_time: ''
        });
        setTimeout(() => {
          setShowBookingSuccess(false);
        }, 4000);
      }
    } catch (error) {
      console.error('Error booking inspection:', error);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 60, position: 'relative' }}>
      <div style={{ display: "flex", gap: 32, justifyContent: "center", marginBottom: showBookingForm ? 20 : 60, flexWrap: 'wrap' }}>
        {/* Left - Main Image */}
        <div style={{ width: 550, flexShrink: 0, position: "relative", height: 550 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 21, overflow: "visible" }}>
            <Image src={activeImage} alt={property.title} fill style={{ objectFit: "cover", borderRadius: 21 }} />
            
            {/* Verified Badge */}
            <div style={{
              position: "absolute", right: -16, top: -16, zIndex: 20,
              width: 50, height: 50,
            }}>
              <img
                src={`${mediaBase}/ae496f9ef257bbc55871511540d0896c688b180e4eaf8dc0186ba5703d00d02b.png`}
                alt="Verified"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
            style={{
              position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
              width: 56, height: 56, border: "none", cursor: "pointer",
              background: "rgba(255,255,255,0.9)", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#2F3E5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Middle - Thumbnails */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: 550 }}>
          {thumbnails.map((src, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(images.indexOf(src))}
              style={{ position: "relative", width: 120, height: 120, borderRadius: 16, overflow: "hidden", cursor: "pointer" }}
            >
              <Image src={src} alt={`Thumbnail ${i + 1}`} fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>

        {/* Right - Info Panel */}
        <div style={{ width: 420, flexShrink: 0, height: 550, overflow: "hidden", borderRadius: 21 }}>
          <div style={{
            background: "rgba(237,237,237,1)", padding: "28px 24px", height: "100%",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            boxSizing: "border-box",
          }}>
            <div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 400, color: "rgba(137,137,137,1)" }}>Price</p>
              <p style={{ margin: "6px 0 0 0", fontSize: 34, fontWeight: 700, color: "rgba(37,45,60,1)" }}>₦{Number(property.price).toLocaleString()}</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 400, color: "rgba(137,137,137,1)" }}>Title</p>
              <p style={{ margin: "6px 0 0 0", fontSize: 20, fontWeight: 600, color: "rgba(37,45,60,1)" }}>{property.title}</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 400, color: "rgba(137,137,137,1)" }}>Location</p>
              <p style={{ margin: "6px 0 0 0", fontSize: 20, fontWeight: 600, color: "rgba(37,45,60,1)" }}>{property.location}</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 400, color: "rgba(137,137,137,1)", marginBottom: "8px" }}>Features:</p>
              <div style={{ fontSize: 16, fontWeight: 500, color: "rgba(37,45,60,1)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                {features}
              </div>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 400, color: "rgba(137,137,137,1)", marginBottom: "8px" }}>Description:</p>
              <div style={{ fontSize: 15, fontWeight: 400, color: "rgba(37,45,60,1)", lineHeight: 1.7 }}>
                {property.description}
              </div>
            </div>
            <button
              onClick={() => setShowBookingForm(!showBookingForm)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: '#AB6430',
                color: '#fff',
                border: 'none',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              {showBookingForm ? 'Cancel' : 'Schedule Inspection'}
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Inspection Form */}
      {showBookingSuccess && (
        <div 
          style={{
            maxWidth: '500px',
            margin: '0 auto 60px',
            background: '#D1DAEA',
            borderRadius: '20px',
            padding: '40px 32px',
            border: '1px solid #8E99AC',
            textAlign: 'center'
          }}
        >
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
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: 'pulse 0.8s ease-in-out infinite', margin: '0 auto' }}>
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
            margin: '24px 0 8px 0', 
            fontSize: '24px', 
            fontWeight: 600, 
            color: '#2F3E5A', 
            fontFamily: "'Poppins', sans-serif" 
          }}>
            Inspection Booked!
          </h3>
          <p style={{ 
            margin: '0', 
            fontSize: '16px', 
            color: '#5D5D5E', 
            fontFamily: "'Poppins', sans-serif" 
          }}>
            Our team will confirm your inspection shortly
          </p>
        </div>
      )}
      {showBookingForm && (
        <div 
          style={{
            maxWidth: '500px',
            margin: '0 auto 60px',
            background: '#D1DAEA',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid #8E99AC'
          }}
        >
          <h3 style={{ 
            margin: '0 0 24px 0', 
            fontSize: '24px', 
            fontWeight: 600, 
            color: '#2F3E5A', 
            fontFamily: "'Poppins', sans-serif" 
          }}>
            Schedule an Inspection
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={bookingForm.full_name}
                onChange={(e) => setBookingForm({ ...bookingForm, full_name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#C1CDE2',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Email
              </label>
              <input
                type="email"
                required
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#C1CDE2',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Phone
              </label>
              <input
                type="tel"
                required
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#C1CDE2',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={bookingForm.preferred_date}
                onChange={(e) => setBookingForm({ ...bookingForm, preferred_date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#C1CDE2',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Preferred Time
              </label>
              <select
                required
                value={bookingForm.preferred_time}
                onChange={(e) => setBookingForm({ ...bookingForm, preferred_time: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#C1CDE2',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <option value="">Select a time</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleBookingSubmit}
              disabled={bookingLoading}
              style={{
                padding: '14px 32px',
                borderRadius: '12px',
                background: '#2F3E5A',
                color: '#fff',
                border: 'none',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                opacity: bookingLoading ? 0.6 : 1
              }}
            >
              {bookingLoading ? 'Booking...' : 'Book Inspection'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertyDetailsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProperties = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    fetchProperties();
  }, []);

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const paginated = properties.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <main style={{ overflowX: "hidden", background: "#fff" }}>
      {/* Hero Section */}
      <section style={{
        width: 1416, maxWidth: "100%", margin: "0 auto",
        height: 443, position: "relative", borderRadius: 21, overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      }}>
        <Image
          src={`${mediaBase}/72e6266a8043ac4be41784b949433b7355ef0db726aa4bc588c03daf9e467bea.png`}
          alt="Property Hero"
          fill
          style={{ objectFit: "cover", filter: "saturate(1.06)" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src={`${mediaBase}/a788ca5c2e740fc75b2dadfc8cb85b31adc9608c702eaab531cf477141ab1eda.png`}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(45,58,82,1) 0%, rgba(115,115,115,0.36) 75.481%)",
        }} />
        <div style={{ position: "relative", zIndex: 3, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: 900, position: "relative" }}>
            <SearchAndFilter page="/buy" />
          </div>
        </div>
      </section>

      {/* Properties List */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "80px 24px 0" }}>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 48, fontWeight: 600,
          color: "#2F3E5A", textAlign: "center", lineHeight: "47px",
          margin: "0 0 48px 0",
        }}>
          Property Details
        </h2>

        {isClient && properties.length === 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '200px' 
          }}>
            <p style={{ 
              fontSize: '18px', 
              color: '#2F3E5A', 
              fontFamily: "'Poppins', sans-serif" 
            }}>
              Loading properties...
            </p>
          </div>
        )}

        {paginated.map((property, index) => (
          <div key={property.id}>
            <PropertyCard property={property} />
            {index < paginated.length - 1 && (
              <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '0 0 60px 0' }} />
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', padding: '20px 0 80px' }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '10px 20px', borderRadius: '8px', border: '1px solid #2F3E5A',
              background: currentPage === 1 ? '#f0f0f0' : '#fff',
              color: currentPage === 1 ? '#999' : '#2F3E5A',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px', fontWeight: 500, fontFamily: "'Poppins', sans-serif",
            }}
          >
            Previous
          </button>

          {(() => {
            const pages = [];
            const maxVisiblePages = 10;
            
            if (totalPages <= maxVisiblePages) {
              // Show all pages if 10 or less
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              // Show first 2, current ± 3, last 2
              const startPage = Math.max(1, currentPage - 3);
              const endPage = Math.min(totalPages, currentPage + 3);
              
              if (startPage > 1) {
                pages.push(1, 2, '...');
              }
              
              for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
              }
              
              if (endPage < totalPages - 1) {
                pages.push('...', totalPages - 1, totalPages);
              } else if (endPage < totalPages) {
                pages.push(totalPages);
              }
            }
            
            return pages.map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} style={{ padding: '0 8px', color: '#5D5D5E', fontSize: '14px', fontFamily: "'Poppins', sans-serif" }}>
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: 'none',
                    background: currentPage === page ? '#2F3E5A' : '#f0f0f0',
                    color: currentPage === page ? '#fff' : '#2F3E5A',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {page}
                </button>
              )
            ));
          })()}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '10px 20px', borderRadius: '8px', border: '1px solid #2F3E5A',
              background: currentPage === totalPages ? '#f0f0f0' : '#fff',
              color: currentPage === totalPages ? '#999' : '#2F3E5A',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '14px', fontWeight: 500, fontFamily: "'Poppins', sans-serif",
            }}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}