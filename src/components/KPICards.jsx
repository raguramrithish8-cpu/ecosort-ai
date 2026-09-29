import React from 'react';
import {
  Scale, Recycle, Package, IndianRupee, Leaf, TrendingUp, TrendingDown
} from 'lucide-react';
import { kpiData } from '../data/mockData';

const cards = [
  {
    label: 'Total Waste Detected',
    key: 'totalWaste',
    icon: Scale,
    color: 'blue',
    unit: '',
  },
  {
    label: 'Recyclable Waste',
    key: 'recyclable',
    icon: Recycle,
    color: 'green',
    unit: '',
  },
  {
    label: 'Material Recovered',
    key: 'recovered',
    icon: Package,
    color: 'green',
    unit: '',
  },
  {
    label: 'Est. Recovery Value',
    key: 'recoveryValue',
    icon: IndianRupee,
    color: 'blue',
    unit: '',
  },
  {
    label: 'Landfill Avoided',
    key: 'landfillAvoided',
    icon: Leaf,
    color: 'green',
    unit: '',
  },
];

export default function KPICards() {
  return (
    <div className="kpi-grid">
      {cards.map(card => {
        const Icon = card.icon;
        const data = kpiData[card.key];
        const TrendIcon = data.dir === 'up' ? TrendingUp : TrendingDown;
        return (
          <div key={card.key} className={`kpi-card ${card.color}`}>
            <div className="flex items-center justify-between">
              <div className={`kpi-icon-wrap ${card.color}`}>
                <Icon size={20} strokeWidth={2} />
              </div>
              <span className={`kpi-trend ${data.dir}`}>
                <TrendIcon size={12} />
                {data.trend}
              </span>
            </div>
            <div>
              <div className="kpi-label">{card.label}</div>
              <div className="kpi-value">{data.value}</div>
            </div>
            <div className="kpi-sub">vs. last period</div>
          </div>
        );
      })}
    </div>
  );
}
