import React from 'react';
import { Wifi, AlertTriangle, Camera, Cpu, Zap, Radio, Layers, Cloud, ChevronRight } from 'lucide-react';
import { iotDevices } from '../data/mockData';

const iconMap = { Camera, Cpu, Zap, Radio, Layers, Cloud };

const flowNodes = [
  { label: 'ESP32-CAM', sub: 'Image Capture', icon: '📷', color: 'green' },
  { label: 'AI Vision', sub: 'Object Detection', icon: '🧠', color: 'blue' },
  { label: 'Waste Classification', sub: 'Material ID', icon: '🏷️', color: 'blue' },
  { label: 'Decision Engine', sub: 'AI Recommendation', icon: '⚡', color: 'blue' },
  { label: 'Smart Sorting', sub: 'Physical Separation', icon: '♻️', color: 'green' },
];

export default function IoTPage() {
  return (
    <div>
      {/* Hardware notice */}
      <div style={{ background: 'var(--color-blue-50)', border: '1px solid var(--color-blue-300)', borderRadius: 10, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 600, color: 'var(--color-blue-800)' }}>
        <AlertTriangle size={15} />
        SMART IoT INTEGRATION — Physical hardware prototype demonstration mode.
      </div>

      <div className="page-header">
        <div>
          <div className="page-title-main">Smart IoT Integration</div>
          <div className="page-title-sub">ESP32-CAM · TinyML · LoRa · Smart Sorting — Architecture & Monitoring</div>
        </div>
        <span className="badge green"><span className="badge-dot" />Connected (Demo)</span>
      </div>

      {/* Visual Flow */}
      <div className="card section">
        <div className="card-header">
          <span className="card-title"><Wifi size={17} style={{ color: 'var(--color-blue-500)' }} /> IoT Data Flow Pipeline</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, overflowX: 'auto', padding: '10px 0' }}>
            {flowNodes.map((node, i) => (
              <React.Fragment key={i}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: '16px 20px', minWidth: 120,
                  background: node.color === 'green' ? 'var(--color-green-50)' : 'var(--color-blue-50)',
                  border: `2px solid ${node.color === 'green' ? 'var(--color-green-200)' : 'var(--color-blue-200)'}`,
                  borderRadius: 14, textAlign: 'center',
                }}>
                  <span style={{ fontSize: 30 }}>{node.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 12.5, color: node.color === 'green' ? 'var(--color-green-700)' : 'var(--color-blue-700)' }}>{node.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-grey-500)', marginTop: 2 }}>{node.sub}</div>
                  </div>
                  <span className={`badge ${node.color}`} style={{ fontSize: 10 }}>
                    <span className="badge-dot" />{node.color === 'green' ? 'Ready' : 'AI Active'}
                  </span>
                </div>
                {i < flowNodes.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                    <ChevronRight size={22} color="var(--color-grey-400)" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Device Grid */}
      <div className="page-header" style={{ marginBottom: 12 }}>
        <div className="page-title-main" style={{ fontSize: 15 }}>Device Status</div>
      </div>
      <div className="grid-3 section">
        {iotDevices.map((device, i) => {
          const Icon = iconMap[device.icon] || Cpu;
          return (
            <div key={i} className="iot-device-card">
              <div className={`iot-device-icon`} style={{
                background: device.color === 'green' ? 'var(--color-green-50)' : device.color === 'blue' ? 'var(--color-blue-50)' : 'var(--color-yellow-50)',
                color: device.color === 'green' ? 'var(--color-green-600)' : device.color === 'blue' ? 'var(--color-blue-600)' : 'var(--color-yellow-600)',
              }}>
                <Icon size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="iot-device-name">{device.name}</div>
                <div className="iot-device-sub">{device.sub}</div>
                <div style={{ fontSize: 10.5, color: 'var(--color-grey-400)', marginTop: 2 }}>ID: {device.id}</div>
              </div>
              <span className={`badge ${device.color}`}>
                <span className="badge-dot" />{device.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tech specs */}
      <div className="grid-3 section">
        {[
          {
            title: 'ESP32-CAM',
            color: 'green',
            badgeText: 'Prototype Ready',
            specs: [
              { k: 'Module', v: 'ESP32-S AI-Thinker' },
              { k: 'Resolution', v: '1600×1200 UXGA' },
              { k: 'Frame Rate', v: '30 fps' },
              { k: 'Connectivity', v: 'WiFi 802.11 b/g/n' },
              { k: 'Status', v: 'Prototype Connected' },
            ],
          },
          {
            title: 'TinyML Engine',
            color: 'blue',
            badgeText: 'Active',
            specs: [
              { k: 'Framework', v: 'TensorFlow Lite' },
              { k: 'Model Size', v: '< 1 MB (quantized)' },
              { k: 'Inference', v: '< 100 ms/frame' },
              { k: 'Accuracy', v: '92.4%' },
              { k: 'Classes', v: '6 waste categories' },
            ],
          },
          {
            title: 'LoRa Gateway',
            color: 'blue',
            badgeText: 'Connected',
            specs: [
              { k: 'Protocol', v: 'LoRaWAN v1.0.3' },
              { k: 'Frequency', v: '868 MHz (EU) / 915 MHz (IN)' },
              { k: 'Range', v: 'Up to 15 km' },
              { k: 'Data Rate', v: '0.3 – 50 kbps' },
              { k: 'Application', v: 'Remote bin monitoring' },
            ],
          },
        ].map((tech, i) => (
          <div key={i} className="card">
            <div className="card-header">
              <span className="card-title">{tech.title}</span>
              <span className={`badge ${tech.color}`} style={{ fontSize: 10 }}>{tech.badgeText}</span>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {tech.specs.map((s, j) => (
                <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: j < tech.specs.length - 1 ? '1px solid var(--color-grey-100)' : 'none' }}>
                  <span style={{ fontSize: 12, color: 'var(--color-grey-500)' }}>{s.k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-grey-800)', textAlign: 'right' }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
