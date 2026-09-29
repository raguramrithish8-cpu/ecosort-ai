import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend, LineChart, Line,
  ResponsiveContainer,
} from 'recharts';
import { Tag, AlertTriangle, Calendar, Search, X, AlertCircle } from 'lucide-react';

const filters = ['Today', '7 Days', '30 Days', 'Custom'];

// Period Datasets
const periodDatasets = {
  'Today': {
    badgeLabel: 'Today (Sep 29)',
    trendLabel: 'Hourly Classification Trend (Today)',
    totalQty: 185,
    categories: [
      { category: 'Plastic', qty: 48, recyclable: 89, recovery: 89, value: '₹1,850', color: '#3b82f6' },
      { category: 'Paper', qty: 32, recyclable: 90, recovery: 90, value: '₹1,020', color: '#22c55e' },
      { category: 'Organic', qty: 62, recyclable: 75, recovery: 75, value: '₹250', color: '#eab308' },
      { category: 'Metal', qty: 14, recyclable: 96, recovery: 96, value: '₹1,360', color: '#6b7280' },
      { category: 'Glass', qty: 11, recyclable: 80, recovery: 80, value: '₹310', color: '#60a5fa' },
      { category: 'Other', qty: 18, recyclable: 18, recovery: 18, value: '₹45', color: '#ef4444' },
    ],
    recycleVsNot: [
      { name: 'Recyclable', value: 105, color: '#22c55e' },
      { name: 'Non-Recyclable', value: 18, color: '#ef4444' },
      { name: 'Compostable', value: 62, color: '#eab308' },
    ],
    trend: [
      { key: '08:00', plastic: 6, paper: 4, organic: 8, metal: 2, glass: 1, other: 2 },
      { key: '10:00', plastic: 10, paper: 7, organic: 14, metal: 3, glass: 2, other: 4 },
      { key: '12:00', plastic: 12, paper: 8, organic: 16, metal: 4, glass: 3, other: 5 },
      { key: '14:00', plastic: 9, paper: 6, organic: 11, metal: 2, glass: 2, other: 3 },
      { key: '16:00', plastic: 7, paper: 4, organic: 8, metal: 2, glass: 2, other: 2 },
      { key: '18:00', plastic: 4, paper: 3, organic: 5, metal: 1, glass: 1, other: 2 },
    ]
  },
  '7 Days': {
    badgeLabel: '7 Days Aggregated',
    trendLabel: 'Daily Classification Trend (7 Days)',
    totalQty: 1284,
    categories: [
      { category: 'Plastic', qty: 320, recyclable: 89, recovery: 89, value: '₹12,400', color: '#3b82f6' },
      { category: 'Paper', qty: 210, recyclable: 90, recovery: 90, value: '₹6,800', color: '#22c55e' },
      { category: 'Organic', qty: 412, recyclable: 75, recovery: 75, value: '₹1,650', color: '#eab308' },
      { category: 'Metal', qty: 95, recyclable: 96, recovery: 96, value: '₹9,200', color: '#6b7280' },
      { category: 'Glass', qty: 88, recyclable: 80, recovery: 80, value: '₹2,100', color: '#60a5fa' },
      { category: 'Other', qty: 159, recyclable: 18, recovery: 18, value: '₹280', color: '#ef4444' },
    ],
    recycleVsNot: [
      { name: 'Recyclable', value: 712, color: '#22c55e' },
      { name: 'Non-Recyclable', value: 160, color: '#ef4444' },
      { name: 'Compostable', value: 330, color: '#eab308' },
      { name: 'Recoverable', value: 82, color: '#3b82f6' },
    ],
    trend: [
      { key: 'Mon', plastic: 48, paper: 32, organic: 62, metal: 14, glass: 13, other: 24 },
      { key: 'Tue', plastic: 52, paper: 35, organic: 68, metal: 16, glass: 14, other: 22 },
      { key: 'Wed', plastic: 55, paper: 33, organic: 65, metal: 15, glass: 15, other: 25 },
      { key: 'Thu', plastic: 58, paper: 36, organic: 70, metal: 17, glass: 12, other: 26 },
      { key: 'Fri', plastic: 60, paper: 34, organic: 72, metal: 16, glass: 16, other: 28 },
      { key: 'Sat', plastic: 54, paper: 38, organic: 66, metal: 14, glass: 11, other: 22 },
      { key: 'Sun', plastic: 45, paper: 30, organic: 60, metal: 12, glass: 10, other: 18 },
    ]
  },
  '30 Days': {
    badgeLabel: '30 Days Aggregated',
    trendLabel: 'Weekly Classification Trend (30 Days)',
    totalQty: 5640,
    categories: [
      { category: 'Plastic', qty: 1420, recyclable: 89, recovery: 89, value: '₹54,800', color: '#3b82f6' },
      { category: 'Paper', qty: 980, recyclable: 90, recovery: 90, value: '₹31,200', color: '#22c55e' },
      { category: 'Organic', qty: 1840, recyclable: 75, recovery: 75, value: '₹7,400', color: '#eab308' },
      { category: 'Metal', qty: 430, recyclable: 96, recovery: 96, value: '₹41,500', color: '#6b7280' },
      { category: 'Glass', qty: 390, recyclable: 80, recovery: 80, value: '₹9,400', color: '#60a5fa' },
      { category: 'Other', qty: 580, recyclable: 18, recovery: 18, value: '₹1,120', color: '#ef4444' },
    ],
    recycleVsNot: [
      { name: 'Recyclable', value: 3120, color: '#22c55e' },
      { name: 'Non-Recyclable', value: 580, color: '#ef4444' },
      { name: 'Compostable', value: 1540, color: '#eab308' },
      { name: 'Recoverable', value: 400, color: '#3b82f6' },
    ],
    trend: [
      { key: 'Week 1', plastic: 310, paper: 220, organic: 420, metal: 95, glass: 85, other: 130 },
      { key: 'Week 2', plastic: 350, paper: 240, organic: 460, metal: 110, glass: 95, other: 145 },
      { key: 'Week 3', plastic: 375, paper: 255, organic: 475, metal: 112, glass: 102, other: 150 },
      { key: 'Week 4', plastic: 385, paper: 265, organic: 485, metal: 113, glass: 108, other: 155 },
    ]
  },
  'Custom': {
    badgeLabel: 'Custom Period (01 Sep – 15 Sep 2026)',
    trendLabel: 'Custom Date Range Trend',
    totalQty: 2820,
    categories: [
      { category: 'Plastic', qty: 710, recyclable: 89, recovery: 89, value: '₹27,400', color: '#3b82f6' },
      { category: 'Paper', qty: 490, recyclable: 90, recovery: 90, value: '₹15,600', color: '#22c55e' },
      { category: 'Organic', qty: 920, recyclable: 75, recovery: 75, value: '₹3,700', color: '#eab308' },
      { category: 'Metal', qty: 215, recyclable: 96, recovery: 96, value: '₹20,750', color: '#6b7280' },
      { category: 'Glass', qty: 195, recyclable: 80, recovery: 80, value: '₹4,700', color: '#60a5fa' },
      { category: 'Other', qty: 290, recyclable: 18, recovery: 18, value: '₹560', color: '#ef4444' },
    ],
    recycleVsNot: [
      { name: 'Recyclable', value: 1560, color: '#22c55e' },
      { name: 'Non-Recyclable', value: 290, color: '#ef4444' },
      { name: 'Compostable', value: 770, color: '#eab308' },
      { name: 'Recoverable', value: 200, color: '#3b82f6' },
    ],
    trend: [
      { key: 'Sep 01', plastic: 45, paper: 30, organic: 60, metal: 14, glass: 12, other: 18 },
      { key: 'Sep 05', plastic: 50, paper: 34, organic: 65, metal: 15, glass: 14, other: 20 },
      { key: 'Sep 10', plastic: 55, paper: 36, organic: 68, metal: 16, glass: 15, other: 22 },
      { key: 'Sep 15', plastic: 48, paper: 32, organic: 62, metal: 14, glass: 13, other: 19 },
    ]
  }
};

