import Image from 'next/image';
import Link from 'next/link';

interface PropertyCardProps {
  id?: string;
  image: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
}

const mediaBase = "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";
const verifiedBadgeUrl = `${mediaBase}/ae496f9ef257bbc55871511540d0896c688b180e4eaf8dc0186ba5703d00d02b.png`;

export default function PropertyCard({
  id,
  image,
  title,
  location,
  price,
  type,
  bedrooms = 4,
  bathrooms = 4,
}: PropertyCardProps) {
  return (
    <Link href={id ? `/property-details?id=${id}` : "/property-details"} style={{ textDecoration: 'none' }}>
      <div style={{
        background: "#fff", borderRadius: 20, overflow: "visible", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Image area */}
        <div style={{ position: "relative", height: 220, margin: 10, borderRadius: 10, overflow: "visible", flexShrink: 0 }}>
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover", borderRadius: 10 }}
          />
          <div style={{
            position: "absolute", right: -12, top: -12, zIndex: 20,
            width: 36, height: 36,
          }}>
            <img
              src={verifiedBadgeUrl}
              alt="Verified"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>

        {/* Text area */}
        <div style={{ padding: "12px 20px 20px", display: "flex", flexDirection: "column" }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "#8A8B8E", fontFamily: "'Poppins', sans-serif" }}>{type}</p>
          <p style={{ margin: "4px 0 0 0", fontSize: 15, fontWeight: 600, color: "#2F3E5A", fontFamily: "'Poppins', sans-serif" }}>{location}</p>
          <p style={{ margin: "8px 0 0 0", fontSize: 18, fontWeight: 700, color: "#AB6430", fontFamily: "'Poppins', sans-serif" }}>{price}</p>
        </div>
      </div>
    </Link>
  );
}