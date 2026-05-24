// /Users/decagon/obashine-properties/src/app/admin/layout.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Home, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ email: string; name?: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems: NavItem[] = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <LayoutDashboard size={24} color="#fff" /> 
    },
    { 
      name: 'Properties', 
      path: '/admin/properties', 
      icon: <Home size={24} color="#fff" /> 
    },
    { 
      name: 'Enquiries', 
      path: '/admin/enquiries', 
      icon: <MessageSquare size={24} color="#fff" /> 
    },
    { 
      name: 'Bookings', 
      path: '/admin/bookings', 
      icon: <Calendar size={24} color="#fff" /> 
    },
    { 
      name: 'Analytics', 
      path: '/admin/analytics', 
      icon: <BarChart3 size={24} color="#fff" /> 
    },
  ];

  useEffect(() => {
    const supabase = createClient();
    
    // First, check current user
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAdminUser({
          email: user.email || 'admin@example.com',
          name: user.email?.split('@')[0] || 'Admin'
        });
      }
    };
    
    checkUser();
    
    // Then listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAdminUser({
          email: session.user.email || 'admin@example.com',
          name: session.user.email?.split('@')[0] || 'Admin'
        });
      } else {
        setAdminUser(null);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Don't show sidebar and header on login page
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }



  return (
    <div 
      style={{
        minHeight: '100vh',
        background: '#2F3E5A',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      {/* Background Image */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media/8575caa78bc26381e878f7c9b99ea6bffdc5c3ed92c78ba131aff511fb7da634.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.23
        }}
      />

      {/* Sidebar */}
      <div 
        style={{
          width: '280px',
          position: 'relative',
          zIndex: 1,
          padding: '32px 20px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '24px', padding: '0 10px' }}>
          <img 
            src="https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media/2bdbe27c490d2d8534ad40bbad1ab3b34f5b64277cf2c67193e3e609f0f03a1c.png" 
            alt="Obashine Properties" 
            style={{ height: '64px' }}
          />
        </div>

        {/* Divider */}
        <div 
          style={{
            height: '1px',
            background: 'rgba(151, 167, 199, 0.5)',
            marginBottom: '32px'
          }}
        />

        {/* Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  background: isActive ? 'rgba(72, 91, 126, 1)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(72, 91, 126, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div 
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: isActive ? 'rgba(60, 76, 105, 1)' : 'rgba(60, 76, 105, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </div>
                <span 
                  style={{
                    fontSize: '16px',
                    fontWeight: isActive ? 600 : 400,
                    color: '#fff',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        position: 'relative', 
        zIndex: 1, 
        padding: '32px 32px 32px 0' 
      }}>
        {/* Header */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            paddingRight: '32px'
          }}
        >
          <div />
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(217, 217, 217, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <User size={20} color="#2F3E5A" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span 
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#D1DAEA',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {adminUser?.name || 'Admin'}
                </span>
                <span 
                  style={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: 'rgba(209, 218, 234, 0.7)',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {adminUser?.email || ''}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#D1DAEA',
                background: 'transparent',
                border: '1px solid rgba(209, 218, 234, 0.3)',
                borderRadius: '12px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(209, 218, 234, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div 
          style={{
            background: '#D1DAEA',
            borderRadius: '24px',
            padding: '32px',
            marginLeft: '32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            minHeight: 'calc(100vh - 140px)'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}