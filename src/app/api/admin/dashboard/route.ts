import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  // Get active listings count
  const { count: activeListingsCount, error: activeError } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // Get inspection bookings count
  const { count: bookingsCount, error: bookingsError } = await supabase
    .from('inspections')
    .select('*', { count: 'exact', head: true })

  // Get sold count
  const { count: soldCount, error: soldError } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'sale') // Assuming 'type' indicates sale/rent
    .eq('is_active', false)

  // Get rented count
  const { count: rentedCount, error: rentedError } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'rent') // Assuming 'type' indicates sale/rent
    .eq('is_active', false)

  // Get new enquiries count
  const { count: newEnquiriesCount, error: enquiriesError } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({
    activeListings: activeListingsCount || 0,
    bookings: bookingsCount || 0,
    sold: soldCount || 0,
    rented: rentedCount || 0,
    newEnquiries: newEnquiriesCount || 0,
  })
}