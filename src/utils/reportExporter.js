import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function downloadReportPDF(report) {
  if (!report || !report.dataset) return;
  const ds = report.dataset;

  try {
    const doc = new jsPDF();

    // Document Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 36, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('CIRCULAI — Smart Waste Management', 14, 18);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Official Report: ${report.name || report.type} | Date: ${report.date || 'Sep 29, 2026'}`, 14, 28);

    // Summary Box
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Metrics Summary', 14, 44);

    // Key Metrics Table
    autoTable(doc, {
      startY: 48,
      head: [['Metric', 'Value']],
      body: [
        ['Total Waste Generated', ds.totalWaste || '1,284 kg'],
        ['Recyclability Rate', ds.recyclablePct || '72%'],
        ['Material Recovered', ds.recoveredWeight || '856 kg'],
        ['Estimated Recovery Value', ds.estimatedValue || '₹18,450']
      ],
      theme: 'striped',
      headStyles: { fillStyle: 'F', fillColor: [37, 99, 235] }
    });

    // Material Breakdown Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Material Classification Breakdown', 14, doc.lastAutoTable.finalY + 12);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 16,
      head: [['Category', 'Quantity', 'Share %', 'Recyclable %', 'Recovery Rate', 'Est. Value']],
      body: (ds.categories || []).map(b => [
        b.category,
        `${b.qty} kg`,
        `${b.pct}%`,
        `${b.recyclable}%`,
        `${b.recovery}%`,
        b.value
      ]),
      theme: 'grid',
      headStyles: { fillColor: [22, 163, 74] }
    });

    const fileName = `${(report.name || 'Report').replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    doc.save(fileName);
    return true;
  } catch (err) {
    console.error('PDF export error:', err);
    return false;
  }
}

export function downloadReportCSV(report) {
  if (!report || !report.dataset) return;
  const ds = report.dataset;

  try {
    let csvContent = 'Category,Total Quantity (kg),Percentage %,Recyclable %,Recovery Rate %,Estimated Value\n';
    (ds.categories || []).forEach(row => {
      csvContent += `"${row.category}","${row.qty}","${row.pct}%","${row.recyclable}%","${row.recovery}%","${row.value}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${(report.name || 'Report').replace(/\s+/g, '_')}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('CSV export error:', err);
    return false;
  }
}
