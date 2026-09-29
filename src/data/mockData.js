// Mock realistic demo data for CIRCULAI dashboard
export const kpiData = {
  totalWaste: { value: '1,284 kg', trend: '+5.2%', dir: 'up' },
  recyclable: { value: '72%', trend: '+3.1%', dir: 'up' },
  recovered: { value: '856 kg', trend: '+8.4%', dir: 'up' },
  recoveryValue: { value: '₹18,450', trend: '+12.3%', dir: 'up' },
  landfillAvoided: { value: '624 kg', trend: '+6.7%', dir: 'up' },
};

export const wasteCompositionData = [
  { name: 'Plastic', value: 320, color: '#3b82f6' },   // blue (AI data)
  { name: 'Paper', value: 210, color: '#22c55e' },      // green (recyclable)
  { name: 'Metal', value: 95, color: '#6b7280' },       // grey
  { name: 'Glass', value: 88, color: '#60a5fa' },       // blue variant
  { name: 'Organic', value: 412, color: '#eab308' },    // yellow (warning/attention)
  { name: 'Other', value: 159, color: '#ef4444' },      // red (non-recyclable)
];

export const recoveryTrendData = [
  { month: 'Apr', detected: 980, recovered: 640, diverted: 420 },
  { month: 'May', detected: 1050, recovered: 710, diverted: 470 },
  { month: 'Jun', detected: 1120, recovered: 780, diverted: 530 },
  { month: 'Jul', detected: 1200, recovered: 820, diverted: 580 },
  { month: 'Aug', detected: 1240, recovered: 840, diverted: 600 },
  { month: 'Sep', detected: 1284, recovered: 856, diverted: 624 },
];

export const recentDetections = [
  { time: '10:42 AM', type: 'Plastic Bottle', confidence: 96.8, material: 'PET Plastic', recyclable: 'Recyclable', value: '₹4.20/kg', action: 'Recycle', status: 'green' },
  { time: '10:38 AM', type: 'Cardboard Box', confidence: 94.1, material: 'Corrugated Paper', recyclable: 'Recyclable', value: '₹2.80/kg', action: 'Recycle', status: 'green' },
  { time: '10:31 AM', type: 'Food Waste', confidence: 88.5, material: 'Organic Material', recyclable: 'Compostable', value: '₹0.50/kg', action: 'Compost', status: 'yellow' },
  { time: '10:24 AM', type: 'Aluminium Can', confidence: 98.2, material: 'Aluminium', recyclable: 'Recyclable', value: '₹85/kg', action: 'Recycle', status: 'green' },
  { time: '10:17 AM', type: 'Contaminated Bag', confidence: 91.0, material: 'Mixed/Contaminated', recyclable: 'Non-Recyclable', value: '₹0/kg', action: 'Landfill', status: 'red' },
  { time: '10:09 AM', type: 'Glass Bottle', confidence: 95.4, material: 'Clear Glass', recyclable: 'Recyclable', value: '₹3.10/kg', action: 'Recycle', status: 'green' },
];

export const systemStatus = [
  { name: 'AI Vision Camera', status: 'Online', color: 'green', icon: 'Camera' },
  { name: 'AI Model (v2.4)', status: 'Running', color: 'green', icon: 'Cpu' },
  { name: 'Database', status: 'Online', color: 'green', icon: 'Database' },
  { name: 'IoT Gateway', status: 'Warning', color: 'yellow', icon: 'Wifi' },
  { name: 'Dashboard Server', status: 'Online', color: 'green', icon: 'Server' },
];

export const materialRecovery = [
  { material: 'Plastic', emoji: '♻️', qty: 320, recyclable: 285, rate: 89, value: '₹12,400', status: 'HIGH RECOVERY', color: 'green', bg: '#f0fdf4', border: '#bbf7d0' },
  { material: 'Paper', emoji: '📄', qty: 210, recyclable: 190, rate: 90, value: '₹6,800', status: 'HIGH RECOVERY', color: 'green', bg: '#f0fdf4', border: '#bbf7d0' },
  { material: 'Metal', emoji: '🔩', qty: 95, recyclable: 91, rate: 96, value: '₹9,200', status: 'HIGH RECOVERY', color: 'green', bg: '#f0fdf4', border: '#bbf7d0' },
  { material: 'Glass', emoji: '🫙', qty: 88, recyclable: 70, rate: 80, value: '₹2,100', status: 'MEDIUM RECOVERY', color: 'yellow', bg: '#fefce8', border: '#fde047' },
  { material: 'Organic', emoji: '🌿', qty: 412, recyclable: 330, rate: 75, value: '₹1,650', status: 'COMPOSTABLE', color: 'yellow', bg: '#fefce8', border: '#fde047' },
  { material: 'Other', emoji: '🗑️', qty: 159, recyclable: 28, rate: 18, value: '₹280', status: 'LOW RECOVERY', color: 'red', bg: '#fef2f2', border: '#fecaca' },
];

