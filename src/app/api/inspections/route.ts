import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('Inspection booking request received!')
  const supabase = await createClient()
  const inspection = await request.json()
  console.log('Inserting inspection:', inspection)
  const { data, error } = await supabase.from('inspections').insert([inspection]).select()
  if (error) {
    console.error('Error inserting inspection:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  console.log('Successfully inserted inspection:', data)
  return NextResponse.json(data[0])
}