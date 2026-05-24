// /Users/decagon/obashine-properties/seed.ts
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env file
config({ path: resolve(__dirname, '.env') })

// Initialize Supabase client - use service role key for full access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Get this from Supabase Dashboard → Settings → API

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is required in .env file')
}
if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required in .env file')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const mediaBase = "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media"

// Helper function to generate random data
const randomElement = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Sample data arrays
const locations = [
  'Ikoyi, Lagos', 'Lekki Phase 1, Lagos', 'Victoria Island, Lagos', 'Ajah, Lagos',
  'Surulere, Lagos', 'Gbagada, Lagos', 'Ikeja, Lagos', 'Maryland, Lagos',
  'Yaba, Lagos', 'Festac, Lagos', 'Magodo, Lagos', 'Isolo, Lagos',
  'Mushin, Lagos', 'Ogba, Lagos', 'Shomolu, Lagos', 'Apapa, Lagos',
  'Chevron, Lagos', 'Osapa London, Lagos', 'Ikota, Lagos', 'Awoyaya, Lagos',
  'Epe, Lagos', 'Abule Egba, Lagos', 'Banana Island, Lagos', 'Ibeju-Lekki, Lagos'
];

const propertyTypes = ['Apartment', 'Duplex', 'Bungalow', 'Land', 'Detached', 'Terrace Duplex', 'Penthouse', 'Studio'];
const firstNames = ['Adewale', 'Fatima', 'Chidera', 'Ibrahim', 'Blessing', 'Kehinde', 'Taiwo', 'Amarachi', 'Tunde', 'Bola', 'Funke', 'Segun', 'Ngozi', 'Emeka', 'Ifeyinwa', 'Damilola', 'Aisha', 'Musa', 'Joy', 'Paul'];
const lastNames = ['Johnson', 'Abdullahi', 'Nwankwo', 'Okonkwo', 'Adebayo', 'Olawale', 'Chukwu', 'Eze', 'Kolawole', 'Okafor', 'Mohammed', 'Yusuf', 'Ogunleye', 'Nnamani', 'Adewusi', 'Balogun', 'Onyekachi', 'Udeh', 'Okafor', 'Nwosu'];
const messages = [
  'I am interested in this property. Can I schedule a viewing?',
  'Is this property still available? Please contact me.',
  'What is the price negotiation like for this property?',
  'I would like to know more about the amenities.',
  'Can I get the exact address of this property?',
  'Are pets allowed in this property?',
  'What is the minimum rental period?',
  'Does this property come with a parking space?',
  'I am ready to make an offer, what is the process?',
  'Can you send me more photos of this property?',
  'What are the service charges like?',
  'Is this property in a secure area?',
  'How far is the nearest shopping center?',
  'Are there any schools nearby?',
  'What is the water supply situation?',
  'Does this property have a generator?',
  'Is there a gym or pool in the estate?',
  'What is the condition of the property?',
  'Can I schedule an inspection for tomorrow?',
  'I have a large family, is this property suitable?'
];

const preferredTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const statuses = ['pending', 'confirmed', 'cancelled'] as const;
const propertyStatuses = ['active', 'sold', 'rented'] as const;

