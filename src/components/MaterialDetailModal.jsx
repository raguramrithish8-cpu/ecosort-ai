import React, { useState } from 'react';
import { X, CheckCircle, Tag, TrendingUp, DollarSign, Layers, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function MaterialDetailModal({ item, isOpen, onClose }) {
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !item) return null;

  const statusColor =
    item.recoveryPotential === 'High' ? 'green' :
    item.recoveryPotential === 'Medium' || item.recoveryPotential === 'Moderate' ? 'yellow' : 'red';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(17, 24, 39, 0.45)',
        backdropFilter: 'blur(3px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: 16,
          width: '100%',
          maxWidth: 580,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid var(--color-grey-200)',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--color-grey-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-grey-50)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="badge blue">
              <span className="badge-dot" />
              {item.type || 'MATERIAL DETAIL'}
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-grey-500)' }}>
              ID: #{item.id}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-grey-400)',
              padding: 4,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition)'
            }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--color-grey-800)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--color-grey-400)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Title & Badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-grey-900)', letterSpacing: '-0.3px' }}>
                {item.title}
              </h2>
              <div style={{ fontSize: 13, color: 'var(--color-grey-500)', marginTop: 2, fontWeight: 500 }}>
                {item.material}
              </div>
            </div>
            <span className={`badge ${statusColor}`}>
              <span className="badge-dot" />
              {item.recoveryPotential} Potential
            </span>
          </div>

          {/* Image Container with Fallback */}
          <div
            style={{
              width: '100%',
              height: 220,
              borderRadius: 12,
              overflow: 'hidden',
              background: 'var(--color-grey-100)',
              border: '1px solid var(--color-grey-200)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {!imageError && item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                onError={() => setImageError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  color: 'var(--color-grey-400)',
                  padding: 20,
                  textAlign: 'center'
                }}
              >
                <ImageIcon size={36} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-grey-500)' }}>
                  Image unavailable
                </span>
                <span style={{ fontSize: 11, color: 'var(--color-grey-400)' }}>
                  {item.title} visual preview
                </span>
              </div>
            )}
          </div>

          {/* Key Attributes Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12
            }}
          >
            <div
              style={{
                padding: '12px 14px',
                background: 'var(--color-grey-50)',
                borderRadius: 8,
                border: '1px solid var(--color-grey-200)'
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-grey-500)', textTransform: 'uppercase' }}>
                Category
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-grey-900)', marginTop: 4 }}>
                {item.category}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                background: 'var(--color-grey-50)',
                borderRadius: 8,
                border: '1px solid var(--color-grey-200)'
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-grey-500)', textTransform: 'uppercase' }}>
                Material Type
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-grey-900)', marginTop: 4 }}>
                {item.material}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                background: 'var(--color-green-50)',
                borderRadius: 8,
                border: '1px solid var(--color-green-200)'
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-green-700)', textTransform: 'uppercase' }}>
                Recyclability
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-green-700)', marginTop: 4 }}>
                {item.recyclability}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                background: 'var(--color-blue-50)',
                borderRadius: 8,
                border: '1px solid var(--color-blue-200)'
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-blue-700)', textTransform: 'uppercase' }}>
                Recovery Rate
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-blue-700)', marginTop: 4 }}>
                {item.recoveryRate}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                background: 'var(--color-grey-50)',
                borderRadius: 8,
                border: '1px solid var(--color-grey-200)'
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-grey-500)', textTransform: 'uppercase' }}>
                Recovery Potential
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-grey-900)', marginTop: 4 }}>
                {item.recoveryPotential}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                background: 'var(--color-green-50)',
                borderRadius: 8,
                border: '1px solid var(--color-green-200)'
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-green-700)', textTransform: 'uppercase' }}>
                Estimated Value
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-green-700)', marginTop: 4 }}>
                {item.estimatedValue}
              </div>
            </div>
          </div>

          {/* Recommended Stream */}
          <div
            style={{
              padding: '14px 16px',
              background: 'var(--color-blue-50)',
              borderRadius: 10,
              border: '1px solid var(--color-blue-200)',
              display: 'flex',
              gap: 12,
              alignItems: 'center'
            }}
          >
            <Layers size={20} color="var(--color-blue-600)" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-blue-700)', textTransform: 'uppercase' }}>
                Recommended Processing Stream
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-grey-900)', marginTop: 2 }}>
                {item.recommendedStream}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-grey-700)', uppercase: 'uppercase', marginBottom: 6 }}>
              Description & Circular Economy Processing
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--color-grey-600)', lineHeight: 1.6 }}>
              {item.description}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--color-grey-100)',
            display: 'flex',
            justifyContent: 'flex-end',
            background: 'var(--color-grey-50)',
            borderRadius: '0 0 16px 16px'
          }}
        >
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
