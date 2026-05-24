import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const propertyType = searchParams.get('propertyType')
  const type = searchParams.get('type')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')

  let query = supabase.from('properties').select('*').eq('is_active', true).eq('is_verified', true)

  if (search) {
    query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%,address.ilike.%${search}%`)
  }

  if (propertyType) {
    query = query.eq('property_type', propertyType)
  }

  if (type) {
    query = query.eq('type', type)
  }

  if (minPrice) {
    query = query.gte('price', parseInt(minPrice))
  }

  if (maxPrice) {
    query = query.lte('price', parseInt(maxPrice))
  }

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}