import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts';
import { BarChart2, AlertTriangle, TrendingUp } from 'lucide-react';
import { analyticsData } from '../data/mockData';

const filters = ['7 Days', '30 Days', '90 Days', '1 Year'];

export default function AnalyticsPage() {
  const [activeFilter, setActiveFilter] = useState('30 Days');

  const landfillData = [
    { week: 'W1', diverted: 420, landfill: 530 },
    { week: 'W2', diverted: 470, landfill: 550 },
    { week: 'W3', diverted: 530, landfill: 570 },
    { week: 'W4', diverted: 580, landfill: 600 },
    { week: 'W5', diverted: 600, landfill: 640 },
    { week: 'W6', diverted: 624, landfill: 660 },
  ];

  const summaryCards = [
    { label: 'Total Waste', value: '1,284 kg', color: 'blue', change: '+5.2%' },
    { label: 'Total Recovered', value: '856 kg', color: 'green', change: '+8.4%' },
    { label: 'Recyclable', value: '924 kg', color: 'green', change: '+3.1%' },
    { label: 'Non-Recyclable', value: '160 kg', color: 'red', change: '-2.3%' },
    { label: 'Landfill Avoided', value: '624 kg', color: 'green', change: '+6.7%' },
    { label: 'Recovery Value', value: '₹32,430', color: 'blue', change: '+12.3%' },
  ];

  return (
    <div>
      <div className="demo-banner">
        <AlertTriangle size={14} />
        DEMO DATA / PROTOTYPE — Analytics are based on simulated waste management data
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-grey-600)', marginRight: 4 }}>Date Range:</span>
        {filters.map(f => (
          <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
        ))}
        <select style={{ marginLeft: 'auto', padding: '6px 12px', border: '1px solid var(--color-grey-200)', borderRadius: 8, fontSize: 12.5, color: 'var(--color-grey-600)', background: 'white', cursor: 'pointer', fontFamily: 'var(--font-family)' }}>
          <option>All Waste Types</option>
          <option>Plastic</option>
          <option>Paper</option>
          <option>Metal</option>
          <option>Glass</option>
          <option>Organic</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid-3 section">
        {summaryCards.map((s, i) => (
          <div key={i} className={`kpi-card ${s.color}`}>
            <div className="kpi-label">{s.label}</div>
            <div className="kpi-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className={`kpi-trend ${s.change.startsWith('+') ? 'up' : 'down'}`}>
              <TrendingUp size={11} /> {s.change} vs. previous period
            </div>
          </div>
        ))}
      </div>

      {/* Waste Generation Trend */}
      <div className="card section">
        <div className="card-header">
          <span className="card-title"><BarChart2 size={17} style={{ color: 'var(--color-blue-500)' }} /> Waste Generation & Recovery Trend</span>
          <span className="badge blue"><span className="badge-dot" />{activeFilter}</span>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={analyticsData.wasteTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGenerated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-blue-500)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--color-blue-500)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-green-500)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--color-green-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grey-100)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} unit=" kg" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Legend iconType="circle" iconSize={8} formatter={v => <span style={{ fontSize: 11 }}>{v}</span>} />
              <Area type="monotone" dataKey="generated" name="Waste Generated" stroke="var(--color-blue-500)" fill="url(#colorGenerated)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="recovered" name="Waste Recovered" stroke="var(--color-green-500)" fill="url(#colorRecovered)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="recyclable" name="Recyclable" stroke="var(--color-yellow-500)" fill="none" strokeWidth={2} strokeDasharray="5 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row: Recovery Efficiency + Landfill Diversion */}
      <div className="grid-2 section">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recovery Efficiency by Material</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={analyticsData.recoveryEfficiency} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grey-100)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11.5, fill: 'var(--color-grey-600)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [`${v}%`, 'Efficiency']} />
                <Bar dataKey="efficiency" name="Recovery Efficiency"
                  fill="var(--color-green-500)" radius={[0, 4, 4, 0]}
                  label={{ position: 'right', formatter: v => `${v}%`, fontSize: 11, fill: 'var(--color-grey-600)' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Landfill Diversion Trend</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={landfillData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grey-100)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} unit=" kg" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconSize={8} formatter={v => <span style={{ fontSize: 11 }}>{v}</span>} />
                <Bar dataKey="diverted" name="Diverted from Landfill" fill="var(--color-green-500)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="landfill" name="Sent to Landfill" fill="var(--color-red-400)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Confidence Distribution */}
      <div className="card section">
        <div className="card-header">
          <span className="card-title">AI Classification Confidence Distribution</span>
          <span className="badge blue"><span className="badge-dot" />AI Analytics</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={analyticsData.confidenceData} cx="50%" cy="50%" outerRadius={65} paddingAngle={3} dataKey="count">
                    {analyticsData.confidenceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v} detections`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {analyticsData.confidenceData.map((d, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-grey-700)' }}>{d.range} Confidence</span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-grey-900)' }}>{d.count} detections</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(d.count / 252) * 100}%`, background: d.color }} />
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 12, color: 'var(--color-grey-500)', marginTop: 6 }}>
                Total: 252 detections · Avg confidence: <strong style={{ color: 'var(--color-green-600)' }}>94.2%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
