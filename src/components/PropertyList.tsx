"use client";

// /Users/decagon/obashine-properties/src/components/PropertyList.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  type?: 'sale' | 'rent';
  limit?: number;
  itemsPerPage?: number;
}

export default function PropertyList({ type, limit, itemsPerPage = 6 }: PropertyListProps) {
  const [properties, setProperties] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchProperties();
    setCurrentPage(1);
  }, [type, searchParams]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      let query = supabase.from('properties').select('*').eq('is_active', true);
      
      if (type) {
        query = query.eq('type', type);
      }
      
      const search = searchParams.get('search');
      console.log('Search:', search);
      if (search) {
        query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
      }

      const propertyType = searchParams.get('propertyType');
      console.log('Property Type:', propertyType);
      if (propertyType) {
        query = query.ilike('property_type', `%${propertyType}%`);
      }

      const bedrooms = searchParams.get('bedrooms');
      console.log('Bedrooms:', bedrooms);
      if (bedrooms) {
        if (bedrooms === '5+') {
          query = query.gte('bedrooms', 5);
        } else {
          query = query.eq('bedrooms', Number(bedrooms));
        }
      }

      const bathrooms = searchParams.get('bathrooms');
      console.log('Bathrooms:', bathrooms);
      if (bathrooms) {
        if (bathrooms === '4+') {
          query = query.gte('bathrooms', 4);
        } else {
          query = query.eq('bathrooms', Number(bathrooms));
        }
      }

      const priceRange = searchParams.get('priceRange');
      console.log('Price Range:', priceRange);
      if (priceRange) {
        if (priceRange === '50000000+') {
          query = query.gte('price', 50000000);
        } else {
          const [min, max] = priceRange.split('-').map(Number);
          query = query.gte('price', min).lte('price', max);
        }
      }
      
      if (limit) {
        query = query.limit(limit);
      }
      
      console.log('Supabase Query:', query);
      const { data, error } = await query.order('created_at', { ascending: false });
      console.log('Supabase Error:', error);
      console.log('Fetched Properties:', data);
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#8A8B8E', fontFamily: "'Poppins', sans-serif" }}>
        Loading properties...
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#8A8B8E', fontFamily: "'Poppins', sans-serif" }}>
        No properties found
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
        {currentItems.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            image={property.images?.[0] || '/placeholder.png'}
            title={property.title}
            location={property.location}
            price={`₦${Number(property.price).toLocaleString()}`}
            type={property.type === 'sale' ? 'For Sale' : 'For Rent'}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '48px', paddingBottom: '40px' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
    </div>
  )
}