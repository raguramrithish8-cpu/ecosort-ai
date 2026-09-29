import React, { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, X, Filter, Info, AlertTriangle, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { useNotifications } from './NotificationContext';
import NotificationDetailModal from './NotificationDetailModal';

export default function NotificationCenter({ isOpen, onClose, onOpenHistory }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  if (!isOpen) return null;

  const handleNotifClick = (notif) => {
    markAsRead(notif.id);
    setSelectedNotif(notif);
    setIsDetailOpen(true);
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 54,
          right: 0,
          width: 380,
          maxHeight: 520,
          background: '#ffffff',
          borderRadius: 12,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
          border: '1px solid var(--color-grey-200)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-grey-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-grey-50)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={16} color="var(--color-blue-600)" />
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-grey-900)' }}>Notifications</span>
            {unreadCount > 0 && (
              <span className="badge blue" style={{ fontSize: 10, padding: '2px 7px' }}>
                {unreadCount} unread
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                title="Mark all as read"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--color-blue-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <CheckCheck size={14} /> Read all
              </button>
            )}
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-grey-400)', padding: 4 }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
          {notifications.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-grey-400)' }}>
              <Bell size={32} strokeWidth={1.2} style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: 13, fontWeight: 500 }}>No notifications yet</div>
            </div>
          ) : (
            notifications.slice(0, 10).map(n => (
              <div
                key={n.id}
                onClick={() => handleNotifClick(n)}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--color-grey-100)',
                  background: n.read ? '#ffffff' : 'var(--color-blue-50)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = n.read ? 'var(--color-grey-50)' : 'var(--color-blue-100)'}
                onMouseOut={(e) => e.currentTarget.style.background = n.read ? '#ffffff' : 'var(--color-blue-50)'}
              >
                <div style={{ marginTop: 2 }}>
                  {n.severity === 'success' && <CheckCircle size={16} color="var(--color-green-500)" />}
                  {n.severity === 'info' && <Info size={16} color="var(--color-blue-500)" />}
                  {n.severity === 'warning' && <AlertTriangle size={16} color="var(--color-yellow-600)" />}
                  {n.severity === 'error' && <AlertCircle size={16} color="var(--color-red-500)" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: n.read ? 600 : 700, color: 'var(--color-grey-900)' }}>
                      {n.title}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--color-grey-400)' }}>{n.timestamp}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-grey-600)', marginTop: 3, lineHeight: 1.4 }}>
                    {n.message}
                  </div>
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: 'var(--color-blue-600)' }}>
                    <Eye size={12} /> View Details →
                  </div>
                </div>
                {!n.read && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-blue-600)', marginTop: 6 }} />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--color-grey-100)', background: 'var(--color-grey-50)', textAlign: 'center' }}>
          <button
            onClick={() => {
              onClose();
              onOpenHistory();
            }}
            style={{ background: 'none', border: 'none', color: 'var(--color-blue-600)', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            View All Notifications ({notifications.length}) →
          </button>
        </div>
      </div>

      {/* Notification Detail Modal */}
      <NotificationDetailModal
        notification={selectedNotif}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
}

// Complete Notification History Modal
export function NotificationHistoryModal({ isOpen, onClose }) {
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [filter, setFilter] = useState('All');

  const [selectedNotif, setSelectedNotif] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  if (!isOpen) return null;

  const handleNotifClick = (notif) => {
    markAsRead(notif.id);
    setSelectedNotif(notif);
    setIsDetailOpen(true);
  };

  const filtered = notifications.filter(n => {
    if (filter === 'Unread') return !n.read;
    if (filter === 'AI Detection') return n.type === 'AI Detection';
    if (filter === 'Reports') return n.type === 'Report';
    if (filter === 'System') return n.type === 'System';
    if (filter === 'Warnings') return n.severity === 'warning' || n.severity === 'error';
    return true;
  });

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div className="card" style={{ width: '100%', maxWidth: 740, maxHeight: '85vh', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
          {/* Header */}
          <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-grey-200)', background: 'var(--color-grey-50)' }}>
            <span className="card-title" style={{ fontSize: 16 }}>
              <Bell size={18} style={{ color: 'var(--color-blue-500)' }} /> Notification History ({notifications.length})
            </span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="btn btn-outline" style={{ fontSize: 12, padding: '4px 10px' }} onClick={markAllAsRead}>
                <CheckCheck size={13} /> Mark All as Read
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-grey-400)', padding: 4 }} onClick={onClose}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--color-grey-100)', display: 'flex', gap: 6, flexWrap: 'wrap', background: '#fff' }}>
            {['All', 'Unread', 'AI Detection', 'Reports', 'System', 'Warnings'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: filter === f ? '1px solid var(--color-blue-500)' : '1px solid var(--color-grey-200)',
                  background: filter === f ? 'var(--color-blue-50)' : '#fff',
                  color: filter === f ? 'var(--color-blue-700)' : 'var(--color-grey-700)',
                  fontSize: 12,
                  fontWeight: filter === f ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-grey-400)' }}>
                <Info size={32} strokeWidth={1} style={{ margin: '0 auto 8px' }} />
                <div>No notifications found for filter "{filter}"</div>
              </div>
            ) : (
              filtered.map(n => (
                <div
                  key={n.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 10,
                    border: '1px solid var(--color-grey-200)',
                    background: n.read ? '#fff' : 'var(--color-blue-50)',
                    marginBottom: 10,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ marginTop: 2 }}>
                    {n.severity === 'success' && <CheckCircle size={18} color="var(--color-green-500)" />}
                    {n.severity === 'info' && <Info size={18} color="var(--color-blue-500)" />}
                    {n.severity === 'warning' && <AlertTriangle size={18} color="var(--color-yellow-600)" />}
                    {n.severity === 'error' && <AlertCircle size={18} color="var(--color-red-500)" />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-grey-900)' }}>{n.title}</span>
                      <span className="badge blue" style={{ fontSize: 10, padding: '1px 6px' }}>{n.type}</span>
                      {!n.read ? (
                        <span className="badge green" style={{ fontSize: 10, padding: '1px 6px' }}>Unread</span>
                      ) : (
                        <span className="badge grey" style={{ fontSize: 10, padding: '1px 6px' }}>✓ Read</span>
                      )}
                      <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--color-grey-400)' }}>{n.date} · {n.timestamp}</span>
                    </div>

                    <div style={{ fontSize: 13, color: 'var(--color-grey-700)', marginTop: 4, lineHeight: 1.4 }}>
                      {n.message}
                    </div>

                    <div style={{ marginTop: 10 }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleNotifClick(n)}
                        style={{ fontSize: 11.5, padding: '4px 12px', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                      >
                        <Eye size={13} color="var(--color-blue-600)" /> View Content
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-grey-200)', background: 'var(--color-grey-50)', textAlign: 'right' }}>
            <button className="btn btn-outline" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {/* Notification Detail Modal */}
      <NotificationDetailModal
        notification={selectedNotif}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
}
