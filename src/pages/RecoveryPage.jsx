import React from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, AlertTriangle, Brain, CheckCircle } from 'lucide-react';
import { materialRecovery } from '../data/mockData';

export default function RecoveryPage() {
  const radarData = materialRecovery.map(m => ({
    material: m.material, rate: m.rate
  }));

  const barData = materialRecovery.map(m => ({
    name: m.material,
    qty: m.qty,
    recyclable: m.recyclable,
  }));

  return (
    <div>
      <div className="demo-banner">
        <AlertTriangle size={14} />
        DEMO DATA / PROTOTYPE — All recovery values are estimated for demonstration
      </div>

      <div className="page-header">
        <div>
          <div className="page-title-main">Recovery Intelligence</div>
          <div className="page-title-sub">Recyclability Assessment & Recovery Value Estimation</div>
        </div>
        <span className="badge green"><CheckCircle size={12} /> Overall: 72% Recyclable</span>
      </div>

      {/* Summary KPI row */}
      <div className="grid-4 section">
        {[
          { label: 'Total Materials', value: '1,284 kg', color: 'blue', icon: '📦' },
          { label: 'Total Recyclable', value: '856 kg', color: 'green', icon: '♻️' },
          { label: 'Total Value', value: '₹32,430', color: 'green', icon: '💰' },
          { label: 'Avg Recovery Rate', value: '74.7%', color: 'blue', icon: '📊' },
        ].map((s, i) => (
          <div key={i} className={`kpi-card ${s.color}`}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div>
              <div className="kpi-label">{s.label}</div>
              <div className="kpi-value" style={{ fontSize: 22 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Material Cards */}
      <div className="grid-3 section">
        {materialRecovery.map((m, i) => (
          <MaterialRecoveryCard key={i} m={m} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid-2 section">
        {/* Bar chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><TrendingUp size={17} style={{ color: 'var(--color-blue-500)' }} /> Quantity vs. Recyclable</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grey-100)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} unit=" kg" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <Bar dataKey="qty" name="Total Quantity" fill="var(--color-blue-400)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="recyclable" name="Recyclable" fill="var(--color-green-500)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><Brain size={17} style={{ color: 'var(--color-blue-500)' }} /> Recovery Rate by Material</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={80}>
                <PolarGrid stroke="var(--color-grey-200)" />
                <PolarAngleAxis dataKey="material" tick={{ fontSize: 11, fill: 'var(--color-grey-600)' }} />
                <Radar name="Recovery Rate %" dataKey="rate" stroke="var(--color-blue-500)" fill="var(--color-blue-500)" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [`${v}%`, 'Recovery Rate']} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recovery Opportunities */}
      <div className="card section">
        <div className="card-header">
          <span className="card-title"><Brain size={17} style={{ color: 'var(--color-blue-500)' }} /> AI Recovery Opportunities</span>
          <span className="badge blue"><span className="badge-dot" />AI Generated · Demo</span>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { color: 'green', icon: <CheckCircle size={16} />, title: 'High-Value Opportunity', text: 'Aluminium and metal recovery rates at 96% — maximise collection. Current value: ₹9,200. Potential increase with expanded collection: ₹14,500.' },
            { color: 'blue', icon: <Brain size={16} />, title: 'AI Insight', text: 'PET plastic is the highest volume recyclable material. Route all plastic waste to dedicated PET stream for maximum efficiency. Estimated annual recovery value: ₹1,48,800.' },
            { color: 'yellow', icon: <AlertTriangle size={16} />, title: 'Attention Required', text: 'Organic waste contamination reducing recyclable yield by ~8%. Implement source separation campaign to improve overall recovery rates.' },
          ].map((r, i) => (
            <div key={i} className="recommendation-card" style={{
              borderLeftColor: r.color === 'green' ? 'var(--color-green-500)' : r.color === 'yellow' ? 'var(--color-yellow-500)' : 'var(--color-blue-500)',
              borderColor: r.color === 'green' ? 'var(--color-green-200)' : r.color === 'yellow' ? 'var(--color-yellow-200)' : 'var(--color-blue-200)',
            }}>
              <div className="recommendation-icon" style={{
                background: r.color === 'green' ? 'var(--color-green-50)' : r.color === 'yellow' ? 'var(--color-yellow-50)' : 'var(--color-blue-50)',
                color: r.color === 'green' ? 'var(--color-green-600)' : r.color === 'yellow' ? 'var(--color-yellow-600)' : 'var(--color-blue-600)',
              }}>{r.icon}</div>
              <div>
                <div className="recommendation-title" style={{
                  color: r.color === 'green' ? 'var(--color-green-600)' : r.color === 'yellow' ? 'var(--color-yellow-600)' : 'var(--color-blue-600)',
                }}>{r.title}</div>
                <div className="recommendation-text">{r.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MaterialRecoveryCard({ m }) {
  return (
    <div className="material-card" style={{ borderTop: `3px solid ${m.color === 'green' ? 'var(--color-green-500)' : m.color === 'yellow' ? 'var(--color-yellow-500)' : 'var(--color-red-500)'}` }}>
      <div className="material-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="material-icon" style={{ background: m.bg }}>
            <span style={{ fontSize: 20 }}>{m.emoji}</span>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--color-grey-900)' }}>{m.material}</div>
            <span className={`badge ${m.color}`} style={{ fontSize: 10 }}>
              <span className="badge-dot" />{m.status}
            </span>
          </div>
        </div>
      </div>

      <div className="material-stat">
        <span className="material-stat-label">Total Quantity</span>
        <span className="material-stat-value">{m.qty} kg</span>
      </div>
      <div className="material-stat">
        <span className="material-stat-label">Recyclable</span>
        <span className="material-stat-value" style={{ color: 'var(--color-green-600)' }}>{m.recyclable} kg</span>
      </div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span className="material-stat-label">Recovery Rate</span>
          <span className={`material-stat-value ${m.color === 'green' ? 'text-green' : m.color === 'yellow' ? 'text-yellow' : 'text-red'}`}>{m.rate}%</span>
        </div>
        <div className="progress-bar">
          <div className={`progress-fill ${m.color}`} style={{ width: `${m.rate}%` }} />
        </div>
      </div>
      <div className="material-stat">
        <span className="material-stat-label">Estimated Value</span>
        <span className="material-stat-value" style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-grey-900)' }}>{m.value}</span>
      </div>
    </div>
  );
}
