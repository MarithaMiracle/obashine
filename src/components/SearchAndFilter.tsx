"use client";

// /Users/decagon/obashine-properties/src/components/SearchAndFilter.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useMediaQuery } from '@/lib/utils';

interface SearchAndFilterProps {
  variant?: 'hero' | 'default';
  page?: 'buy' | 'rent';
}

export default function SearchAndFilter({ variant = 'hero', page = 'buy' }: SearchAndFilterProps) {
  const isHero = variant === 'hero';
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    type: 'all'
  });

  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (filters.propertyType) params.set('propertyType', filters.propertyType);
    if (filters.priceRange) params.set('priceRange', filters.priceRange);
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms);
    if (filters.bathrooms) params.set('bathrooms', filters.bathrooms);
    if (filters.type !== 'all') params.set('type', filters.type);

    let targetPage = page;
    if (filters.type === 'sale') targetPage = 'buy';
    if (filters.type === 'rent') targetPage = 'rent';

    router.push(`/${targetPage}?${params.toString()}`);
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "white",
    fontSize: 14,
    color: "#2F3E5A",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#4F5E7B",
    marginBottom: 8,
  };

  // Panel position: bottom sheet on mobile, centred modal on desktop
  const panelStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        top: "auto",
        transform: "none",
        zIndex: 9999,
        background: "white",
        borderRadius: "20px 20px 0 0",
        padding: "20px 20px 40px",
        boxShadow: "0 -4px 32px rgba(0,0,0,0.18)",
        maxHeight: "85vh",
        overflowY: "auto",
        border: "none",
        width: "100%",
      }
    : {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        background: "white",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        minWidth: 320,
        maxWidth: 400,
        maxHeight: "90vh",
        overflowY: "auto",
        border: "1px solid #e5e7eb",
      };

  return (
    <div style={{ width: "100%", position: "relative", paddingLeft: isMobile ? 0 : 0, paddingRight: isMobile ? 0 : 0 }}>

      {/* Filters pill */}
      <div
        onClick={() => setShowFilters(!showFilters)}
        style={{
          position: "absolute",
          top: isMobile ? -32 : (isHero ? -38 : -35),
          right: isMobile ? 0 : (isHero ? 38 : 0),
          zIndex: 10,
          display: "flex", alignItems: "center", gap: 8,
          borderRadius: 999,
          background: isHero ? "rgba(240,240,240,0.92)" : "white",
          backdropFilter: isHero ? "blur(8px)" : "none",
          WebkitBackdropFilter: isHero ? "blur(8px)" : "none",
          padding: isMobile ? "6px 14px" : "8px 18px",
          fontSize: isMobile ? 13 : 14,
          fontWeight: 600,
          color: "#2D3A52",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          border: "1px solid rgba(255,255,255,0.6)",
          transition: "all 0.2s ease",
        }}
      >
        <span>Filters</span>
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          <circle cx="9" cy="9" r="8.5" stroke="#2D3A52" strokeWidth="1" />
          <polyline points="5.5,7 9,11 12.5,7" stroke="#2D3A52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* Backdrop */}
      {showFilters && (
        <div
          onClick={() => setShowFilters(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9998 }}
        />
      )}

      {/* Filter panel */}
      {showFilters && (
        <div style={panelStyle}>

          {/* Drag handle — mobile only */}
          {isMobile && (
            <div style={{
              width: 40, height: 4, borderRadius: 2,
              background: "#e5e7eb", margin: "0 auto 16px",
            }} />
          )}

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#2F3E5A" }}>
              Filter Properties
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
            >
              <X size={20} color="#2F3E5A" />
            </button>
          </div>

          {/* Listing Type */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Listing Type</label>
            <div style={{ display: "flex", gap: 8 }}>
              {(['all', 'sale', 'rent'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilters({ ...filters, type: t })}
                  style={{
                    padding: "6px 12px", borderRadius: 999,
                    border: filters.type === t ? "2px solid #AB6430" : "1px solid #e5e7eb",
                    background: filters.type === t ? "#AB6430" : "white",
                    color: filters.type === t ? "white" : "#2F3E5A",
                    fontSize: 12, fontWeight: 600, cursor: "pointer",
                  }}
                >
                  {t === 'all' ? 'All' : t === 'sale' ? 'For Sale' : 'For Rent'}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Property Type</label>
            <select value={filters.propertyType} onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })} style={{ ...selectStyle, fontSize: isMobile ? 16 : 14 }}>
              <option value="">All Types</option>
              <option value="flat">Flat/Apartment</option>
              <option value="duplex">Duplex</option>
              <option value="bungalow">Bungalow</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Price Range</label>
            <select value={filters.priceRange} onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })} style={{ ...selectStyle, fontSize: isMobile ? 16 : 14 }}>
              <option value="">Any Price</option>
              <option value="0-5000000">₦0 – ₦5M</option>
              <option value="5000000-10000000">₦5M – ₦10M</option>
              <option value="10000000-20000000">₦10M – ₦20M</option>
              <option value="20000000-50000000">₦20M – ₦50M</option>
              <option value="50000000+">₦50M+</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Bedrooms</label>
            <select value={filters.bedrooms} onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })} style={{ ...selectStyle, fontSize: isMobile ? 16 : 14 }}>
              <option value="">Any</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5+">5+ Bedrooms</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Bathrooms</label>
            <select value={filters.bathrooms} onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })} style={{ ...selectStyle, fontSize: isMobile ? 16 : 14 }}>
              <option value="">Any</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4+">4+ Bathrooms</option>
            </select>
          </div>

          {/* Apply */}
          <button
            onClick={() => { handleSearch(); setShowFilters(false); }}
            style={{
              width: "100%", padding: "12px 24px",
              background: "#AB6430", color: "white",
              border: "none", borderRadius: 999,
              fontSize: 16, fontWeight: 600, cursor: "pointer",
            }}
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Search box */}
      <div style={{
        borderRadius: isMobile ? 20 : (isHero ? 36 : 16),
        border: isHero ? "1px solid rgba(255,255,255,0.38)" : "1px solid #e5e7eb",
        background: isHero ? "rgba(255,255,255,0.18)" : "white",
        backdropFilter: isHero ? "blur(18px)" : "none",
        WebkitBackdropFilter: isHero ? "blur(18px)" : "none",
        padding: isMobile ? 10 : 18,
        boxShadow: isHero ? "0 8px 32px rgba(0,0,0,0.15)" : "0 4px 20px rgba(0,0,0,0.1)",
        marginBottom: isHero ? 24 : 0,
        maxWidth: isMobile ? "100%" : "none",
      }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          gap: isMobile ? 10 : 12,
        }}>
          <input
            type="text"
            placeholder="Search by location, property type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              height: isMobile ? 44 : 48,
              borderRadius: 14,
              border: "none",
              outline: "none",
              background: isHero ? "rgba(255,255,255,0.75)" : "#f9fafb",
              padding: isMobile ? "0 16px" : "0 20px",
              fontSize: isMobile ? 16 : 15,
              fontWeight: 500,
              color: "#2F3E5A",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              flexShrink: 0,
              height: isMobile ? 44 : 48,
              borderRadius: isMobile ? 14 : 25,
              border: "none",
              background: "#2F3E5A",
              padding: isMobile ? "0 24px" : "0 32px",
              fontSize: isMobile ? 15 : 16,
              fontWeight: 700,
              color: "#B8C4D4",
              cursor: "pointer",
              transition: "background 0.2s ease",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}