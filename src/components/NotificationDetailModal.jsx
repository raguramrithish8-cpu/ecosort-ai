import React, { useState } from 'react';
import { X, CheckCircle, Info, AlertTriangle, AlertCircle, Cpu, Wifi, FileText, Layers, ExternalLink, Image as ImageIcon, Download } from 'lucide-react';
import ReportViewerModal, { PDFPreviewModal, CSVPreviewModal } from './ReportViewerModal';
import { downloadReportPDF, downloadReportCSV } from '../utils/reportExporter';

export default function NotificationDetailModal({ notification, isOpen, onClose }) {
  const [activePdfModal, setActivePdfModal] = useState(false);
  const [activeCsvModal, setActiveCsvModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!isOpen || !notification) return null;

  const { type, title, message, date, timestamp, severity, contentType, relatedData } = notification;

  // Render Report Detail Modal
  if (contentType === 'report' || type === 'Report') {
    const reportData = relatedData || {
      id: notification.id,
      name: title || 'Waste Management Report',
      type: 'Generated Report',
      date: date || 'Sep 29, 2026',
      dataset: {
        totalWaste: '1,284 kg',
        recyclablePct: '72%',
        recoveredWeight: '856 kg',
        estimatedValue: '₹18,450',
        categories: [
          { category: 'Plastic', qty: 320, pct: 24.9, recyclable: 89, recovery: 89, value: '₹12,400' },
          { category: 'Paper', qty: 210, pct: 16.4, recyclable: 90, recovery: 90, value: '₹6,800' },
          { category: 'Organic', qty: 412, pct: 32.1, recyclable: 75, recovery: 75, value: '₹1,650' },
          { category: 'Metal', qty: 95, pct: 7.4, recyclable: 96, recovery: 96, value: '₹9,200' },
          { category: 'Glass', qty: 88, pct: 6.9, recyclable: 80, recovery: 80, value: '₹2,100' },
          { category: 'Other', qty: 159, pct: 12.4, recyclable: 18, recovery: 18, value: '₹280' },
        ]
      }
    };

    return (
      <>
        <ReportViewerModal
          report={reportData}
          isOpen={isOpen}
          onClose={onClose}
          onOpenPDF={() => setActivePdfModal(true)}
          onOpenCSV={() => setActiveCsvModal(true)}
          onDownloadPDF={() => downloadReportPDF(reportData)}
          onDownloadCSV={() => downloadReportCSV(reportData)}
        />
        <PDFPreviewModal
          report={reportData}
          isOpen={activePdfModal}
          onClose={() => setActivePdfModal(false)}
          onDownload={() => downloadReportPDF(reportData)}
        />
        <CSVPreviewModal
          report={reportData}
          isOpen={activeCsvModal}
          onClose={() => setActiveCsvModal(false)}
          onDownload={() => downloadReportCSV(reportData)}
        />
      </>
    );
  }

  // Render AI Detection Detail Modal
  if (contentType === 'detection' || type === 'AI Detection') {
    const det = relatedData || {
      type: 'Plastic Bottle',
      confidence: 96.8,
      material: 'PET Plastic',
      recyclability: 'RECYCLABLE',
      potential: 'HIGH',
      value: '₹4.20/kg',
      recommendation: 'Send this material to the plastic recycling stream. High recovery value PET plastic bottle.',
      imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80'
    };

    const statusColor = det.potential === 'HIGH' ? 'green' : det.potential === 'MEDIUM' ? 'yellow' : 'red';

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(17, 24, 39, 0.45)',
          backdropFilter: 'blur(3px)',
          zIndex: 11000,
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
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            border: '1px solid var(--color-grey-200)'
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-grey-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-grey-50)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge blue"><span className="badge-dot" />AI DETECTION NOTIFICATION</span>
              <span style={{ fontSize: 11, color: 'var(--color-grey-400)' }}>{date} · {timestamp}</span>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-grey-400)', padding: 4 }}>
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-grey-900)' }}>
                {det.type || title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--color-grey-500)', marginTop: 2 }}>{message}</p>
            </div>

            {/* Image Preview */}
            <div
              style={{
                width: '100%',
                height: 200,
                borderRadius: 12,
                overflow: 'hidden',
                background: 'var(--color-grey-100)',
                border: '1px solid var(--color-grey-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {!imgError && det.imageUrl ? (
                <img
                  src={det.imageUrl}
                  alt={det.type}
                  onError={() => setImgError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--color-grey-400)', padding: 20 }}>
                  <ImageIcon size={32} style={{ margin: '0 auto 6px' }} />
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-grey-500)' }}>Image preview</div>
                </div>
              )}
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <div style={{ padding: 12, background: 'var(--color-grey-50)', borderRadius: 8, border: '1px solid var(--color-grey-200)' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-grey-500)', uppercase: 'uppercase' }}>Confidence</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-blue-700)', marginTop: 2 }}>{det.confidence}%</div>
              </div>
              <div style={{ padding: 12, background: 'var(--color-grey-50)', borderRadius: 8, border: '1px solid var(--color-grey-200)' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-grey-500)', uppercase: 'uppercase' }}>Material</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-grey-900)', marginTop: 2 }}>{det.material}</div>
              </div>
              <div style={{ padding: 12, background: `var(--color-${statusColor}-50)`, borderRadius: 8, border: `1px solid var(--color-${statusColor}-200)` }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: `var(--color-${statusColor}-700)`, uppercase: 'uppercase' }}>Recyclability</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: `var(--color-${statusColor}-700)`, marginTop: 2 }}>{det.recyclability}</div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div style={{ padding: 14, background: 'var(--color-blue-50)', borderRadius: 10, border: '1px solid var(--color-blue-200)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-blue-700)', uppercase: 'uppercase', marginBottom: 4 }}>
                AI Recommendation
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-grey-700)', lineHeight: 1.5 }}>
                {det.recommendation}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-grey-100)', background: 'var(--color-grey-50)', textAlign: 'right', borderRadius: '0 0 16px 16px' }}>
            <button className="btn btn-primary btn-sm" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  // Render System / IoT / General Detail View
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17, 24, 39, 0.45)',
        backdropFilter: 'blur(3px)',
        zIndex: 11000,
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
          maxWidth: 520,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
          border: '1px solid var(--color-grey-200)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-grey-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-grey-50)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge blue"><span className="badge-dot" />{type.toUpperCase()}</span>
            <span style={{ fontSize: 11, color: 'var(--color-grey-400)' }}>{date} · {timestamp}</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-grey-400)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ padding: 10, borderRadius: 10, background: 'var(--color-blue-50)', color: 'var(--color-blue-600)' }}>
              {severity === 'success' ? <CheckCircle size={24} color="var(--color-green-500)" /> : <Info size={24} color="var(--color-blue-500)" />}
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-grey-900)' }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'var(--color-grey-600)', marginTop: 4, lineHeight: 1.5 }}>{message}</p>
            </div>
          </div>

          {relatedData && (
            <div style={{ padding: 14, background: 'var(--color-grey-50)', borderRadius: 10, border: '1px solid var(--color-grey-200)', fontSize: 12.5 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-grey-500)', uppercase: 'uppercase', marginBottom: 6 }}>
                Related System Component
              </div>
              <pre style={{ fontFamily: 'inherit', fontSize: 12, color: 'var(--color-grey-800)', margin: 0, whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(relatedData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-grey-100)', background: 'var(--color-grey-50)', textAlign: 'right', borderRadius: '0 0 16px 16px' }}>
          <button className="btn btn-primary btn-sm" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
