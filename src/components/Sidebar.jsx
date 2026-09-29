import React from 'react';
import {
  LayoutDashboard, Scan, Tag, TrendingUp, RefreshCw,
  BarChart2, Wifi, FileText, Settings, Recycle
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'detection', label: 'Live AI Detection', icon: Scan, badge: 2 },
  { id: 'classification', label: 'Waste Classification', icon: Tag },
  { id: 'recovery', label: 'Recovery Intelligence', icon: TrendingUp },
  { id: 'circular', label: 'Circular Economy', icon: RefreshCw },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'iot', label: 'Smart IoT', icon: Wifi },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ active, onNav }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Recycle size={20} color="white" strokeWidth={2.5} />
        </div>
        <div className="logo-text">
          <h1>CIRCULAI</h1>
          <span>Circular Economy Platform</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Main</div>
        {navItems.slice(0, 1).map(item => (
          <NavItem key={item.id} item={item} active={active} onNav={onNav} />
        ))}

        <div className="nav-section-label">AI Modules</div>
        {navItems.slice(1, 6).map(item => (
          <NavItem key={item.id} item={item} active={active} onNav={onNav} />
        ))}

        <div className="nav-section-label">System</div>
        {navItems.slice(6).map(item => (
          <NavItem key={item.id} item={item} active={active} onNav={onNav} />
        ))}
      </nav>

      {/* Footer badge */}
      <div className="sidebar-footer">
        <div className="project-badge">
          <div className="project-badge-dot" />
          <div>
            <div className="project-badge-text">System Online</div>
            <div className="project-badge-sub">AIS171 · Prototype Demo</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ item, active, onNav }) {
  const Icon = item.icon;
  return (
    <button
      className={`nav-item ${active === item.id ? 'active' : ''}`}
      onClick={() => onNav(item.id)}
    >
      <Icon className="nav-icon" size={17} />
      <span>{item.label}</span>
      {item.badge && <span className="nav-badge">{item.badge}</span>}
    </button>
  );
}
