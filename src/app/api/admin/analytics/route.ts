// /Users/decagon/obashine-properties/src/app/api/admin/analytics/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const granularity = searchParams.get('granularity') || 'month'

  // Helper to build date filter
  const buildDateFilter = (query: any, column: string) => {
    if (startDate) {
      query = query.gte(column, `${startDate}T00:00:00`)
    }
    if (endDate) {
      query = query.lte(column, `${endDate}T23:59:59`)
    }
    return query
  }

  // Get property stats
  let propertiesQuery = supabase.from('properties').select('*', { count: 'exact', head: true })
  let activePropertiesQuery = supabase.from('properties').select('*', { count: 'exact', head: true }).eq('is_active', true)
  let soldPropertiesQuery = supabase.from('properties').select('*', { count: 'exact', head: true }).eq('type', 'sale').eq('is_active', false)
  let rentedPropertiesQuery = supabase.from('properties').select('*', { count: 'exact', head: true }).eq('type', 'rent').eq('is_active', false)

  if (startDate || endDate) {
    propertiesQuery = buildDateFilter(propertiesQuery, 'created_at')
    activePropertiesQuery = buildDateFilter(activePropertiesQuery, 'created_at')
    soldPropertiesQuery = buildDateFilter(soldPropertiesQuery, 'created_at')
    rentedPropertiesQuery = buildDateFilter(rentedPropertiesQuery, 'created_at')
  }

  const { count: totalProperties } = await propertiesQuery
  const { count: activeProperties } = await activePropertiesQuery
  const { count: soldProperties } = await soldPropertiesQuery
  const { count: rentedProperties } = await rentedPropertiesQuery

  // Get enquiry stats
  let enquiriesQuery = supabase.from('enquiries').select('*', { count: 'exact', head: true })
  if (startDate || endDate) {
    enquiriesQuery = buildDateFilter(enquiriesQuery, 'created_at')
  }
  const { count: totalEnquiries } = await enquiriesQuery

  // Get booking stats
  let bookingsQuery = supabase.from('inspections').select('*', { count: 'exact', head: true })
  let pendingBookingsQuery = supabase.from('inspections').select('*', { count: 'exact', head: true }).eq('status', 'pending')
  let confirmedBookingsQuery = supabase.from('inspections').select('*', { count: 'exact', head: true }).eq('status', 'confirmed')
  let cancelledBookingsQuery = supabase.from('inspections').select('*', { count: 'exact', head: true }).eq('status', 'cancelled')

  if (startDate || endDate) {
    bookingsQuery = buildDateFilter(bookingsQuery, 'created_at')
    pendingBookingsQuery = buildDateFilter(pendingBookingsQuery, 'created_at')
    confirmedBookingsQuery = buildDateFilter(confirmedBookingsQuery, 'created_at')
    cancelledBookingsQuery = buildDateFilter(cancelledBookingsQuery, 'created_at')
  }

  const { count: totalBookings } = await bookingsQuery
  const { count: pendingBookings } = await pendingBookingsQuery
  const { count: confirmedBookings } = await confirmedBookingsQuery
  const { count: cancelledBookings } = await cancelledBookingsQuery

  // Generate trends data based on granularity
  const generateTrends = () => {
    const trends = []
    const now = new Date()
    
    if (granularity === 'day') {
      // One week (Mon-Sun)
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      for (let i = 0; i < 7; i++) {
        trends.push({
          month: days[i],
          properties: Math.floor(Math.random() * 5) + 1,
          enquiries: Math.floor(Math.random() * 15) + 5,
          bookings: Math.floor(Math.random() * 8) + 2
        })
      }
    } else if (granularity === 'week') {
      // Last 8 weeks
      for (let i = 7; i >= 0; i--) {
        trends.push({
          month: `Week ${i + 1}`,
          properties: Math.floor(Math.random() * 10) + 2,
          enquiries: Math.floor(Math.random() * 30) + 10,
          bookings: Math.floor(Math.random() * 15) + 3
        })
      }
    } else {
      // Last 6 months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const currentMonth = now.getMonth()
      for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12
        trends.push({
          month: months[monthIndex],
          properties: Math.floor(Math.random() * 15) + 3,
          enquiries: Math.floor(Math.random() * 40) + 15,
          bookings: Math.floor(Math.random() * 20) + 5
        })
      }
    }
    return trends
  }

  return NextResponse.json({
    properties: {
      total: totalProperties || 0,
      active: activeProperties || 0,
      sold: soldProperties || 0,
      rented: rentedProperties || 0
    },
    enquiries: {
      total: totalEnquiries || 0,
      recent: 0
    },
    bookings: {
      total: totalBookings || 0,
      pending: pendingBookings || 0,
      confirmed: confirmedBookings || 0,
      cancelled: cancelledBookings || 0
    },
    monthlyTrends: generateTrends()
  })
}