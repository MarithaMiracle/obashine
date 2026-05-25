// /Users/decagon/obashine-properties/src/app/admin/bookings/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  properties?: { title: string };
  created_at: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { background: '#E8F5E9', color: '#2E7D32' };
      case 'cancelled':
        return { background: '#FFEBEE', color: '#C62828' };
      default:
        return { background: '#FFF3E0', color: '#E65100' };
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px' 
      }}>
        <p style={{ 
          fontSize: '18px', 
          color: '#2F3E5A', 
          fontFamily: "'Poppins', sans-serif" 
        }}>
          Loading bookings...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '16px' : '0', marginBottom: '24px' }}>
        <h1 
          style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 600,
            color: '#5D5D5E',
            fontFamily: "'Poppins', sans-serif",
            margin: 0
          }}
        >
          INSPECTION BOOKINGS
        </h1>
        <button
          onClick={fetchBookings}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            background: '#485B7E',
            color: '#fff',
            border: 'none',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
            width: isMobile ? '100%' : 'auto'
          }}
        >
          Refresh
        </button>
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: isMobile ? '1 1 100%' : 1, maxWidth: isMobile ? '100%' : '300px' }}>
          <Search size={18} color="#5D5D5E" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search bookings..."
            style={{
              width: '100%',
              padding: '12px 20px 12px 44px',
              borderRadius: '12px',
              border: 'none',
              background: '#fff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: "'Poppins', sans-serif"
            }}
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          style={{
            flex: isMobile ? '1 1 100%' : 'none',
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            background: '#fff',
            fontSize: '14px',
            outline: 'none',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentItems.length === 0 ? (
          <div 
            style={{
              background: '#C1CDE2',
              borderRadius: '20px',
              padding: '60px',
              textAlign: 'center',
              border: '1px solid #8E99AC'
            }}
          >
            <p style={{ fontSize: '18px', color: '#5D5D5E', fontFamily: "'Poppins', sans-serif" }}>
              No bookings yet
            </p>
          </div>
        ) : (
          currentItems.map((booking) => {
            const statusStyle = getStatusColor(booking.status);
            return (
              <div 
                key={booking.id}
                style={{
                  background: '#C1CDE2',
                  borderRadius: '16px',
                  padding: isMobile ? '16px' : '24px',
                  border: '1px solid #8E99AC'
                }}
              >
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'flex-start', gap: isMobile ? '16px' : '24px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: isMobile ? '16px' : '18px', 
                      fontWeight: 600, 
                      color: '#2F3E5A', 
                      fontFamily: "'Poppins', sans-serif" 
                    }}>
                      {booking.full_name}
                    </h3>
                    <p style={{ 
                      margin: '4px 0 0 0', 
                      fontSize: isMobile ? '13px' : '14px', 
                      color: '#5D5D5E', 
                      fontFamily: "'Poppins', sans-serif" 
                    }}>
                      {booking.email} {isMobile ? <br/> : '•'} {booking.phone}
                    </p>
                    <p style={{ 
                      margin: '8px 0 0 0', 
                      fontSize: isMobile ? '13px' : '14px', 
                      color: '#2F3E5A', 
                      fontFamily: "'Poppins', sans-serif" 
                    }}>
                      <strong>Property:</strong> {booking.properties?.title || 'Unknown'}
                    </p>
                    <p style={{ 
                      margin: '8px 0 0 0', 
                      fontSize: isMobile ? '13px' : '14px', 
                      color: '#5D5D5E', 
                      fontFamily: "'Poppins', sans-serif" 
                    }}>
                      <strong>Date:</strong> {new Date(booking.preferred_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} <br/> <strong>Time:</strong> {booking.preferred_time}
                    </p>
                  </div>
                  <div style={{ textAlign: isMobile ? 'left' : 'right', borderTop: isMobile ? '1px solid rgba(0,0,0,0.05)' : 'none', paddingTop: isMobile ? '12px' : '0', display: isMobile ? 'flex' : 'block', justifyContent: isMobile ? 'space-between' : 'flex-end', alignItems: isMobile ? 'center' : 'flex-end' }}>
                    <span 
                      style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        background: statusStyle.background,
                        color: statusStyle.color,
                        textTransform: 'capitalize',
                        fontFamily: "'Poppins', sans-serif",
                        marginBottom: isMobile ? '0' : '12px'
                      }}
                    >
                      {booking.status}
                    </span>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '13px', 
                      color: '#5D5D5E', 
                      fontFamily: "'Poppins', sans-serif" 
                    }}>
                      {new Date(booking.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: isMobile ? '8px' : '12px', marginTop: '32px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={{
              padding: isMobile ? '8px 12px' : '10px 20px',
              borderRadius: '8px',
              border: '1px solid #2F3E5A',
              background: currentPage === 1 ? '#f0f0f0' : '#fff',
              color: currentPage === 1 ? '#999' : '#2F3E5A',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Prev
          </button>

          {(() => {
            const pages = [];
            const maxVisiblePages = isMobile ? 5 : 10;
            
            if (totalPages <= maxVisiblePages) {
              // Show all pages if small number
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              // Show first, current ± 1 (or 3), last
              const visibleSiblings = isMobile ? 1 : 3;
              const startPage = Math.max(1, currentPage - visibleSiblings);
              const endPage = Math.min(totalPages, currentPage + visibleSiblings);
              
              if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) pages.push('...');
              }
              
              for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
              }
              
              if (endPage < totalPages) {
                if (endPage < totalPages - 1) pages.push('...');
                pages.push(totalPages);
              }
            }
            
            return pages.map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} style={{ padding: '0 4px', color: '#5D5D5E', fontSize: '14px', fontFamily: "'Poppins', sans-serif" }}>
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  style={{
                    width: isMobile ? '32px' : '40px',
                    height: isMobile ? '32px' : '40px',
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
              padding: isMobile ? '8px 12px' : '10px 20px',
              borderRadius: '8px',
              border: '1px solid #2F3E5A',
              background: currentPage === totalPages ? '#f0f0f0' : '#fff',
              color: currentPage === totalPages ? '#999' : '#2F3E5A',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}