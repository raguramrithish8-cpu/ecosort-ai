import React, { useState } from 'react';
import { FileText, Download, X, Eye, FileCode, CheckCircle, ZoomIn, ZoomOut, Maximize2, Search, ArrowLeft } from 'lucide-react';

// Main In-App Report Viewer Modal
export default function ReportViewerModal({ report, isOpen, onClose, onViewPDF, onViewCSV, onDownloadPDF, onDownloadCSV }) {
  if (!isOpen || !report) return null;

  const dataset = report.dataset || {};
  const metrics = dataset.metrics || {};
  const breakdown = dataset.breakdown || [];
  const tableData = dataset.tableData || [];

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="card" style={{ width: '100%', maxWidth: 840, maxHeight: '90vh', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>

        {/* Modal Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-grey-200)', background: 'var(--color-grey-50)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-grey-900)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={20} color="var(--color-blue-600)" /> {report.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-grey-500)', marginTop: 2 }}>
              Report Date: {dataset.date || report.date} · Generated at {dataset.generatedAt || 'Today'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="badge green" style={{ fontSize: 12, padding: '4px 12px' }}>
              <CheckCircle size={13} /> COMPLETED
            </span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-grey-400)' }}>
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
            {[
              { label: 'Total Waste', val: metrics.totalWaste || '1,284 kg', color: 'var(--color-blue-600)' },
              { label: 'Recyclable Waste', val: metrics.recyclablePct || '72%', color: 'var(--color-green-600)' },
              { label: 'Material Recovered', val: metrics.materialRecovered || '856 kg', color: 'var(--color-green-600)' },
              { label: 'Estimated Value', val: metrics.estimatedValue || '₹18,450', color: 'var(--color-green-600)' },
              { label: 'Landfill Avoided', val: metrics.landfillAvoided || '624 kg', color: 'var(--color-blue-600)' }
            ].map(m => (
              <div key={m.label} style={{ background: 'var(--color-grey-50)', border: '1px solid var(--color-grey-200)', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-grey-500)' }}>{m.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: m.color, marginTop: 4 }}>{m.val}</div>
              </div>
            ))}
          </div>

          {/* Material Classification Breakdown */}
          <div className="card" style={{ boxShadow: 'none', border: '1px solid var(--color-grey-200)' }}>
            <div className="card-header" style={{ padding: '12px 16px' }}>
              <span className="card-title" style={{ fontSize: 14 }}>Material Classification Breakdown</span>
            </div>
            <div className="card-body" style={{ padding: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {breakdown.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
                    <span style={{ width: 140, fontWeight: 600, color: 'var(--color-grey-800)' }}>{b.type}</span>
                    <div className="progress-bar" style={{ flex: 1, height: 8 }}>
                      <div className="progress-fill green" style={{ width: b.pct }} />
                    </div>
                    <span style={{ width: 45, fontWeight: 700, color: 'var(--color-grey-700)', textAlign: 'right' }}>{b.pct}</span>
                    <span style={{ width: 70, color: 'var(--color-grey-500)', textAlign: 'right' }}>{b.weight}</span>
                    <span style={{ width: 80, fontWeight: 700, color: 'var(--color-green-600)', textAlign: 'right' }}>{b.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Log Table */}
          <div className="card" style={{ boxShadow: 'none', border: '1px solid var(--color-grey-200)' }}>
            <div className="card-header" style={{ padding: '12px 16px' }}>
              <span className="card-title" style={{ fontSize: 14 }}>Sample Identification Records</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ fontSize: 12 }}>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Waste Type</th>
                    <th>Confidence</th>
                    <th>Recyclability</th>
                    <th>Material</th>
                    <th>Recovery Potential</th>
                    <th>Est. Value</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i}>
                      <td>{row.time}</td>
                      <td style={{ fontWeight: 700 }}>{row.wasteType}</td>
                      <td style={{ color: 'var(--color-green-600)', fontWeight: 700 }}>{row.confidence}</td>
                      <td>
                        <span className={`badge ${row.recyclability === 'Recyclable' ? 'green' : row.recyclability === 'Compostable' ? 'yellow' : 'red'}`} style={{ fontSize: 11 }}>
                          {row.recyclability}
                        </span>
                      </td>
                      <td>{row.material}</td>
                      <td>{row.potential}</td>
                      <td style={{ fontWeight: 700, color: 'var(--color-green-600)' }}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid var(--color-grey-200)', background: 'var(--color-grey-50)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline" onClick={() => onViewPDF(report)}>
              <Eye size={14} /> View PDF
            </button>
            <button className="btn btn-outline" onClick={() => onViewCSV(report)}>
              <FileCode size={14} /> View CSV
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={() => onDownloadPDF(report)}>
              <Download size={14} /> Download PDF
            </button>
            <button className="btn btn-primary" onClick={() => onDownloadCSV(report)}>
              <Download size={14} /> Download CSV
            </button>
            <button className="btn btn-outline" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// PDF Preview Modal
export function PDFPreviewModal({ report, isOpen, onClose, onDownloadPDF }) {
  const [zoom, setZoom] = useState(100);
  const [page, setPage] = useState(1);

  if (!isOpen || !report) return null;

  const dataset = report.dataset || {};
  const metrics = dataset.metrics || {};
  const breakdown = dataset.breakdown || [];

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="card" style={{ width: '100%', maxWidth: 900, height: '90vh', display: 'flex', flexDirection: 'column', background: '#e5e7eb', borderRadius: 14, overflow: 'hidden' }}>

        {/* PDF Viewer Header */}
        <div style={{ padding: '12px 20px', background: '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileText size={18} color="#60a5fa" />
            <span style={{ fontWeight: 700, fontSize: 14 }}>{report.name}.pdf</span>
            <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 4 }}>PDF PREVIEW</span>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 6, fontSize: 12 }}>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setPage(p => Math.max(1, p - 1))}>◀</button>
              <span>Page {page} of 2</span>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setPage(p => Math.min(2, p + 1))}>▶</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setZoom(z => Math.max(70, z - 10))} title="Zoom Out"><ZoomOut size={16} /></button>
              <span style={{ fontSize: 12, minWidth: 40, textAlign: 'center' }}>{zoom}%</span>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setZoom(z => Math.min(150, z + 10))} title="Zoom In"><ZoomIn size={16} /></button>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setZoom(100)} title="Fit"><Maximize2 size={16} /></button>
            </div>

            <button className="btn btn-primary" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => onDownloadPDF(report)}>
              <Download size={13} /> Download PDF
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Page Canvas Sheet */}
        <div style={{ flex: 1, overflow: 'auto', padding: 30, display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: 700,
              minHeight: 900,
              background: '#ffffff',
              padding: 40,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              borderRadius: 4,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease',
              color: '#1e293b'
            }}
          >
            {/* PDF Header */}
            <div style={{ borderBottom: '3px solid #2563eb', pb: 16, paddingBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#1e3a8a', letterSpacing: -0.5 }}>CIRCULAI</div>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 2 }}>AI-Powered Smart Waste Management Platform</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>{report.name}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Report Date: {dataset.date || report.date}</div>
              </div>
            </div>

            {page === 1 ? (
              <>
                <div style={{ marginTop: 24, fontSize: 13, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: 0.5 }}>Executive Summary Metrics</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
                  {[
                    { l: 'Total Waste Generated', v: metrics.totalWaste || '1,284 kg' },
                    { l: 'Recyclability Rate', v: metrics.recyclablePct || '72%' },
                    { l: 'Material Recovered', v: metrics.materialRecovered || '856 kg' },
                    { l: 'Est. Recovery Value', v: metrics.estimatedValue || '₹18,450' },
                    { l: 'Landfill Avoided', v: metrics.landfillAvoided || '624 kg' },
                    { l: 'System Status', v: 'COMPLETED' }
                  ].map((m, i) => (
                    <div key={i} style={{ border: '1px solid #e2e8f0', background: '#f8fafc', padding: 12, borderRadius: 6 }}>
                      <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600 }}>{m.l}</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', marginTop: 4 }}>{m.v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 30, fontSize: 13, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: 0.5 }}>Material Category Breakdown</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12, fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: '#2563eb', color: '#ffffff', textAlign: 'left' }}>
                      <th style={{ padding: 8 }}>Material Type</th>
                      <th style={{ padding: 8 }}>Share (%)</th>
                      <th style={{ padding: 8 }}>Weight (kg)</th>
                      <th style={{ padding: 8 }}>Est. Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakdown.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <td style={{ padding: 8, fontWeight: 600 }}>{row.type}</td>
                        <td style={{ padding: 8 }}>{row.pct}</td>
                        <td style={{ padding: 8 }}>{row.weight}</td>
                        <td style={{ padding: 8, fontWeight: 700, color: '#16a34a' }}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div style={{ marginTop: 24, fontSize: 13, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: 0.5 }}>Detailed Log Identification Records</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12, fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: '#1e293b', color: '#ffffff', textAlign: 'left' }}>
                      <th style={{ padding: 6 }}>Log ID</th>
                      <th style={{ padding: 6 }}>Time</th>
                      <th style={{ padding: 6 }}>Waste Type</th>
                      <th style={{ padding: 6 }}>Confidence</th>
                      <th style={{ padding: 6 }}>Recyclability</th>
                      <th style={{ padding: 6 }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dataset.tableData || []).map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: 6 }}>{row.id}</td>
                        <td style={{ padding: 6 }}>{row.time}</td>
                        <td style={{ padding: 6, fontWeight: 700 }}>{row.wasteType}</td>
                        <td style={{ padding: 6, color: '#16a34a', fontWeight: 700 }}>{row.confidence}</td>
                        <td style={{ padding: 6 }}>{row.recyclability}</td>
                        <td style={{ padding: 6, fontWeight: 700 }}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {/* Footer */}
            <div style={{ marginTop: 60, pt: 16, borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8' }}>
              <span>CIRCULAI Smart Waste Platform — Official Automated Report</span>
              <span>Page {page} of 2</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// CSV Spreadsheet Preview Modal
export function CSVPreviewModal({ report, isOpen, onClose, onDownloadCSV }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen || !report) return null;

  const dataset = report.dataset || {};
  const rows = dataset.tableData || [];

  const filteredRows = rows.filter(r =>
    Object.values(r).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="card" style={{ width: '100%', maxWidth: 880, height: '85vh', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>

        {/* CSV Header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-grey-200)', background: 'var(--color-grey-50)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileCode size={20} color="var(--color-green-600)" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--color-grey-900)' }}>{report.name}.csv</div>
              <div style={{ fontSize: 11, color: 'var(--color-grey-500)' }}>Spreadsheet Preview · {rows.length} records</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: 8, color: 'var(--color-grey-400)' }} />
              <input
                type="text"
                placeholder="Filter rows..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ padding: '4px 10px 4px 30px', fontSize: 12, borderRadius: 6, border: '1px solid var(--color-grey-300)' }}
              />
            </div>
            <button className="btn btn-primary" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => onDownloadCSV(report)}>
              <Download size={13} /> Download CSV
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-grey-400)', padding: 4 }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Spreadsheet Table */}
        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          <table className="data-table" style={{ fontSize: 12, fontFamily: 'monospace' }}>
            <thead>
              <tr style={{ background: 'var(--color-grey-100)' }}>
                <th>#</th>
                <th>Log ID</th>
                <th>Time</th>
                <th>Waste Type</th>
                <th>Confidence</th>
                <th>Recyclability</th>
                <th>Material</th>
                <th>Recovery Potential</th>
                <th>Est. Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--color-grey-400)' }}>{i + 1}</td>
                  <td>{row.id}</td>
                  <td>{row.time}</td>
                  <td style={{ fontWeight: 700, color: 'var(--color-blue-700)' }}>{row.wasteType}</td>
                  <td style={{ color: 'var(--color-green-600)', fontWeight: 700 }}>{row.confidence}</td>
                  <td>{row.recyclability}</td>
                  <td>{row.material}</td>
                  <td>{row.potential}</td>
                  <td style={{ fontWeight: 700, color: 'var(--color-green-600)' }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 20px', borderTop: '1px solid var(--color-grey-200)', background: 'var(--color-grey-50)', textAlign: 'right' }}>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  );
}
