// /Users/decagon/obashine-properties/src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mediaBase =
  "https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/property-details", label: "Property Details" },
  { href: "/sell-with-us", label: "Sell with Us" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div style={{ padding: "8px 32px 6px" }}>
      <div style={{
        maxWidth: 1300, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ flexShrink: 0 }}>
          <img
            src={`${mediaBase}/bef725c4d8087b3de19541c61e42028afa444338016ddd1494882e4db00dd3b3.png`}
            alt="ObaShine"
            style={{ height: 96, width: "auto", objectFit: "contain", display: "block" }}
          />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.label} href={link.href} style={{
                borderRadius: 6, padding: "5px 14px",
                fontSize: 15, fontWeight: 600, textDecoration: "none",
                background: isActive ? "#E2E9F4" : "transparent",
                color: isActive ? "#2F3E5A" : "#0F242A",
                whiteSpace: "nowrap",
              }}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" style={{
          borderRadius: 8, background: "#2D3A52",
          padding: "9px 22px", fontSize: 15, fontWeight: 700,
          color: "#F2E1D2", textDecoration: "none", flexShrink: 0,
        }}>
          Contact
        </Link>
      </div>
    </div>
  );
}