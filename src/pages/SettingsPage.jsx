import React, { useState } from 'react';
import { Settings, Brain, Tag, Bell, Monitor, Info } from 'lucide-react';

function Toggle({ defaultOn = false, onChange }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button className={`toggle ${on ? 'on' : ''}`} onClick={() => { setOn(!on); onChange && onChange(!on); }} />
  );
}

export default function SettingsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title-main">Settings</div>
          <div className="page-title-sub">AI model, detection, categories and system configuration</div>
        </div>
        <button className="btn btn-primary"><Settings size={15} /> Save Changes</button>
      </div>

      {/* AI Model Information */}
      <div className="settings-section">
        <div className="settings-section-title"><Brain size={16} style={{ color: 'var(--color-blue-500)' }} /> AI Model Information</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Model Version</div>
            <div className="settings-row-sub">Current production model</div>
          </div>
          <span className="badge blue"><span className="badge-dot" />v2.4 (Demo)</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Model Architecture</div>
            <div className="settings-row-sub">Convolutional Neural Network</div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-grey-700)' }}>MobileNetV2 (Prototype)</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Overall Accuracy</div>
            <div className="settings-row-sub">On test dataset</div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-green-600)' }}>92.4% (Simulated)</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Training Dataset</div>
            <div className="settings-row-sub">Waste image samples used</div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-grey-700)' }}>10,000+ images (Demo)</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Last Updated</div>
            <div className="settings-row-sub">Model training date</div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-grey-700)' }}>Sep 15, 2026</span>
        </div>
      </div>

      {/* Detection Threshold */}
      <div className="settings-section">
        <div className="settings-section-title"><Brain size={16} style={{ color: 'var(--color-blue-500)' }} /> Detection Threshold</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Minimum Confidence Threshold</div>
            <div className="settings-row-sub">Detections below this are discarded</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="range" min="50" max="99" defaultValue="75" style={{ width: 120 }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-blue-600)', minWidth: 36 }}>75%</span>
          </div>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">High Confidence Alert</div>
            <div className="settings-row-sub">Alert when confidence exceeds threshold</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="range" min="80" max="99" defaultValue="95" style={{ width: 120 }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-green-600)', minWidth: 36 }}>95%</span>
          </div>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Batch Detection Mode</div>
            <div className="settings-row-sub">Process multiple items simultaneously</div>
          </div>
          <Toggle defaultOn={false} />
        </div>
      </div>

      {/* Waste Categories */}
      <div className="settings-section">
        <div className="settings-section-title"><Tag size={16} style={{ color: 'var(--color-blue-500)' }} /> Waste Categories</div>
        {['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'Other'].map((cat, i) => (
          <div key={i} className="settings-row">
            <div>
              <div className="settings-row-label">{cat}</div>
              <div className="settings-row-sub">Enable detection for this category</div>
            </div>
            <Toggle defaultOn={true} />
          </div>
        ))}
      </div>

      {/* Dashboard Preferences */}
      <div className="settings-section">
        <div className="settings-section-title"><Monitor size={16} style={{ color: 'var(--color-blue-500)' }} /> Dashboard Preferences</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Auto-refresh Interval</div>
            <div className="settings-row-sub">Dashboard data refresh rate</div>
          </div>
          <select style={{ padding: '6px 12px', border: '1px solid var(--color-grey-200)', borderRadius: 8, fontSize: 13, color: 'var(--color-grey-700)', background: 'white', fontFamily: 'var(--font-family)', cursor: 'pointer' }}>
            <option>30 seconds</option>
            <option>1 minute</option>
            <option>5 minutes</option>
            <option>Manual only</option>
          </select>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Show Demo Banner</div>
            <div className="settings-row-sub">Display demo/prototype warning banners</div>
          </div>
          <Toggle defaultOn={true} />
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Compact Table View</div>
            <div className="settings-row-sub">Reduce row padding in tables</div>
          </div>
          <Toggle defaultOn={false} />
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-section">
        <div className="settings-section-title"><Bell size={16} style={{ color: 'var(--color-blue-500)' }} /> Notification Settings</div>
        {[
          { label: 'High-value material detected', sub: 'Alert when valuable recyclables are identified', on: true },
          { label: 'Non-recyclable waste alert', sub: 'Notify when contaminated waste is detected', on: true },
          { label: 'System status warnings', sub: 'Alerts for device/model issues', on: true },
          { label: 'Daily summary report', sub: 'Receive daily performance digest', on: false },
          { label: 'Recovery target achieved', sub: 'Celebrate recovery milestones', on: true },
        ].map((n, i) => (
          <div key={i} className="settings-row">
            <div>
              <div className="settings-row-label">{n.label}</div>
              <div className="settings-row-sub">{n.sub}</div>
            </div>
            <Toggle defaultOn={n.on} />
          </div>
        ))}
      </div>

      {/* System Information */}
      <div className="settings-section">
        <div className="settings-section-title"><Info size={16} style={{ color: 'var(--color-blue-500)' }} /> System Information</div>
        {[
          { k: 'Project', v: 'CIRCULAI — AI-Powered Circular Economy Platform' },
          { k: 'Problem Statement', v: 'AIS171' },
          { k: 'Version', v: '1.0.0 (Prototype Demo)' },
          { k: 'Built With', v: 'React · Recharts · Lucide Icons · Vite' },
          { k: 'AI Framework', v: 'TensorFlow / TensorFlow Lite (Integrated)' },
          { k: 'IoT Hardware', v: 'ESP32-CAM + LoRa (Smart IoT Integration)' },
          { k: 'Dashboard Status', v: 'Demo / Prototype — Operational' },
        ].map((row, i) => (
          <div key={i} className="settings-row">
            <span style={{ fontSize: 13, color: 'var(--color-grey-500)', fontWeight: 500 }}>{row.k}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-grey-800)', textAlign: 'right', maxWidth: '60%' }}>{row.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
