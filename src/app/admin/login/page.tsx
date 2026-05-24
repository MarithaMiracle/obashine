'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: '#2F3E5A',
        position: 'relative',
        overflow: 'hidden',
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
      
      {/* Content Container */}
      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px',
          minHeight: '100vh'
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '40px' }}>
          <img 
            src="https://brxpjwtisajinfhbqchs.supabase.co/storage/v1/object/public/main/media/2bdbe27c490d2d8534ad40bbad1ab3b34f5b64277cf2c67193e3e609f0f03a1c.png" 
            alt="Obashine Properties" 
            style={{ height: '89px' }}
          />
        </div>

        {/* Login Card */}
        <div 
          style={{
            background: '#D1DAEA',
            borderRadius: '24px',
            padding: '40px 60px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            maxWidth: '550px',
            width: '100%'
          }}
        >
          <h1 
            style={{
              fontSize: '44px',
              fontWeight: 500,
              color: '#2F3E5A',
              marginBottom: '40px',
              lineHeight: '50px',
              textAlign: 'center',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Welcome! <br /> Login to your account
          </h1>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Email Field */}
            <div>
              <label 
                style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#2F3E5A',
                  marginBottom: '8px',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#BECCE5',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#2F3E5A',
                  marginBottom: '8px',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 52px 14px 18px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#BECCE5',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={24} color="#2F3E5A" />
                  ) : (
                    <Eye size={24} color="#2F3E5A" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
              <button 
                type="submit"
                style={{
                  background: '#AB6430',
                  color: '#F2E1D2',
                  fontSize: '18px',
                  fontWeight: 600,
                  padding: '9px 47px',
                  borderRadius: '33px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Aileron', sans-serif"
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}