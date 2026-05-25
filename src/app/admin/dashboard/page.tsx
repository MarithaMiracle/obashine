'use client';

import { useEffect, useState } from 'react';

interface DashboardStats {
  activeListings: number;
  bookings: number;
  sold: number;
  rented: number;
  newEnquiries: number;
}

interface Enquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  type?: string;
  property_type?: string;
  property_location?: string;
  properties?: { title: string };
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    activeListings: 0,
    bookings: 0,
    sold: 0,
    rented: 0,
    newEnquiries: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch dashboard stats
      const statsRes = await fetch('/api/admin/dashboard');
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch recent enquiries
      const enquiriesRes = await fetch('/api/admin/enquiries');
      const enquiriesData = await enquiriesRes.json();
      setRecentEnquiries(enquiriesData.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsList = [
    { value: stats.activeListings, label: 'Active Listings' },
    { value: stats.bookings, label: 'Inspection Bookings' },
    { value: stats.sold, label: 'Sold Properties' },
    { value: stats.rented, label: 'Rented Properties' },
    { value: stats.newEnquiries, label: 'New Enquiries' }
  ];

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
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 
        style={{
          fontSize: isMobile ? '24px' : '36px',
          fontWeight: 600,
          color: '#5D5D5E',
          marginBottom: isMobile ? '24px' : '40px',
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        DASHBOARD OVERVIEW
      </h1>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: isMobile ? '12px' : '20px', marginBottom: isMobile ? '24px' : '40px' }}>
        {statsList.map((stat, index) => (
          <div 
            key={index}
            style={{
              background: '#C1CDE2',
              borderRadius: '20px',
              padding: isMobile ? '16px' : '24px',
              border: '1px solid #8E99AC',
              gridColumn: isMobile && index === 4 ? 'span 2' : 'auto'
            }}
          >
            <div 
              style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: 700,
                color: '#AB6430',
                marginBottom: '8px',
                lineHeight: isMobile ? '36px' : '52px',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              {stat.value}
            </div>
            <div 
              style={{
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: 500,
                color: '#2F3E5A',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div>
        <div 
          style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: 600,
            color: '#2F3E5A',
            marginBottom: '20px',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Recent Enquiries
        </div>
        <div 
          style={{
            background: '#C1CDE2',
            borderRadius: '20px',
            padding: isMobile ? '16px' : '24px',
            border: '1px solid #8E99AC'
          }}
        >
          {recentEnquiries.length === 0 ? (
            <p style={{ 
              textAlign: 'center', 
              color: '#5D5D5E', 
              fontFamily: "'Poppins', sans-serif" 
            }}>
              No recent enquiries yet
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentEnquiries.map((enquiry) => (
                <div 
                  key={enquiry.id}
                  style={{
                    background: '#BECCE5',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    gap: isMobile ? '8px' : '0'
                  }}
                >
                  <div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      color: '#2F3E5A', 
                      fontFamily: "'Poppins', sans-serif" 
                    }}>
                      {enquiry.full_name}
                    </h3>
                    <p style={{ 
                      margin: '4px 0 0 0', 
                      fontSize: '13px', 
                      color: '#5D5D5E', 
                      fontFamily: "'Poppins', sans-serif" 
                    }}>
                      {enquiry.email} {isMobile ? <br/> : '•'} {enquiry.phone}
                    </p>
                    <p style={{ 
                      margin: '6px 0 0 0', 
                      fontSize: '13px', 
                      color: '#5D5D5E', 
                      fontFamily: "'Poppins', sans-serif" 
                    }}>
                      {enquiry.type === 'contact' ? 'General Enquiry' : 
                       enquiry.type === 'sell' ? `${enquiry.property_type || 'Property'} in ${enquiry.property_location || 'Unknown Location'}` :
                       enquiry.properties?.title || 'Unknown'}
                    </p>
                  </div>
                  <div style={{ textAlign: isMobile ? 'left' : 'right', width: isMobile ? '100%' : 'auto', borderTop: isMobile ? '1px solid rgba(0,0,0,0.05)' : 'none', paddingTop: isMobile ? '8px' : '0' }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '13px', 
                      color: '#5D5D5E', 
                      fontFamily: "'Poppins', sans-serif" 
                    }}>
                      {new Date(enquiry.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}