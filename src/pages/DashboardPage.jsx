import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { Brain, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import KPICards from '../components/KPICards';
import {
  wasteCompositionData, recoveryTrendData,
  recentDetections, systemStatus,
} from '../data/mockData';

const STATUS_COLOR = { green: 'green', yellow: 'yellow', red: 'red', blue: 'blue' };

export default function DashboardPage() {
  return (
    <div>
      {/* Demo banner */}
      <div className="demo-banner">
        <AlertTriangle size={14} />
        DEMO DATA / PROTOTYPE — All values are simulated for demonstration purposes
      </div>

      {/* KPI Row */}
      <KPICards />

      {/* Row 1: Composition + Recovery Trend */}
      <div className="grid-12 section">
        <WasteCompositionCard />
        <RecoveryTrendCard />
      </div>

      {/* Row 2: Recent Detections */}
      <div className="section">
        <RecentDetectionsCard />
      </div>

      {/* Row 3: AI Recommendation + System Status */}
      <div className="grid-21 section">
        <AIRecommendationCard />
        <SystemStatusCard />
      </div>
    </div>
  );
}

/* ------ Waste Composition Donut ------ */
function WasteCompositionCard() {
  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.06) return null;
    const r = innerRadius + (outerRadius - innerRadius) * 0.55;
    return (
      <text x={cx + r * Math.cos(-midAngle * RADIAN)} y={cy + r * Math.sin(-midAngle * RADIAN)}
        fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <span style={{ color: 'var(--color-blue-500)' }}>◉</span> Waste Composition
        </span>
        <button className="card-action">View All</button>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={wasteCompositionData} cx="50%" cy="50%"
              innerRadius={55} outerRadius={90}
              paddingAngle={2} dataKey="value"
              labelLine={false} label={renderLabel}>
              {wasteCompositionData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => [`${v} kg`, '']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend iconType="circle" iconSize={9} formatter={(v) => <span style={{ fontSize: 12 }}>{v}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ------ Recovery Trend Line ------ */
function RecoveryTrendCard() {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <span style={{ color: 'var(--color-blue-500)' }}>◉</span> Recovery Trend (6 months)
        </span>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={recoveryTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-grey-100)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--color-grey-500)' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
            <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>} />
            <Line type="monotone" dataKey="detected" name="Waste Detected" stroke="var(--color-blue-500)" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="recovered" name="Waste Recovered" stroke="var(--color-green-500)" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="diverted" name="Landfill Diverted" stroke="var(--color-yellow-500)" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ------ Recent AI Detections Table ------ */
function RecentDetectionsCard() {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <Brain size={17} style={{ color: 'var(--color-blue-500)' }} /> Recent AI Detections
        </span>
        <button className="card-action">View All</button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Waste Type</th>
              <th>Confidence</th>
              <th>Recyclability</th>
              <th>Recovery Value</th>
              <th>Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            {recentDetections.map((row, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--color-grey-500)', fontSize: 12 }}>{row.time}</td>
                <td style={{ fontWeight: 600 }}>{row.type}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="progress-bar" style={{ width: 60 }}>
                      <div className="progress-fill blue" style={{ width: `${row.confidence}%` }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{row.confidence}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${row.status}`}>
                    <span className="badge-dot" />{row.recyclable}
                  </span>
                </td>
                <td style={{ fontWeight: 600, color: 'var(--color-grey-800)' }}>{row.value}</td>
                <td>
                  <span className={`badge ${row.status}`}>{row.action}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------ AI Recommendation ------ */
function AIRecommendationCard() {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <Brain size={17} style={{ color: 'var(--color-blue-500)' }} /> AI Recommendations
        </span>
        <span className="badge blue"><span className="badge-dot" />Active</span>
      </div>
      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="recommendation-card">
          <div className="recommendation-icon"><Brain size={18} /></div>
          <div>
            <div className="recommendation-title">Priority Action</div>
            <div className="recommendation-text">High-value PET plastic detected in significant quantities. Prioritize plastic recycling stream for maximum resource recovery. Estimated additional value: ₹2,800.</div>
          </div>
        </div>
        <div className="recommendation-card" style={{ borderLeftColor: 'var(--color-green-500)' }}>
          <div className="recommendation-icon" style={{ background: 'var(--color-green-50)', color: 'var(--color-green-600)' }}>
            <CheckCircle size={18} />
          </div>
          <div>
            <div className="recommendation-title" style={{ color: 'var(--color-green-600)' }}>Recovery Opportunity</div>
            <div className="recommendation-text">Metal recovery rate at 96% — industry-leading. Continue current sorting protocols. Consider expanding metal collection points.</div>
          </div>
        </div>
        <div className="recommendation-card" style={{ borderLeftColor: 'var(--color-yellow-500)', borderColor: 'var(--color-yellow-200)' }}>
          <div className="recommendation-icon" style={{ background: 'var(--color-yellow-50)', color: 'var(--color-yellow-600)' }}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <div className="recommendation-title" style={{ color: 'var(--color-yellow-600)' }}>Attention Required</div>
            <div className="recommendation-text">Organic waste contamination detected in plastic stream (12%). Improve source separation at collection points.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------ System Status ------ */
function SystemStatusCard() {
  const icons = { Camera: '📷', Cpu: '🖥️', Database: '🗄️', Wifi: '📡', Server: '🖧' };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <Info size={17} style={{ color: 'var(--color-blue-500)' }} /> System Status
        </span>
        <span className="badge green"><span className="badge-dot" />4/5 Online</span>
      </div>
      <div className="card-body">
        <div className="system-status-grid">
          {systemStatus.map((s, i) => (
            <div key={i} className="system-status-row">
              <div className="system-status-name">
                <span>{icons[s.icon] || '⚙️'}</span>
                {s.name}
              </div>
              <span className={`badge ${s.color}`}>
                <span className="badge-dot" />{s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
