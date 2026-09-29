import React, { useState, useEffect } from 'react';
import { FileText, Download, Play, Eye, FileCode, CheckCircle, Clock, AlertTriangle, RefreshCw, Sparkles, Filter } from 'lucide-react';
import { useNotifications } from '../components/NotificationContext';
import { useToast } from '../components/Toast';
import ReportViewerModal, { PDFPreviewModal, CSVPreviewModal } from '../components/ReportViewerModal';
import { downloadReportPDF, downloadReportCSV } from '../utils/reportExporter';

const STORAGE_KEY = 'circularai_reports';

// Consolidated Master Report Dataset Generator
function generateMasterDataset(reportName) {
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return {
    title: reportName,
    date: dateStr,
    generatedAt: `${dateStr} at ${timeStr}`,
    metrics: {
      totalWaste: '1,284 kg',
      recyclablePct: '72%',
      materialRecovered: '856 kg',
      estimatedValue: '₹18,450',
      landfillAvoided: '624 kg'
    },
    breakdown: [
      { type: 'Plastic Bottle', pct: '38%', weight: '488 kg', value: '₹8,200' },
      { type: 'Paper / Cardboard', pct: '24%', weight: '308 kg', value: '₹4,100' },
      { type: 'Metal Can', pct: '18%', weight: '231 kg', value: '₹5,200' },
      { type: 'Glass Bottle', pct: '12%', weight: '154 kg', value: '₹950' },
      { type: 'Organic Waste', pct: '5%', weight: '64 kg', value: '₹0' },
      { type: 'Non-Recyclable', pct: '3%', weight: '39 kg', value: '₹0' }
    ],
    tableData: [
      { id: 'LOG-1001', time: '10:42', wasteType: 'Plastic Bottle', confidence: '96.8%', recyclability: 'Recyclable', material: 'PET Plastic', potential: 'HIGH', value: '₹4.20/kg' },
      { id: 'LOG-1002', time: '10:45', wasteType: 'Paper', confidence: '93.4%', recyclability: 'Recyclable', material: 'Cellulose', potential: 'HIGH', value: '₹6.00/kg' },
      { id: 'LOG-1003', time: '10:51', wasteType: 'Metal Can', confidence: '94.2%', recyclability: 'Recyclable', material: 'Aluminium', potential: 'HIGH', value: '₹85.00/kg' },
      { id: 'LOG-1004', time: '11:05', wasteType: 'Glass Bottle', confidence: '91.6%', recyclability: 'Recyclable', material: 'Glass', potential: 'MEDIUM', value: '₹3.10/kg' },
      { id: 'LOG-1005', time: '11:18', wasteType: 'Organic Waste', confidence: '89.5%', recyclability: 'Compostable', material: 'Organic', potential: 'MEDIUM', value: 'N/A' },
      { id: 'LOG-1006', time: '11:32', wasteType: 'Non-Recyclable', confidence: '90.1%', recyclability: 'Non-Recyclable', material: 'Mixed', potential: 'LOW', value: 'N/A' }
    ]
  };
}

const INITIAL_REPORTS = [
  { id: 'r1', name: 'Daily Waste Report', desc: 'Summary of daily collection, recyclability rates & recovered value', status: 'NOT_GENERATED', progress: 0, dataset: null },
  { id: 'r2', name: 'Weekly Waste Summary', desc: 'Aggregated weekly trends, processing volume & landfill diversion', status: 'NOT_GENERATED', progress: 0, dataset: null },
  { id: 'r3', name: 'Waste Classification Report', desc: 'Category-level breakdown, purity metrics & confidence scores', status: 'NOT_GENERATED', progress: 0, dataset: null },
  { id: 'r4', name: 'Recovery Intelligence Report', desc: 'Economic valuation of recovered materials & market pricing', status: 'NOT_GENERATED', progress: 0, dataset: null },
  { id: 'r5', name: 'Circular Economy Report', desc: 'ESG compliance, carbon offset & decision support metrics', status: 'NOT_GENERATED', progress: 0, dataset: null }
];