export default function ClassificationPage() {
  const [activeFilter, setActiveFilter] = useState('7 Days');

  // Custom Date Picker State
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-15');
  const [customApplied, setCustomApplied] = useState({ start: '01 Sep 2026', end: '15 Sep 2026' });
  const [isNoDataCustom, setIsNoDataCustom] = useState(false);

  // Material Search Filter within Classification page
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Period Change
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (filter === 'Custom') {
      setShowCustomPicker(true);
    } else {
      setShowCustomPicker(false);
      setIsNoDataCustom(false);
    }
  };

  // Apply Custom Date Range
  const handleApplyCustom = () => {
    if (!startDate || !endDate) return;

    // Check date bounds for demo dataset
    const startYear = new Date(startDate).getFullYear();
    const endYear = new Date(endDate).getFullYear();

    if (startYear > 2026 || endYear < 2026 || new Date(startDate) > new Date(endDate)) {
      setIsNoDataCustom(true);
    } else {
      setIsNoDataCustom(false);
      // Format friendly date display
      const d1 = new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const d2 = new Date(endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      setCustomApplied({ start: d1, end: d2 });
    }
  };

  // Current active dataset
  const dataset = periodDatasets[activeFilter] || periodDatasets['7 Days'];

  // Calculate dynamic percentages & statuses
  const rows = dataset.categories.map(row => {
    const pct = parseFloat(((row.qty / dataset.totalQty) * 100).toFixed(1));
    const statusColor = row.recyclable >= 85 ? 'green' : row.recyclable >= 50 ? 'yellow' : 'red';
    const statusLabel = row.recyclable >= 85 ? 'High' : row.recyclable >= 50 ? 'Medium' : 'Low';
    return {
      ...row,
      pct,
      statusColor,
      statusLabel
    };
  });

  // Filtered rows by local search query
  const filteredRows = rows.filter(r =>
    r.category.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div>
      {/* Demo Banner */}
      <div className="demo-banner">
        <AlertTriangle size={14} />
        DEMO DATA / PROTOTYPE — Classification data is simulated
      </div>

      {/* Period Filter Bar & Local Search */}
      <div className="filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-grey-700)', marginRight: 4 }}>Period:</span>
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => handleFilterClick(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search Material on Page */}
        <div style={{ position: 'relative', width: 220 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-grey-400)' }} />
          <input
            type="text"
            placeholder="Filter category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 28px 6px 30px',
              fontSize: 12,
              borderRadius: 999,
              border: '1px solid var(--color-grey-200)',
              background: 'white',
              outline: 'none'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-grey-400)'
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Custom Date Range Picker Component */}
      {activeFilter === 'Custom' && (
        <div
          style={{
            background: 'var(--color-blue-50)',
            border: '1px solid var(--color-blue-200)',
            borderRadius: 12,
            padding: '14px 18px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Calendar size={18} color="var(--color-blue-600)" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-grey-900)' }}>
                Select Custom Period Range
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-grey-500)' }}>
                Active: {customApplied.start} – {customApplied.end}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-grey-600)' }}>Start:</span>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--color-grey-300)',
                  fontSize: 12,
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-grey-600)' }}>End:</span>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--color-grey-300)',
                  fontSize: 12,
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <button className="btn btn-primary btn-sm" onClick={handleApplyCustom}>
              Apply
            </button>
          </div>
        </div>
      )}

      {/* No Data State for Custom Date Range */}
      {isNoDataCustom ? (
        <div
          className="card section"
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12
          }}
        >
          <AlertCircle size={36} color="var(--color-yellow-500)" />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-grey-900)' }}>
            No classification data available for the selected period.
          </h3>
          <p style={{ fontSize: 13, color: 'var(--color-grey-500)', maxWidth: 460 }}>
            Please select a valid date range within our historical monitoring archive (e.g. September 2026).
          </p>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              setStartDate('2026-09-01');
              setEndDate('2026-09-15');
              setIsNoDataCustom(false);
            }}
          >
            Reset Date Range
          </button>
        </div>
      ) : (
        <>
          {/* Waste Category Distribution Table Card */}
          <div className="card section">
            <div className="card-header">
              <span className="card-title">
                <Tag size={17} style={{ color: 'var(--color-blue-500)' }} /> Waste Category Distribution
              </span>
              <span className="badge blue">
                <span className="badge-dot" />
                {activeFilter === 'Custom' ? `Custom: ${customApplied.start} – ${customApplied.end}` : dataset.badgeLabel}
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              {filteredRows.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>CATEGORY</th>
                      <th>TOTAL QUANTITY</th>
                      <th>PERCENTAGE</th>
                      <th>RECYCLABLE %</th>
                      <th>RECOVERY RATE</th>
                      <th>ESTIMATED VALUE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: row.color, flexShrink: 0 }} />
                            <span style={{ fontWeight: 700 }}>{row.category}</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 600 }}>{row.qty.toLocaleString()} kg</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="progress-bar" style={{ width: 60 }}>
                              <div className="progress-fill blue" style={{ width: `${Math.min(row.pct * 2.5, 100)}%` }} />
                            </div>
                            <span style={{ fontWeight: 600 }}>{row.pct}%</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="progress-bar" style={{ width: 60 }}>
                              <div className={`progress-fill ${row.statusColor}`} style={{ width: `${row.recyclable}%` }} />
                            </div>
                            <span style={{ fontWeight: 600 }}>{row.recyclable}%</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="progress-bar" style={{ width: 60 }}>
                              <div className={`progress-fill ${row.statusColor}`} style={{ width: `${row.recovery}%` }} />
                            </div>
                            <span style={{ fontWeight: 600 }}>{row.recovery}%</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--color-green-600)' }}>{row.value}</td>
                        <td>
                          <span className={`badge ${row.statusColor}`}>
                            <span className="badge-dot" />
                            {row.statusLabel} Recovery
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--color-grey-500)', fontSize: 13 }}>
                  No data available for this material in the selected period.
                </div>
              )}
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid-2 section">
            {/* Classification Trend Chart */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">{dataset.trendLabel}</span>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart data={dataset.trend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grey-100)" />
                    <XAxis dataKey="key" tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                    <Legend iconSize={8} formatter={v => <span style={{ fontSize: 10 }}>{v}</span>} />
                    <Bar dataKey="plastic" name="Plastic" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="paper" name="Paper" fill="#22c55e" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="organic" name="Organic" fill="#eab308" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="metal" name="Metal" fill="#6b7280" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recyclable vs Non-Recyclable Pie Chart */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Recyclable vs Non-Recyclable ({activeFilter})</span>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={230}>
                  <PieChart>
                    <Pie data={dataset.recycleVsNot} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value">
                      {dataset.recycleVsNot.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v.toLocaleString()} kg`, '']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Legend iconType="circle" iconSize={9} formatter={v => <span style={{ fontSize: 11 }}>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
