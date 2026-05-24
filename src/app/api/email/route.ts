import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const { to, subject, html } = await req.json()

  const { data, error } = await resend.emails.send({
    from: 'Oba Shine Properties <no-reply@obashineproperties.com>',
    to,
    subject,
    html
  })

  if (error) return NextResponse.json({ error }, { status: 400 })
  return NextResponse.json({ data })
}