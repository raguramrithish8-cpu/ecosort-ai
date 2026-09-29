import React, { useState } from 'react';
import { RefreshCw, AlertTriangle, ChevronDown, ChevronRight, Brain } from 'lucide-react';

const flowSteps = [
  { label: 'WASTE DETECTED', sub: 'Physical waste item identified', color: 'grey', icon: '🗑️' },
  { label: 'AI CLASSIFICATION', sub: 'Vision model identifies material type', color: 'blue', icon: '🧠' },
  { label: 'RECYCLABILITY ASSESSMENT', sub: 'AI evaluates material recyclability', color: 'blue', icon: '🔍' },
  { label: 'RECOVERY VALUE ESTIMATION', sub: 'Market-based value calculated', color: 'blue', icon: '💰' },
  { label: 'AI RECOMMENDATION', sub: 'Optimal action determined', color: 'blue', icon: '⚡' },
  { label: 'RESOURCE RECOVERY', sub: 'Material enters circular economy', color: 'green', icon: '♻️' },
];

const scenarios = [
  {
    title: 'Plastic Bottle (PET)',
    steps: [
      { label: 'Waste Detected', color: 'grey', detail: 'Plastic bottle identified by camera' },
      { label: 'AI Classification: Plastic Bottle', color: 'blue', detail: 'Confidence: 96.8% · Material: PET Plastic' },
      { label: 'Recyclable ✓', color: 'green', detail: 'Fully recyclable — no contamination detected' },
      { label: 'High Recovery Potential', color: 'green', detail: 'Recovery rate: 89% · Value: ₹4.20/kg' },
      { label: 'Send to Plastic Recycling Stream', color: 'blue', detail: 'AI Recommendation: Route to PET recycling facility' },
      { label: 'Estimated Value: ₹4.20/kg', color: 'green', detail: 'Resource successfully recovered' },
    ],
  },
  {
    title: 'Aluminium Can',
    steps: [
      { label: 'Waste Detected', color: 'grey', detail: 'Metal can identified by camera' },
      { label: 'AI Classification: Aluminium Can', color: 'blue', detail: 'Confidence: 98.2% · Material: Aluminium' },
      { label: 'Recyclable ✓', color: 'green', detail: 'High-purity aluminium — fully recyclable' },
      { label: 'Very High Recovery Potential', color: 'green', detail: 'Recovery rate: 96% · Value: ₹85/kg' },
      { label: 'Send to Metal Recycling', color: 'blue', detail: 'Priority route to metal processing facility' },
      { label: 'Estimated Value: ₹85/kg', color: 'green', detail: 'Maximum resource value recovered' },
    ],
  },
  {
    title: 'Contaminated Bag',
    steps: [
      { label: 'Waste Detected', color: 'grey', detail: 'Mixed plastic bag identified' },
      { label: 'AI Classification: Contaminated Bag', color: 'blue', detail: 'Confidence: 91.0% · Material: Mixed/Contaminated' },
      { label: 'Non-Recyclable ✗', color: 'red', detail: 'High contamination — cannot be recycled' },
      { label: 'Low Recovery Potential', color: 'red', detail: 'Recovery rate: 5% · Value: ₹0/kg' },
      { label: 'Route to Safe Disposal', color: 'yellow', detail: 'AI Recommendation: Controlled landfill disposal' },
      { label: 'Minimise Landfill Impact', color: 'yellow', detail: 'Flagged for contamination analysis' },
    ],
  },
];

const actions = [
  { label: 'Recycle', color: 'green', icon: '♻️', desc: 'Materials re-enter production cycle' },
  { label: 'Reuse', color: 'green', icon: '🔄', desc: 'Items used again without processing' },
  { label: 'Recover', color: 'blue', icon: '⚡', desc: 'Energy or material recovery' },
  { label: 'Compost', color: 'yellow', icon: '🌱', desc: 'Organic material composted' },
  { label: 'Safe Disposal', color: 'red', icon: '🗑️', desc: 'Controlled landfill for non-recyclables' },
];