export const classificationData = [
  { category: 'Plastic', qty: 320, pct: 24.9, recyclable: 89, recovery: 89, value: '₹12,400', color: '#3b82f6' },
  { category: 'Paper', qty: 210, pct: 16.4, recyclable: 90, recovery: 90, value: '₹6,800', color: '#22c55e' },
  { category: 'Organic', qty: 412, pct: 32.1, recyclable: 75, recovery: 75, value: '₹1,650', color: '#eab308' },
  { category: 'Metal', qty: 95, pct: 7.4, recyclable: 96, recovery: 96, value: '₹9,200', color: '#6b7280' },
  { category: 'Glass', qty: 88, pct: 6.9, recyclable: 80, recovery: 80, value: '₹2,100', color: '#60a5fa' },
  { category: 'Other', qty: 159, pct: 12.4, recyclable: 18, recovery: 18, value: '₹280', color: '#ef4444' },
];

export const classificationTrend = [
  { day: 'Mon', plastic: 48, paper: 32, organic: 62, metal: 14, glass: 13, other: 24 },
  { day: 'Tue', plastic: 52, paper: 35, organic: 68, metal: 16, glass: 14, other: 22 },
  { day: 'Wed', plastic: 55, paper: 33, organic: 65, metal: 15, glass: 15, other: 25 },
  { day: 'Thu', plastic: 58, paper: 36, organic: 70, metal: 17, glass: 12, other: 26 },
  { day: 'Fri', plastic: 60, paper: 34, organic: 72, metal: 16, glass: 16, other: 28 },
  { day: 'Sat', plastic: 54, paper: 38, organic: 66, metal: 14, glass: 11, other: 22 },
  { day: 'Sun', plastic: 45, paper: 30, organic: 60, metal: 12, glass: 10, other: 18 },
];

export const analyticsData = {
  wasteTrend: [
    { week: 'W1', generated: 950, recovered: 640, recyclable: 680 },
    { week: 'W2', generated: 1020, recovered: 700, recyclable: 730 },
    { week: 'W3', generated: 1100, recovered: 770, recyclable: 790 },
    { week: 'W4', generated: 1180, recovered: 820, recyclable: 850 },
    { week: 'W5', generated: 1240, recovered: 840, recyclable: 890 },
    { week: 'W6', generated: 1284, recovered: 856, recyclable: 924 },
  ],
  recoveryEfficiency: [
    { name: 'Plastic', efficiency: 89 },
    { name: 'Paper', efficiency: 90 },
    { name: 'Metal', efficiency: 96 },
    { name: 'Glass', efficiency: 80 },
    { name: 'Organic', efficiency: 75 },
    { name: 'Other', efficiency: 18 },
  ],
  confidenceData: [
    { range: '90-100%', count: 142, color: '#22c55e' },
    { range: '80-90%', count: 67, color: '#3b82f6' },
    { range: '70-80%', count: 31, color: '#eab308' },
    { range: '<70%', count: 12, color: '#ef4444' },
  ],
};

export const iotDevices = [
  { name: 'ESP32-CAM Module', id: 'ESP32-001', status: 'Connected', color: 'green', sub: 'Vision Camera · 30fps', icon: 'Camera' },
  { name: 'AI Inference Engine', id: 'AI-SRV-01', status: 'Running', color: 'blue', sub: 'TinyML Model · v2.4', icon: 'Cpu' },
  { name: 'TinyML Processor', id: 'ML-001', status: 'Ready', color: 'blue', sub: 'Edge AI · 92% accuracy', icon: 'Zap' },
  { name: 'LoRa Gateway', id: 'LORA-001', status: 'Connected', color: 'green', sub: '868 MHz · Long Range', icon: 'Radio' },
  { name: 'Smart Sorting Unit', id: 'SORT-001', status: 'Ready', color: 'green', sub: '5-stream separator', icon: 'Layers' },
  { name: 'Cloud Dashboard', id: 'CLOUD-01', status: 'Online', color: 'green', sub: 'Real-time sync · WebSocket', icon: 'Cloud' },
];

export const reports = [
  { name: 'Daily Waste Report', type: 'Daily', date: 'Sep 29, 2026', size: '1.2 MB', status: 'Ready', icon: 'FileText' },
  { name: 'Weekly Waste Summary', type: 'Weekly', date: 'Sep 28, 2026', size: '4.8 MB', status: 'Ready', icon: 'BarChart2' },
  { name: 'Waste Classification Report', type: 'Classification', date: 'Sep 29, 2026', size: '2.1 MB', status: 'Ready', icon: 'List' },
  { name: 'Recovery Intelligence Report', type: 'Recovery', date: 'Sep 29, 2026', size: '3.4 MB', status: 'Generating', icon: 'TrendingUp' },
  { name: 'Circular Economy Report', type: 'Circular', date: 'Sep 28, 2026', size: '5.7 MB', status: 'Ready', icon: 'RefreshCw' },
  { name: 'Landfill Diversion Report', type: 'Landfill', date: 'Sep 29, 2026', size: '1.9 MB', status: 'Ready', icon: 'Trash2' },
];

export const aiDetectionResult = {
  type: 'Plastic Bottle',
  confidence: 96.8,
  material: 'PET Plastic',
  recyclability: 'RECYCLABLE',
  potential: 'HIGH',
  value: '₹4.20/kg',
  recommendation: 'Send this material to the plastic recycling stream. This PET plastic bottle has high recovery value and can be fully recycled into new plastic products.',
  alternatives: [
    { label: 'Plastic Bottle', pct: 96.8, color: 'green' },
    { label: 'Glass Bottle', pct: 1.7, color: 'grey' },
    { label: 'Other', pct: 1.5, color: 'grey' },
  ],
};
