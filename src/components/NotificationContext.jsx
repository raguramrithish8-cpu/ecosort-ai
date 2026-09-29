import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext(null);

const STORAGE_KEY = 'circularai_notifications';

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1001',
    type: 'AI Detection',
    title: 'AI Detection Complete',
    message: 'Plastic Bottle detected with 96.8% confidence.',
    timestamp: '10:42 AM',
    date: '29 Sep 2026',
    read: false,
    severity: 'info',
    relatedPage: 'detection',
    contentType: 'detection',
    relatedData: {
      type: 'Plastic Bottle',
      confidence: 96.8,
      material: 'PET Plastic',
      recyclability: 'RECYCLABLE',
      potential: 'HIGH',
      value: '₹4.20/kg',
      recommendation: 'Send this material to the plastic recycling stream. High recovery value PET plastic bottle.',
      imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'notif-1002',
    type: 'Report',
    title: 'Report Generated',
    message: 'Daily Waste Report has been successfully generated.',
    timestamp: '10:30 AM',
    date: '29 Sep 2026',
    read: false,
    severity: 'success',
    relatedPage: 'reports',
    contentType: 'report',
    relatedData: {
      id: 'rep-daily-01',
      name: 'Daily Waste Report',
      type: 'Daily Waste Report',
      date: 'Sep 29, 2026',
      dataset: {
        totalWaste: '1,284 kg',
        recyclablePct: '72%',
        recoveredWeight: '856 kg',
        estimatedValue: '₹18,450',
        categories: [
          { category: 'Plastic', qty: 320, pct: 24.9, recyclable: 89, recovery: 89, value: '₹12,400' },
          { category: 'Paper', qty: 210, pct: 16.4, recyclable: 90, recovery: 90, value: '₹6,800' },
          { category: 'Organic', qty: 412, pct: 32.1, recyclable: 75, recovery: 75, value: '₹1,650' },
          { category: 'Metal', qty: 95, pct: 7.4, recyclable: 96, recovery: 96, value: '₹9,200' },
          { category: 'Glass', qty: 88, pct: 6.9, recyclable: 80, recovery: 80, value: '₹2,100' },
          { category: 'Other', qty: 159, pct: 12.4, recyclable: 18, recovery: 18, value: '₹280' },
        ]
      }
    }
  },
  {
    id: 'notif-1003',
    type: 'System',
    title: 'Smart IoT System Online',
    message: 'ESP32-CAM and LoRa gateway connected in prototype mode.',
    timestamp: '09:15 AM',
    date: '29 Sep 2026',
    read: true,
    severity: 'info',
    relatedPage: 'iot',
    contentType: 'iot',
    relatedData: {
      name: 'ESP32-CAM Module',
      id: 'ESP32-001',
      status: 'Connected',
      sub: 'Vision Camera · 30fps'
    }
  }
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load notifications from localStorage:', e);
    }
    return DEFAULT_NOTIFICATIONS;
  });

  // Save to localStorage whenever notifications change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save notifications to localStorage:', e);
    }
  }, [notifications]);

  const addNotification = ({
    type = 'System',
    title,
    message,
    severity = 'info',
    relatedPage = '',
    contentType = 'general',
    relatedData = null
  }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newNotif = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type,
      title,
      message,
      timestamp: timeStr,
      date: dateStr,
      read: false,
      severity,
      relatedPage,
      contentType,
      relatedData
    };

    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return ctx;
}
