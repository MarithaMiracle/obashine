// /Users/decagon/obashine-properties/src/app/admin/analytics/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';

interface AnalyticsData {
  properties: { total: number; active: number; sold: number; rented: number };
  enquiries: { total: number; recent: number };
  bookings: { total: number; pending: number; confirmed: number; cancelled: number };
  monthlyTrends: { month: string; properties: number; enquiries: number; bookings: number }[];
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeGranularity, setTimeGranularity] = useState<'month' | 'week' | 'day'>('month');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [startDate, endDate, timeGranularity]);

  const fetchAnalytics = async () => {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      params.append('granularity', timeGranularity);
      
      const res = await fetch(`/api/admin/analytics?${params.toString()}`);
      const analyticsData = await res.json();
      setData(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

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
          Loading analytics...
        </p>
      </div>
    );
  }

  const COLORS = ['#485B7E', '#AB6430', '#97A7C7', '#2F3E5A'];

  const propertyStatusData = [
    { name: 'Active', value: data?.properties.active || 0 },
    { name: 'Sold', value: data?.properties.sold || 0 },
    { name: 'Rented', value: data?.properties.rented || 0 },
  ];

  const bookingStatusData = [
    { name: 'Pending', value: data?.bookings.pending || 0 },
    { name: 'Confirmed', value: data?.bookings.confirmed || 0 },
    { name: 'Cancelled', value: data?.bookings.cancelled || 0 },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', marginBottom: '32px', gap: '16px' }}>
        <h1 
          style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 600,
            color: '#5D5D5E',
            fontFamily: "'Poppins', sans-serif",
            margin: 0
          }}
        >
          ANALYTICS
        </h1>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
          {/* Date Range Filters */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              flex: isMobile ? '1 1 calc(50% - 18px)' : 'none',
              padding: '10px 16px',
              borderRadius: '10px',
              border: 'none',
              background: '#fff',
              fontSize: '14px',
              outline: 'none',
              fontFamily: "'Poppins', sans-serif"
            }}
          />
          <span style={{ color: '#5D5D5E', fontSize: '14px', fontFamily: "'Poppins', sans-serif" }}>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              flex: isMobile ? '1 1 calc(50% - 18px)' : 'none',
              padding: '10px 16px',
              borderRadius: '10px',
              border: 'none',
              background: '#fff',
              fontSize: '14px',
              outline: 'none',
              fontFamily: "'Poppins', sans-serif"
            }}
          />
          {/* Time Granularity */}
          <select
            value={timeGranularity}
            onChange={(e) => setTimeGranularity(e.target.value as any)}
            style={{
              flex: isMobile ? '1 1 100%' : 'none',
              padding: '10px 16px',
              borderRadius: '10px',
              border: 'none',
              background: '#fff',
              fontSize: '14px',
              outline: 'none',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            <option value="month">By Month</option>
            <option value="week">By Week</option>
            <option value="day">By Day</option>
          </select>
          {/* Refresh Button */}
          <button
            onClick={fetchAnalytics}
            style={{
              flex: isMobile ? '1 1 100%' : 'none',
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
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '12px' : '20px', marginBottom: '32px' }}>
        <div style={{ background: '#C1CDE2', borderRadius: '16px', padding: isMobile ? '16px' : '24px', border: '1px solid #8E99AC' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#5D5D5E', fontFamily: "'Poppins', sans-serif" }}>Total Properties</p>
          <p style={{ margin: '8px 0 0 0', fontSize: isMobile ? '28px' : '36px', fontWeight: 700, color: '#AB6430', fontFamily: "'Poppins', sans-serif" }}>
            {data?.properties.total || 0}
          </p>
        </div>
        <div style={{ background: '#C1CDE2', borderRadius: '16px', padding: isMobile ? '16px' : '24px', border: '1px solid #8E99AC' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#5D5D5E', fontFamily: "'Poppins', sans-serif" }}>Total Enquiries</p>
          <p style={{ margin: '8px 0 0 0', fontSize: isMobile ? '28px' : '36px', fontWeight: 700, color: '#AB6430', fontFamily: "'Poppins', sans-serif" }}>
            {data?.enquiries.total || 0}
          </p>
        </div>
        <div style={{ background: '#C1CDE2', borderRadius: '16px', padding: isMobile ? '16px' : '24px', border: '1px solid #8E99AC' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#5D5D5E', fontFamily: "'Poppins', sans-serif" }}>Total Bookings</p>
          <p style={{ margin: '8px 0 0 0', fontSize: isMobile ? '28px' : '36px', fontWeight: 700, color: '#AB6430', fontFamily: "'Poppins', sans-serif" }}>
            {data?.bookings.total || 0}
          </p>
        </div>
        <div style={{ background: '#C1CDE2', borderRadius: '16px', padding: isMobile ? '16px' : '24px', border: '1px solid #8E99AC' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#5D5D5E', fontFamily: "'Poppins', sans-serif" }}>Active Listings</p>
          <p style={{ margin: '8px 0 0 0', fontSize: isMobile ? '28px' : '36px', fontWeight: 700, color: '#AB6430', fontFamily: "'Poppins', sans-serif" }}>
            {data?.properties.active || 0}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
        {/* Property Status Pie Chart */}
        <div style={{ background: '#C1CDE2', borderRadius: '16px', padding: '24px', border: '1px solid #8E99AC' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, color: '#2F3E5A', fontFamily: "'Poppins', sans-serif" }}>
            Property Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={propertyStatusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {propertyStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Pie Chart */}
        <div style={{ background: '#C1CDE2', borderRadius: '16px', padding: '24px', border: '1px solid #8E99AC' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, color: '#2F3E5A', fontFamily: "'Poppins', sans-serif" }}>
            Booking Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={bookingStatusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {bookingStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends Line Chart */}
      <div style={{ background: '#C1CDE2', borderRadius: '16px', padding: isMobile ? '16px' : '24px', border: '1px solid #8E99AC' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, color: '#2F3E5A', fontFamily: "'Poppins', sans-serif" }}>
          Trends ({
            timeGranularity === 'day' ? 'Daily' :
            timeGranularity === 'week' ? 'Weekly' :
            'Monthly'
          })
        </h3>
        <div style={{ width: '100%', overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? '8px' : '0' }}>
          <div style={{ minWidth: isMobile ? '600px' : '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.monthlyTrends || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#8E99AC" />
                <XAxis dataKey="month" stroke="#2F3E5A" style={{ fontSize: isMobile ? '12px' : '14px' }} />
                <YAxis stroke="#2F3E5A" style={{ fontSize: isMobile ? '12px' : '14px' }} width={isMobile ? 35 : 40} />
                <Tooltip contentStyle={{ background: '#D1DAEA', border: 'none', borderRadius: '8px', fontSize: isMobile ? '12px' : '14px' }} />
                <Line type="monotone" dataKey="properties" stroke="#485B7E" strokeWidth={2} name="Properties" />
                <Line type="monotone" dataKey="enquiries" stroke="#AB6430" strokeWidth={2} name="Enquiries" />
                <Line type="monotone" dataKey="bookings" stroke="#97A7C7" strokeWidth={2} name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}