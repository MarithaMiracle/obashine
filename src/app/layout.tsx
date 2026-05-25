import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'ObaShine Properties | Verified Homes in Lagos',
  description: 'Trusted property platform with verified listings in Lagos.',
  icons: { icon: '/obashine favicon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f5f5f5]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}