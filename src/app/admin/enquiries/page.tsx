// /Users/decagon/obashine-properties/src/app/admin/enquiries/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface Enquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  message?: string;
  property_type?: string;
  property_location?: string;
  type?: 'contact' | 'sell';
  created_at: string;
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'contact' | 'sell'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/admin/enquiries');
      const data = await res.json();
      console.log('Enquiries data:', data);
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    console.log('Enquiry type:', e.type, 'Active tab:', activeTab);
    const matchesSearch = 
      e.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery);
    const enquiryType = e.type || 'contact';
    const matchesTab = activeTab === 'all' || enquiryType === activeTab;
    return matchesSearch && matchesTab;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

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
          Loading enquiries...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: '#5D5D5E',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            ENQUIRY MANAGEMENT
          </h1>
          <button
            onClick={fetchEnquiries}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: '#485B7E',
              color: '#fff',
              border: 'none',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Refresh
          </button>
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {(['all', 'contact', 'sell'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                border: 'none',
                background: activeTab === tab ? '#2F3E5A' : '#E2E9F4',
                color: activeTab === tab ? '#fff' : '#2F3E5A',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                textTransform: 'capitalize'
              }}
            >
              {tab === 'all' ? 'All Enquiries' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px' }}>
        <Search size={18} color="#5D5D5E" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          placeholder="Search enquiries..."
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

      {/* Enquiries List */}
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
              No enquiries yet
            </p>
          </div>
        ) : (
          currentItems.map((enquiry) => (
            <div 
              key={enquiry.id}
              style={{
                background: '#C1CDE2',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #8E99AC'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '18px', 
                    fontWeight: 600, 
                    color: '#2F3E5A', 
                    fontFamily: "'Poppins', sans-serif" 
                  }}>
                    {enquiry.full_name}
                  </h3>
                  <p style={{ 
                    margin: '4px 0 0 0', 
                    fontSize: '14px', 
                    color: '#5D5D5E', 
                    fontFamily: "'Poppins', sans-serif" 
                  }}>
                    {enquiry.email} • {enquiry.phone}
                  </p>

                  {enquiry.property_type && (
                    <p style={{ 
                      margin: '4px 0 0 0', 
                      fontSize: '14px', 
                      color: '#2F3E5A', 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500
                    }}>
                      Property Type: {enquiry.property_type}
                    </p>
                  )}
                  {enquiry.property_location && (
                    <p style={{ 
                      margin: '4px 0 0 0', 
                      fontSize: '14px', 
                      color: '#2F3E5A', 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500
                    }}>
                      Location: {enquiry.property_location}
                    </p>
                  )}
                  {enquiry.message && (
                    <p style={{ 
                      margin: '12px 0 0 0', 
                      fontSize: '14px', 
                      color: '#5D5D5E', 
                      fontFamily: "'Poppins', sans-serif",
                      lineHeight: '1.6'
                    }}>
                      {enquiry.message}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '13px', 
                    color: '#5D5D5E', 
                    fontFamily: "'Poppins', sans-serif" 
                  }}>
                    {new Date(enquiry.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '32px' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '10px 20px',
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
              padding: '10px 20px',
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