export default function CircularPage() {
  const [activeScenario, setActiveScenario] = useState(0);

  return (
    <div>
      <div className="demo-banner">
        <AlertTriangle size={14} />
        PROTOTYPE — Circular Economy Decision Support is AI-assisted simulation
      </div>

      <div className="page-header">
        <div>
          <div className="page-title-main">Circular Economy Decision Support</div>
          <div className="page-title-sub">AI-driven waste-to-resource pipeline visualization</div>
        </div>
      </div>

      <div className="grid-21 section" style={{ alignItems: 'start' }}>
        {/* Main Flow */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><RefreshCw size={17} style={{ color: 'var(--color-blue-500)' }} /> Main Circular Economy Flow</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              {flowSteps.map((step, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    width: '100%', maxWidth: 500,
                    background: step.color === 'blue' ? 'var(--color-blue-50)' : step.color === 'green' ? 'var(--color-green-50)' : 'var(--color-grey-100)',
                    border: `2px solid ${step.color === 'blue' ? 'var(--color-blue-200)' : step.color === 'green' ? 'var(--color-green-200)' : 'var(--color-grey-300)'}`,
                    borderRadius: 12,
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}>
                    <span style={{ fontSize: 24 }}>{step.icon}</span>
                    <div>
                      <div style={{
                        fontWeight: 800, fontSize: 13.5,
                        color: step.color === 'blue' ? 'var(--color-blue-700)' : step.color === 'green' ? 'var(--color-green-700)' : 'var(--color-grey-700)',
                      }}>{step.label}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--color-grey-500)', marginTop: 2 }}>{step.sub}</div>
                    </div>
                    {step.color !== 'grey' && (
                      <div style={{ marginLeft: 'auto' }}>
                        <span className={`badge ${step.color}`}><span className="badge-dot" />{step.color === 'blue' ? 'AI' : 'Done'}</span>
                      </div>
                    )}
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px 0' }}>
                      <div style={{ width: 2, height: 14, background: 'var(--color-grey-300)' }} />
                      <ChevronDown size={14} color="var(--color-grey-400)" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Possible Actions */}
            <div style={{ marginTop: 24, borderTop: '1px solid var(--color-grey-100)', paddingTop: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-grey-500)', marginBottom: 12 }}>Possible Actions</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {actions.map((a, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
                    background: 'white', border: `1px solid var(--color-grey-200)`,
                    borderRadius: 10, fontSize: 13, fontWeight: 600,
                  }}>
                    <span>{a.icon}</span>
                    <span style={{ color: a.color === 'green' ? 'var(--color-green-700)' : a.color === 'blue' ? 'var(--color-blue-700)' : a.color === 'yellow' ? 'var(--color-yellow-700)' : 'var(--color-red-700)' }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Panel */}
        <div>
          <div className="card">
            <div className="card-header">
              <span className="card-title"><Brain size={17} style={{ color: 'var(--color-blue-500)' }} /> Decision Scenarios</span>
            </div>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-grey-100)', display: 'flex', gap: 8 }}>
              {scenarios.map((s, i) => (
                <button key={i}
                  className={`filter-btn ${activeScenario === i ? 'active' : ''}`}
                  style={{ fontSize: 11 }}
                  onClick={() => setActiveScenario(i)}>
                  {s.title}
                </button>
              ))}
            </div>
            <div className="card-body">
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-grey-800)', marginBottom: 14 }}>
                {scenarios[activeScenario].title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {scenarios[activeScenario].steps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div style={{
                      padding: '10px 14px',
                      background: step.color === 'blue' ? 'var(--color-blue-50)' : step.color === 'green' ? 'var(--color-green-50)' : step.color === 'red' ? 'var(--color-red-50)' : step.color === 'yellow' ? 'var(--color-yellow-50)' : 'var(--color-grey-50)',
                      borderRadius: 8, border: `1px solid ${step.color === 'blue' ? 'var(--color-blue-100)' : step.color === 'green' ? 'var(--color-green-100)' : step.color === 'red' ? 'var(--color-red-100)' : step.color === 'yellow' ? 'var(--color-yellow-100)' : 'var(--color-grey-200)'}`,
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 12.5, color: step.color === 'blue' ? 'var(--color-blue-700)' : step.color === 'green' ? 'var(--color-green-700)' : step.color === 'red' ? 'var(--color-red-700)' : step.color === 'yellow' ? 'var(--color-yellow-700)' : 'var(--color-grey-700)' }}>{step.label}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--color-grey-500)', marginTop: 2 }}>{step.detail}</div>
                    </div>
                    {i < scenarios[activeScenario].steps.length - 1 && (
                      <div style={{ display: 'flex', justifyContent: 'center', padding: '2px 0' }}>
                        <ChevronDown size={13} color="var(--color-grey-400)" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Impact summary */}
          <div className="card" style={{ marginTop: 16 }}>
            <div className="card-header">
              <span className="card-title">Circular Economy Impact (Demo)</span>
            </div>
            <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Materials Diverted', value: '856 kg', color: 'green' },
                { label: 'CO₂ Avoided', value: '1.2 T', color: 'green' },
                { label: 'Recovery Value', value: '₹32,430', color: 'blue' },
                { label: 'Landfill Avoided', value: '624 kg', color: 'green' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--color-grey-50)', borderRadius: 10, border: '1px solid var(--color-grey-100)' }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: s.color === 'green' ? 'var(--color-green-600)' : 'var(--color-blue-600)' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-grey-500)', marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
