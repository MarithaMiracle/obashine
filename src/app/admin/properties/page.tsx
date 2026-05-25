'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, Image as ImageIcon, X, Upload } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  description?: string;
  location: string;
  price: number;
  type: string;
  property_type?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  status?: string;
  images?: string[];
  is_active: boolean;
  created_at: string;
}

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    type: 'sale',
    property_type: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'active',
    images: [] as string[]
  });

  useEffect(() => {
    fetchProperties();

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/admin/properties');
      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      if (result.urls) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...result.urls]
        }));
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingProperty ? 'PUT' : 'POST';
      const url = editingProperty 
        ? `/api/admin/properties/${editingProperty.id}`
        : '/api/admin/properties';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
          area: formData.area ? Number(formData.area) : null,
          is_active: formData.status === 'active',
          status: formData.status
        })
      });

      if (res.ok) {
        fetchProperties();
        setShowForm(false);
        setEditingProperty(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' });
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description || '',
      location: property.location,
      price: String(property.price),
      type: property.type,
      property_type: property.property_type || '',
      bedrooms: property.bedrooms ? String(property.bedrooms) : '',
      bathrooms: property.bathrooms ? String(property.bathrooms) : '',
      area: property.area ? String(property.area) : '',
      status: property.is_active ? 'active' : (property.status || 'active'),
      images: property.images || []
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      price: '',
      type: 'sale',
      property_type: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      status: 'active',
      images: []
    });
  };

  const filteredProperties = properties.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || p.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && p.is_active) ||
      (filterStatus === 'sold' && !p.is_active) ||
      (filterStatus === 'rented' && !p.is_active);
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px' 
      }}>
        <p style={{ 
          fontSize: '18px', 
          color: '#2F3E5A', 
          fontFamily: "'Poppins', sans-serif" 
        }}>
          Loading properties...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '16px' : '0', marginBottom: '24px' }}>
        <h1 
          style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 600,
            color: '#5D5D5E',
            fontFamily: "'Poppins', sans-serif",
            margin: 0
          }}
        >
          PROPERTY MANAGEMENT
        </h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingProperty(null); resetForm(); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '12px',
            background: '#485B7E',
            color: '#fff',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'center'
          }}
        >
          <Plus size={18} />
          {showForm ? 'Cancel' : 'Add Property'}
        </button>
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: isMobile ? '1 1 100%' : 1, maxWidth: isMobile ? '100%' : '400px' }}>
          <Search size={18} color="#5D5D5E" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search properties..."
            style={{
              width: '100%',
              padding: '12px 20px 12px 44px',
              borderRadius: '12px',
              border: 'none',
              background: '#fff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: "'Poppins', sans-serif"
            }}
          />
        </div>

        {/* Type Filter */}
        <select
          value={filterType}
          onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
          style={{
            flex: isMobile ? '1 1 calc(50% - 6px)' : 'none',
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            background: '#fff',
            fontSize: '14px',
            outline: 'none',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <option value="all">All Types</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          style={{
            flex: isMobile ? '1 1 calc(50% - 6px)' : 'none',
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            background: '#fff',
            fontSize: '14px',
            outline: 'none',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="sold">Sold</option>
          <option value="rented">Rented</option>
        </select>

        {/* Refresh Button */}
        <button
          onClick={fetchProperties}
          style={{
            flex: isMobile ? '1 1 100%' : 'none',
            padding: '12px 20px',
            borderRadius: '12px',
            background: '#485B7E',
            color: '#fff',
            border: 'none',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Refresh
        </button>
      </div>

      {/* Add/Edit Property Form */}
      {showForm && (
        <div 
          style={{
            background: '#C1CDE2',
            borderRadius: '20px',
            padding: isMobile ? '20px' : '32px',
            marginBottom: '32px',
            border: '1px solid #8E99AC'
          }}
        >
          <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 600, color: '#2F3E5A', marginBottom: '24px', fontFamily: "'Poppins', sans-serif" }}>
            {editingProperty ? 'Edit Property' : 'Add New Property'}
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: isMobile ? '1' : 'span 2' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Property Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#BECCE5',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>

            <div style={{ gridColumn: isMobile ? '1' : 'span 2' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#BECCE5',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif",
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#BECCE5',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Price (₦)
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#BECCE5',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#BECCE5',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Property Type
              </label>
              <input
                type="text"
                value={formData.property_type}
                onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                placeholder="e.g., Apartment, Duplex"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#BECCE5',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Bedrooms
              </label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#BECCE5',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Bathrooms
              </label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#BECCE5',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#BECCE5',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <option value="active">Active</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>

            {/* Image Upload */}
            <div style={{ gridColumn: isMobile ? '1' : 'span 2' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#2F3E5A', marginBottom: '12px', fontFamily: "'Poppins', sans-serif" }}>
                Property Images (Up to 5)
              </label>
              
              {/* Uploaded Images Preview */}
              {formData.images.length > 0 && (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {formData.images.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '120px', height: '100px' }}>
                      <img 
                        src={img} 
                        alt={`Property ${idx + 1}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#C62828',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              {formData.images.length < 5 && (
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px dashed #8E99AC',
                  background: '#BECCE5',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#2F3E5A',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  <Upload size={20} />
                  {uploading ? 'Uploading...' : 'Click to upload images'}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    disabled={uploading || formData.images.length >= 5}
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            <div style={{ gridColumn: isMobile ? '1' : 'span 2' }}>
              <button
                type="submit"
                disabled={uploading}
                style={{
                  width: isMobile ? '100%' : 'auto',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  background: '#AB6430',
                  color: '#fff',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  opacity: uploading ? 0.6 : 1
                }}
              >
                {uploading ? 'Please wait...' : (editingProperty ? 'Update Property' : 'Save Property')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Properties List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentItems.length === 0 ? (
          <div 
            style={{
              background: '#C1CDE2',
              borderRadius: '20px',
              padding: '60px',
              textAlign: 'center',
              border: '1px solid #8E99AC'
            }}
          >
            <ImageIcon size={64} color="#8E99AC" style={{ marginBottom: '16px' }} />
            <p style={{ fontSize: '18px', color: '#5D5D5E', fontFamily: "'Poppins', sans-serif" }}>
              No properties found
            </p>
          </div>
        ) : (
          currentItems.map((property) => (
            <div 
              key={property.id}
              style={{
                background: '#C1CDE2',
                borderRadius: '16px',
                padding: isMobile ? '16px' : '20px 24px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'stretch' : 'center',
                gap: isMobile ? '16px' : '0',
                border: '1px solid #8E99AC'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div 
                  style={{
                    width: '100px',
                    height: '80px',
                    borderRadius: '12px',
                    background: property.images?.[0] ? `url(${property.images[0]})` : '#BECCE5',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {!property.images?.[0] && <ImageIcon size={32} color="#8E99AC" />}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: isMobile ? '16px' : '18px', fontWeight: 600, color: '#2F3E5A', fontFamily: "'Poppins', sans-serif" }}>
                    {property.title}
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: isMobile ? '13px' : '14px', color: '#5D5D5E', fontFamily: "'Poppins', sans-serif" }}>
                    {property.location}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'center', justifyContent: isMobile ? 'space-between' : 'flex-end', gap: '20px', borderTop: isMobile ? '1px solid rgba(0,0,0,0.05)' : 'none', paddingTop: isMobile ? '12px' : '0' }}>
                <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                  <p style={{ margin: 0, fontSize: isMobile ? '18px' : '20px', fontWeight: 700, color: '#AB6430', fontFamily: "'Poppins', sans-serif" }}>
                    ₦{Number(property.price).toLocaleString()}
                  </p>
                  <span 
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 500,
                      background: property.is_active ? '#E8F5E9' : '#FFF3E0',
                      color: property.is_active ? '#2E7D32' : '#E65100',
                      fontFamily: "'Poppins', sans-serif",
                      marginTop: isMobile ? '4px' : '0'
                    }}
                  >
                    {property.is_active ? 'Active' : property.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(property)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background: '#485B7E',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background: '#C62828',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: isMobile ? '8px' : '12px', marginTop: '32px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={{
              padding: isMobile ? '8px 12px' : '10px 20px',
              borderRadius: '8px',
              border: '1px solid #2F3E5A',
              background: currentPage === 1 ? '#f0f0f0' : '#fff',
              color: currentPage === 1 ? '#999' : '#2F3E5A',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Prev
          </button>

          {(() => {
            const pages = [];
            const maxVisiblePages = isMobile ? 5 : 10;
            
            if (totalPages <= maxVisiblePages) {
              // Show all pages if small number
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              // Show first, current ± 1 (or 3), last
              const visibleSiblings = isMobile ? 1 : 3;
              const startPage = Math.max(1, currentPage - visibleSiblings);
              const endPage = Math.min(totalPages, currentPage + visibleSiblings);
              
              if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) pages.push('...');
              }
              
              for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
              }
              
              if (endPage < totalPages) {
                if (endPage < totalPages - 1) pages.push('...');
                pages.push(totalPages);
              }
            }
            
            return pages.map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} style={{ padding: '0 4px', color: '#5D5D5E', fontSize: '14px', fontFamily: "'Poppins', sans-serif" }}>
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  style={{
                    width: isMobile ? '32px' : '40px',
                    height: isMobile ? '32px' : '40px',
                    borderRadius: '8px',
                    border: 'none',
                    background: currentPage === page ? '#2F3E5A' : '#f0f0f0',
                    color: currentPage === page ? '#fff' : '#2F3E5A',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {page}
                </button>
              )
            ));
          })()}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: isMobile ? '8px 12px' : '10px 20px',
              borderRadius: '8px',
              border: '1px solid #2F3E5A',
              background: currentPage === totalPages ? '#f0f0f0' : '#fff',
              color: currentPage === totalPages ? '#999' : '#2F3E5A',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}