// Exact 6 properties from property details page
const exactProperties = [
  {
    title: '4 Bedroom Terrace Duplex',
    description: '4-bedroom duplex in secure Ikoyi. Spacious living areas, fitted kitchen, en-suite rooms, parking, modern finishes.',
    price: 180000000,
    type: 'sale',
    property_type: 'Terrace Duplex',
    bedrooms: 4,
    bathrooms: 4,
    location: 'Ikoyi, Lagos',
    address: '123 Banana Island Road, Ikoyi',
    images: [
      `${mediaBase}/c134b360e96b5439047a88f9a5edc2080256cf23d7b2e1ebd991febd93e5798d.png`,
      `${mediaBase}/a2abf01e8ac99104b184310cbb7dc033f7ffb937f54cec80c22b3bfd21c83adb.png`,
      `${mediaBase}/46cb4862ec9ac523cff79d5e786d294521a0587e149e443fc4d54cb92d3f2982.png`,
      `${mediaBase}/d81a91e7c79e498dde716982903cf04880ace9eb23a7b37d79c8b54e45627269.png`,
      `${mediaBase}/218f64294d1d2580685762afa68c59785d92e9479097e814ae3015aad2bfa6e8.png`
    ],
    is_verified: true,
    is_active: true
  },
  {
    title: '4 Bedroom Duplex',
    description: 'Spacious 4-bedroom duplex in a serene estate in Lekki Phase 1. Great for families seeking comfort and security.',
    price: 19200000,
    type: 'rent',
    property_type: 'Duplex',
    bedrooms: 4,
    bathrooms: 3,
    location: 'Lekki Phase 1, Lagos',
    address: '45 Admiralty Way, Lekki Phase 1',
    images: [
      `${mediaBase}/f67ddb3a48feb66f9252383f2aaab62cd4837b13fe51c0764aa4a50cd1927ec1.png`,
      `${mediaBase}/c134b360e96b5439047a88f9a5edc2080256cf23d7b2e1ebd991febd93e5798d.png`,
      `${mediaBase}/a2abf01e8ac99104b184310cbb7dc033f7ffb937f54cec80c22b3bfd21c83adb.png`,
      `${mediaBase}/46cb4862ec9ac523cff79d5e786d294521a0587e149e443fc4d54cb92d3f2982.png`,
      `${mediaBase}/218f64294d1d2580685762afa68c59785d92e9479097e814ae3015aad2bfa6e8.png`
    ],
    is_verified: true,
    is_active: true
  },
  {
    title: '3 Bedroom Apartment',
    description: 'Modern 3-bedroom apartment on Victoria Island with luxury amenities. Perfect for professionals and executives.',
    price: 17000000,
    type: 'rent',
    property_type: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    location: 'Victoria Island, Lagos',
    address: '78 Akin Adesola Street, Victoria Island',
    images: [
      `${mediaBase}/3c86bb0f093ed7672fd136471ed2b99b24d32162b5ed521c9d235694b771b862.png`,
      `${mediaBase}/f67ddb3a48feb66f9252383f2aaab62cd4837b13fe51c0764aa4a50cd1927ec1.png`,
      `${mediaBase}/c134b360e96b5439047a88f9a5edc2080256cf23d7b2e1ebd991febd93e5798d.png`,
      `${mediaBase}/d81a91e7c79e498dde716982903cf04880ace9eb23a7b37d79c8b54e45627269.png`,
      `${mediaBase}/218f64294d1d2580685762afa68c59785d92e9479097e814ae3015aad2bfa6e8.png`
    ],
    is_verified: true,
    is_active: true
  },
  {
    title: '3 Bedroom Bungalow',
    description: 'Well-finished 3-bedroom bungalow in a quiet neighbourhood in Ajah. Suitable for families looking for affordable comfort.',
    price: 12000000,
    type: 'rent',
    property_type: 'Bungalow',
    bedrooms: 3,
    bathrooms: 2,
    location: 'Ajah, Lagos',
    address: '123 Ajah Road, Ajah',
    images: [
      `${mediaBase}/6d7929fefd98864e7550b34ca7e187ae675b63d681fc03c6a5dabc674f1a5d06.png`,
      `${mediaBase}/3c86bb0f093ed7672fd136471ed2b99b24d32162b5ed521c9d235694b771b862.png`,
      `${mediaBase}/a2abf01e8ac99104b184310cbb7dc033f7ffb937f54cec80c22b3bfd21c83adb.png`,
      `${mediaBase}/46cb4862ec9ac523cff79d5e786d294521a0587e149e443fc4d54cb92d3f2982.png`,
      `${mediaBase}/d81a91e7c79e498dde716982903cf04880ace9eb23a7b37d79c8b54e45627269.png`
    ],
    is_verified: true,
    is_active: true
  },
  {
    title: '5 Bedroom Detached',
    description: 'Premium 5-bedroom fully detached home in Ikoyi with BQ, smart home features, and a private pool. A rare find.',
    price: 85000000,
    type: 'sale',
    property_type: 'Detached',
    bedrooms: 5,
    bathrooms: 5,
    location: 'Ikoyi, Lagos',
    address: '456 Ikoyi Road, Ikoyi',
    images: [
      `${mediaBase}/a9585637ed6ad5ae736ccfdc13740cbd2067ef70d910686116771ef57a3688bd.png`,
      `${mediaBase}/6d7929fefd98864e7550b34ca7e187ae675b63d681fc03c6a5dabc674f1a5d06.png`,
      `${mediaBase}/c134b360e96b5439047a88f9a5edc2080256cf23d7b2e1ebd991febd93e5798d.png`,
      `${mediaBase}/f67ddb3a48feb66f9252383f2aaab62cd4837b13fe51c0764aa4a50cd1927ec1.png`,
      `${mediaBase}/218f64294d1d2580685762afa68c59785d92e9479097e814ae3015aad2bfa6e8.png`
    ],
    is_verified: true,
    is_active: true
  },
  {
    title: 'Plot of Land',
    description: 'Prime plot of land in Epe with all documents intact. Ideal for residential or commercial development.',
    price: 5000000,
    type: 'sale',
    property_type: 'Land',
    bedrooms: null,
    bathrooms: null,
    location: 'Epe, Lagos',
    address: '789 Epe Road, Epe',
    images: [
      `${mediaBase}/1d33d8145e115620f4933d3c93d11458d4f503188439eece399d2eaa72087e72.png`,
      `${mediaBase}/a9585637ed6ad5ae736ccfdc13740cbd2067ef70d910686116771ef57a3688bd.png`,
      `${mediaBase}/3c86bb0f093ed7672fd136471ed2b99b24d32162b5ed521c9d235694b771b862.png`,
      `${mediaBase}/46cb4862ec9ac523cff79d5e786d294521a0587e149e443fc4d54cb92d3f2982.png`,
      `${mediaBase}/d81a91e7c79e498dde716982903cf04880ace9eb23a7b37d79c8b54e45627269.png`
    ],
    is_verified: true,
    is_active: true
  }
];