export default function ReportsPage() {
  const { addNotification } = useNotifications();
  const toast = useToast();

  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load reports from localStorage:', e);
    }
    return INITIAL_REPORTS;
  });

  const [viewingReport, setViewingReport] = useState(null);
  const [pdfPreviewReport, setPdfPreviewReport] = useState(null);
  const [csvPreviewReport, setCsvPreviewReport] = useState(null);

  // Sync reports state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch (e) {
      console.warn('Failed to save reports to localStorage:', e);
    }
  }, [reports]);

  // Generate a single report with progress step
  const handleGenerate = (id) => {
    const reportObj = reports.find(r => r.id === id);
    if (!reportObj) return;

    addNotification({
      type: 'Report',
      title: 'REPORT GENERATION STARTED',
      message: `${reportObj.name} generation has started.`,
      severity: 'info',
      relatedPage: '/reports'
    });
    toast(`Generating ${reportObj.name}...`, 'blue');

    // Update status to GENERATING
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'GENERATING', progress: 0 } : r));

    // Progress simulation: 0 -> 25 -> 50 -> 75 -> 100
    const steps = [25, 50, 75, 100];
    let stepIdx = 0;

    const interval = setInterval(() => {
      const currentPct = steps[stepIdx];
      if (currentPct < 100) {
        setReports(prev => prev.map(r => r.id === id ? { ...r, progress: currentPct } : r));
        stepIdx++;
      } else {
        clearInterval(interval);
        const dataset = generateMasterDataset(reportObj.name);
        setReports(prev => prev.map(r => r.id === id ? {
          ...r,
          status: 'COMPLETED',
          progress: 100,
          dataset,
          completedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        } : r));

        addNotification({
          type: 'Report',
          title: 'REPORT GENERATED',
          message: `${reportObj.name} is ready to view and export.`,
          severity: 'success',
          relatedPage: '/reports',
          contentType: 'report',
          relatedData: {
            id: reportObj.id,
            name: reportObj.name,
            type: reportObj.name,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            dataset
          }
        });
        toast(`${reportObj.name} generated successfully!`, 'green');
      }
    }, 500);
  };

  // Generate All sequentially
  const handleGenerateAll = () => {
    const ungenerated = reports.filter(r => r.status !== 'COMPLETED');
    if (ungenerated.length === 0) {
      toast('All reports are already generated!', 'blue');
      return;
    }

    toast('Starting sequential generation of all reports...', 'blue');
    let delay = 0;
    ungenerated.forEach(rep => {
      setTimeout(() => {
        handleGenerate(rep.id);
      }, delay);
      delay += 2400;
    });
  };

  // PDF Export
  const handleDownloadPDF = (report) => {
    if (!report || !report.dataset) return;
    const success = downloadReportPDF(report);
    if (success) {
      addNotification({
        type: 'Report',
        title: 'PDF EXPORT COMPLETE',
        message: `${report.name} PDF has been generated successfully.`,
        severity: 'success',
        relatedPage: '/reports',
        contentType: 'report',
        relatedData: report
      });
      toast(`${report.name} PDF exported successfully!`, 'green');
    } else {
      toast('Failed to download PDF', 'red');
    }
  };

  // CSV Export
  const handleDownloadCSV = (report) => {
    if (!report || !report.dataset) return;
    const success = downloadReportCSV(report);
    if (success) {
      addNotification({
        type: 'Report',
        title: 'CSV EXPORT COMPLETE',
        message: `${report.name} CSV has been generated successfully.`,
        severity: 'success',
        relatedPage: '/reports',
        contentType: 'report',
        relatedData: report
      });
      toast(`${report.name} CSV exported successfully!`, 'green');
    } else {
      toast('Failed to download CSV', 'red');
    }
  };

  const completedReports = reports.filter(r => r.status === 'COMPLETED');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-grey-900)' }}>Report Generation & Exports</div>
          <div style={{ fontSize: 13, color: 'var(--color-grey-500)' }}>Generate comprehensive analytics, PDF previews & CSV datasets</div>
        </div>

        <button className="btn btn-primary" onClick={handleGenerateAll}>
          <Play size={15} /> Generate All Reports
        </button>
      </div>

      {/* Main Report Generation Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {reports.map(rep => (
          <div key={rep.id} className="card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>

              {/* Title & Desc */}
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FileText size={18} color="var(--color-blue-600)" />
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-grey-900)' }}>{rep.name}</span>

                  {/* Status Badges */}
                  {rep.status === 'NOT_GENERATED' && (
                    <span className="badge blue" style={{ fontSize: 11 }}><Clock size={12} /> Ready</span>
                  )}
                  {rep.status === 'GENERATING' && (
                    <span className="badge yellow" style={{ fontSize: 11 }}><RefreshCw size={12} className="spin" /> Generating ({rep.progress}%)</span>
                  )}
                  {rep.status === 'COMPLETED' && (
                    <span className="badge green" style={{ fontSize: 11 }}><CheckCircle size={12} /> COMPLETED</span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-grey-500)', marginTop: 4 }}>
                  {rep.desc}
                </div>

                {/* Progress Bar when Generating */}
                {rep.status === 'GENERATING' && (
                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="progress-bar" style={{ flex: 1, height: 8 }}>
                      <div className="progress-fill yellow" style={{ width: `${rep.progress}%`, transition: 'width 0.3s ease' }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-yellow-600)' }}>{rep.progress}%</span>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS WORKFLOW */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>

                {/* BEFORE GENERATION: Show ONLY [ Generate ] */}
                {rep.status === 'NOT_GENERATED' && (
                  <button className="btn btn-primary" onClick={() => handleGenerate(rep.id)}>
                    <Play size={14} /> Generate
                  </button>
                )}

                {/* DURING GENERATION: Show ONLY Generating indicator */}
                {rep.status === 'GENERATING' && (
                  <button className="btn btn-outline" disabled style={{ color: 'var(--color-yellow-700)', borderColor: 'var(--color-yellow-300)' }}>
                    Generating... ({rep.progress}%)
                  </button>
                )}

                {/* WHEN COMPLETED: Show View Report, View PDF, View CSV, Download PDF, Download CSV */}
                {rep.status === 'COMPLETED' && (
                  <>
                    <button className="btn btn-outline" onClick={() => setViewingReport(rep)}>
                      <Eye size={14} /> View Report
                    </button>
                    <button className="btn btn-outline" onClick={() => setPdfPreviewReport(rep)}>
                      <FileText size={14} /> View PDF
                    </button>
                    <button className="btn btn-outline" onClick={() => setCsvPreviewReport(rep)}>
                      <FileCode size={14} /> View CSV
                    </button>
                    <button className="btn btn-primary" onClick={() => handleDownloadPDF(rep)}>
                      <Download size={14} /> Download PDF
                    </button>
                    <button className="btn btn-primary" onClick={() => handleDownloadCSV(rep)}>
                      <Download size={14} /> Download CSV
                    </button>
                  </>
                )}

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* REPORT HISTORY SECTION */}
      <div className="card" style={{ marginTop: 10 }}>
        <div className="card-header">
          <span className="card-title">
            <Clock size={16} style={{ color: 'var(--color-blue-500)' }} /> Report History
          </span>
          <span className="badge blue">{completedReports.length} Generated</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {completedReports.length === 0 ? (
            <div style={{ padding: 30, textAlign: 'center', color: 'var(--color-grey-400)', fontSize: 13 }}>
              No completed reports yet. Click <strong>Generate</strong> on any report above to build history.
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Generated Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {completedReports.map(rep => (
                  <tr key={rep.id}>
                    <td style={{ fontWeight: 700, color: 'var(--color-grey-900)' }}>{rep.name}</td>
                    <td style={{ color: 'var(--color-grey-600)' }}>{rep.completedAt || '29 Sep 2026'}</td>
                    <td>
                      <span className="badge green" style={{ fontSize: 11 }}>COMPLETED</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <button className="btn btn-outline" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => setViewingReport(rep)}>
                          <Eye size={12} /> View
                        </button>
                        <button className="btn btn-outline" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => setPdfPreviewReport(rep)}>
                          <FileText size={12} /> PDF
                        </button>
                        <button className="btn btn-outline" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => setCsvPreviewReport(rep)}>
                          <FileCode size={12} /> CSV
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* IN-APP MODAL VIEWERS */}
      <ReportViewerModal
        report={viewingReport}
        isOpen={!!viewingReport}
        onClose={() => setViewingReport(null)}
        onViewPDF={(rep) => { setViewingReport(null); setPdfPreviewReport(rep); }}
        onViewCSV={(rep) => { setViewingReport(null); setCsvPreviewReport(rep); }}
        onDownloadPDF={handleDownloadPDF}
        onDownloadCSV={handleDownloadCSV}
      />

      <PDFPreviewModal
        report={pdfPreviewReport}
        isOpen={!!pdfPreviewReport}
        onClose={() => setPdfPreviewReport(null)}
        onDownloadPDF={handleDownloadPDF}
      />

      <CSVPreviewModal
        report={csvPreviewReport}
        isOpen={!!csvPreviewReport}
        onClose={() => setCsvPreviewReport(null)}
        onDownloadCSV={handleDownloadCSV}
      />
    </div>
  );
}
