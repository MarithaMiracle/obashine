"use client";

// /Users/decagon/obashine-properties/src/components/SearchAndFilter.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface SearchAndFilterProps {
  variant?: 'hero' | 'default';
  page?: 'buy' | 'rent';
}

export default function SearchAndFilter({ variant = 'hero', page = 'buy' }: SearchAndFilterProps) {
  const isHero = variant === 'hero';
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
    // Navigate to correct page with search params
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

  return (
    <div style={{
      width: "100%", 
      position: "relative",
    }}>
      {/* Filters pill — overlapping top-right corner of the glassmorphic box */}
      <div 
        onClick={() => setShowFilters(!showFilters)}
        style={{
          position: "absolute",
          top: isHero ? -38 : -35,
          right: isHero ? 38 : 0,
          zIndex: 10,
          display: "flex", alignItems: "center", gap: 8,
          borderRadius: 999,
          background: isHero ? "rgba(240,240,240,0.92)" : "white",
          backdropFilter: isHero ? "blur(8px)" : "none",
          WebkitBackdropFilter: isHero ? "blur(8px)" : "none",
          padding: "8px 18px",
          fontSize: 14, fontWeight: 600, color: "#2D3A52",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          border: "1px solid rgba(255,255,255,0.6)",
          transition: "all 0.2s ease"
        }}
      >
        <span>Filters</span>
        {/* Chevron down */}
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 18 18" 
          fill="none"
          style={{ transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          <circle cx="9" cy="9" r="8.5" stroke="#2D3A52" strokeWidth="1"/>
          <polyline points="5.5,7 9,11 12.5,7" stroke="#2D3A52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      {/* Filter Backdrop */}
      {showFilters && (
        <div 
          onClick={() => setShowFilters(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9998
          }}
        />
      )}
      
      {/* Filter Panel */}
      {showFilters && (
        <div style={{
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
          border: "1px solid #e5e7eb"
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: 18, 
              fontWeight: 600, 
              color: "#2F3E5A"
            }}>
              Filter Properties
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} color="#2F3E5A" />
            </button>
          </div>
          
          {/* Type Filter */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: "block", 
              fontSize: 13, 
              fontWeight: 600, 
              color: "#4F5E7B", 
              marginBottom: 8
            }}>
              Listing Type
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <button 
                onClick={() => setFilters({...filters, type: 'all'})}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: filters.type === 'all' ? "2px solid #AB6430" : "1px solid #e5e7eb",
                  background: filters.type === 'all' ? "#AB6430" : "white",
                  color: filters.type === 'all' ? "white" : "#2F3E5A",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                All
              </button>
              <button 
                onClick={() => setFilters({...filters, type: 'sale'})}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: filters.type === 'sale' ? "2px solid #AB6430" : "1px solid #e5e7eb",
                  background: filters.type === 'sale' ? "#AB6430" : "white",
                  color: filters.type === 'sale' ? "white" : "#2F3E5A",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                For Sale
              </button>
              <button 
                onClick={() => setFilters({...filters, type: 'rent'})}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: filters.type === 'rent' ? "2px solid #AB6430" : "1px solid #e5e7eb",
                  background: filters.type === 'rent' ? "#AB6430" : "white",
                  color: filters.type === 'rent' ? "white" : "#2F3E5A",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                For Rent
              </button>
            </div>
          </div>

          {/* Property Type */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: "block", 
              fontSize: 13, 
              fontWeight: 600, 
              color: "#4F5E7B", 
              marginBottom: 8
            }}>
              Property Type
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "white",
                fontSize: 14,
                color: "#2F3E5A",
                outline: "none"
              }}
            >
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
            <label style={{ 
              display: "block", 
              fontSize: 13, 
              fontWeight: 600, 
              color: "#4F5E7B", 
              marginBottom: 8
            }}>
              Price Range
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "white",
                fontSize: 14,
                color: "#2F3E5A",
                outline: "none"
              }}
            >
              <option value="">Any Price</option>
              <option value="0-5000000">₦0 - ₦5M</option>
              <option value="5000000-10000000">₦5M - ₦10M</option>
              <option value="10000000-20000000">₦10M - ₦20M</option>
              <option value="20000000-50000000">₦20M - ₦50M</option>
              <option value="50000000+">₦50M+</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: "block", 
              fontSize: 13, 
              fontWeight: 600, 
              color: "#4F5E7B", 
              marginBottom: 8
            }}>
              Bedrooms
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "white",
                fontSize: 14,
                color: "#2F3E5A",
                outline: "none"
              }}
            >
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
            <label style={{ 
              display: "block", 
              fontSize: 13, 
              fontWeight: 600, 
              color: "#4F5E7B", 
              marginBottom: 8
            }}>
              Bathrooms
            </label>
            <select
              value={filters.bathrooms}
              onChange={(e) => setFilters({...filters, bathrooms: e.target.value})}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "white",
                fontSize: 14,
                color: "#2F3E5A",
                outline: "none"
              }}
            >
              <option value="">Any</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4+">4+ Bathrooms</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          <button 
            onClick={() => {
              handleSearch();
              setShowFilters(false);
            }}
            style={{
              width: "100%",
              padding: "12px 24px",
              background: "#AB6430",
              color: "white",
              border: "none",
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Search box */}
      <div style={{
        borderRadius: isHero ? 36 : 16,
        border: isHero ? "1px solid rgba(255,255,255,0.38)" : "1px solid #e5e7eb",
        background: isHero ? "rgba(255,255,255,0.18)" : "white",
        backdropFilter: isHero ? "blur(18px)" : "none",
        WebkitBackdropFilter: isHero ? "blur(18px)" : "none",
        padding: "18px 18px",
        boxShadow: isHero ? "0 8px 32px rgba(0,0,0,0.15)" : "0 4px 20px rgba(0,0,0,0.1)",
        marginBottom: isHero ? 24 : 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input
            type="text"
            placeholder="Search by location, property type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1, height: 50,
              borderRadius: 14, border: "none", outline: "none",
              background: isHero ? "rgba(255,255,255,0.75)" : "#f9fafb",
              padding: "0 20px",
              fontSize: 15, fontWeight: 500, color: "#2F3E5A",
            }}
          />
          <button 
            onClick={handleSearch}
            style={{
              flexShrink: 0, height: 50,
              borderRadius: 25, border: "none",
              background: "#2F3E5A",
              padding: "0 32px",
              fontSize: 16, fontWeight: 700,
              color: "#B8C4D4", cursor: "pointer",
              transition: "background 0.2s ease"
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}