// Exact 5 images from property details page
const exactImages = [
  `${mediaBase}/c134b360e96b5439047a88f9a5edc2080256cf23d7b2e1ebd991febd93e5798d.png`,
  `${mediaBase}/a2abf01e8ac99104b184310cbb7dc033f7ffb937f54cec80c22b3bfd21c83adb.png`,
  `${mediaBase}/46cb4862ec9ac523cff79d5e786d294521a0587e149e443fc4d54cb92d3f2982.png`,
  `${mediaBase}/d81a91e7c79e498dde716982903cf04880ace9eb23a7b37d79c8b54e45627269.png`,
  `${mediaBase}/218f64294d1d2580685762afa68c59785d92e9479097e814ae3015aad2bfa6e8.png`
];

// Generate 114 more properties to make total 120
const additionalProperties = Array.from({ length: 114 }, () => {
  const type = randomElement(['sale', 'rent']);
  const basePrice = type === 'sale' ? randomInt(5000000, 500000000) : randomInt(500000, 20000000);
  const status = randomElement(['active', 'active', 'active', 'active', 'sold', 'rented']);
  
  return {
    title: `${randomInt(1, 6)} Bedroom ${randomElement(propertyTypes)}`,
    description: `Beautiful ${randomInt(1, 6)}-bedroom ${randomElement(propertyTypes)} in a prime location. Features include modern finishes, ample parking, and excellent security. Perfect for families or professionals.`,
    price: basePrice,
    type,
    property_type: randomElement(propertyTypes),
    bedrooms: randomInt(1, 6),
    bathrooms: randomInt(1, 5),
    location: randomElement(locations),
    address: `${randomInt(1, 500)} ${randomElement(['Adeola Odeku', 'Marina', 'Ajose Adeogun', 'Admiralty Way', 'Lekki-Epe', 'Victoria Island', 'Awolowo', 'Ikorodu', 'Obafemi Awolowo'])} Street`,
    images: exactImages, // Use exact 5 images for all properties
    is_verified: randomElement([true, true, true, false]),
    is_active: status === 'active'
  };
});

