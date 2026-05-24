export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: 'sale' | 'rent'
  property_type: string
  bedrooms: number
  bathrooms: number
  location: string
  address: string
  images: string[]
  is_verified: boolean
  is_active: boolean
  created_at: string
}

export interface Enquiry {
  id: string
  property_id: string
  user_id: string
  full_name: string
  email: string
  phone: string
  message: string
  created_at: string
}

export interface Inspection {
  id: string
  property_id: string
  user_id: string
  full_name: string
  email: string
  phone: string
  preferred_date: string
  preferred_time: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}