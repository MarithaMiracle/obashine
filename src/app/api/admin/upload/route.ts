// /Users/decagon/obashine-properties/src/app/api/admin/upload/route.ts
import cloudinary from '@/lib/cloudinary'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploadResults = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'obashine-properties' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(buffer)
      })

      uploadResults.push((result as any).secure_url)
    }

    return NextResponse.json({ urls: uploadResults })
  } catch (error) {
    console.error('Error uploading images:', error)
    return NextResponse.json({ error: 'Failed to upload images' }, { status: 500 })
  }
}