// Combine exact properties + additional properties
const testProperties = [...exactProperties, ...additionalProperties];

// Generate 250 enquiries
const testEnquiries = Array.from({ length: 250 }, () => ({
  property_id: '', // Will be set after inserting properties
  full_name: `${randomElement(firstNames)} ${randomElement(lastNames)}`,
  email: `${randomElement(firstNames).toLowerCase()}.${randomElement(lastNames).toLowerCase()}${randomInt(1, 99)}@example.com`,
  phone: `080${randomInt(10000000, 99999999)}`,
  message: randomElement(messages)
}));

// Generate 180 bookings
const testBookings = Array.from({ length: 180 }, () => {
  const year = 2026;
  const month = randomInt(1, 12);
  const day = randomInt(1, month === 2 ? 28 : (month === 4 || month === 6 || month === 9 || month === 11 ? 30 : 31));
  const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  
  return {
    property_id: '', // Will be set after inserting properties
    full_name: `${randomElement(firstNames)} ${randomElement(lastNames)}`,
    email: `${randomElement(firstNames).toLowerCase()}.${randomElement(lastNames).toLowerCase()}${randomInt(1, 99)}@example.com`,
    phone: `080${randomInt(10000000, 99999999)}`,
    preferred_date: date,
    preferred_time: randomElement(preferredTimes),
    status: randomElement(statuses)
  };
});

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...')

    // 1. Insert test properties (in batches of 50 for large datasets)
    console.log('🏠 Inserting properties...')
    const propertyBatches = []
    for (let i = 0; i < testProperties.length; i += 50) {
      propertyBatches.push(testProperties.slice(i, i + 50))
    }
    
    let allProperties: any[] = []
    for (const batch of propertyBatches) {
      const { data: properties, error: propertiesError } = await supabase
        .from('properties')
        .insert(batch)
        .select()
      
      if (propertiesError) throw propertiesError
      allProperties = allProperties.concat(properties || [])
    }
    console.log(`✅ Inserted ${allProperties.length} properties`)

    // Set random property IDs for enquiries
    testEnquiries.forEach((enquiry) => {
      const randomProperty = randomElement(allProperties)
      enquiry.property_id = randomProperty.id
    })

    // Set random property IDs for bookings
    testBookings.forEach((booking) => {
      const randomProperty = randomElement(allProperties)
      booking.property_id = randomProperty.id
    })

    // 2. Insert test enquiries (in batches of 50)
    console.log('📧 Inserting enquiries...')
    const enquiryBatches = []
    for (let i = 0; i < testEnquiries.length; i += 50) {
      enquiryBatches.push(testEnquiries.slice(i, i + 50))
    }
    
    let allEnquiries: any[] = []
    for (const batch of enquiryBatches) {
      const { data: enquiries, error: enquiriesError } = await supabase
        .from('enquiries')
        .insert(batch)
        .select()
      
      if (enquiriesError) throw enquiriesError
      allEnquiries = allEnquiries.concat(enquiries || [])
    }
    console.log(`✅ Inserted ${allEnquiries.length} enquiries`)

    // 3. Insert test bookings (inspections) (in batches of 50)
    console.log('📅 Inserting bookings...')
    const bookingBatches = []
    for (let i = 0; i < testBookings.length; i += 50) {
      bookingBatches.push(testBookings.slice(i, i + 50))
    }
    
    let allBookings: any[] = []
    for (const batch of bookingBatches) {
      const { data: bookings, error: bookingsError } = await supabase
        .from('inspections')
        .insert(batch)
        .select()
      
      if (bookingsError) throw bookingsError
      allBookings = allBookings.concat(bookings || [])
    }
    console.log(`✅ Inserted ${allBookings.length} bookings`)

    console.log('🎉 Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()