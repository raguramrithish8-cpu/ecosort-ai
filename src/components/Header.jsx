import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, X, CheckCircle, FileText, Tag, Database, ChevronRight, AlertCircle } from 'lucide-react';
import { useNotifications } from './NotificationContext';
import NotificationCenter, { NotificationHistoryModal } from './NotificationCenter';
import MaterialDetailModal from './MaterialDetailModal';
import { performSearch } from '../data/searchData';

const pageTitles = {
  dashboard: { title: 'Smart Waste Command Center', sub: 'Dashboard' },
  detection: { title: 'Live AI Detection', sub: 'Real-time waste identification' },
  classification: { title: 'Waste Classification', sub: 'Category analysis & trends' },
  recovery: { title: 'Recovery Intelligence', sub: 'Recyclability & value estimation' },
  circular: { title: 'Circular Economy', sub: 'Decision support system' },
  analytics: { title: 'Analytics', sub: 'Insights & performance metrics' },
  iot: { title: 'Smart IoT', sub: 'Device integration & monitoring' },
  reports: { title: 'Reports', sub: 'Generate & export reports' },
  settings: { title: 'Settings', sub: 'Configuration & preferences' },
};

const suggestedTags = ['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'E-Waste'];

export default function Header({ page, onNavigate }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { unreadCount } = useNotifications();

  // Global Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchRef = useRef(null);

  const info = pageTitles[page] || pageTitles.dashboard;

  // Handle Search Input Change
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const results = performSearch(searchTerm);
      setSearchResults(results);
      setIsDropdownOpen(true);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm]);

  // Click Outside Listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Clear Button
  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsDropdownOpen(false);
  };

  // Handle Item Select
  const handleSelectItem = (item) => {
    setIsDropdownOpen(false);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Handle Enter Key Press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchResults.length > 0) {
        handleSelectItem(searchResults[0]);
      }
    }
  };

  return (
    <header className="header" style={{ position: 'relative' }}>
      <div>
        <div className="header-title">
          {info.title}
          <span>/ {info.sub}</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="header-search" ref={searchRef} style={{ position: 'relative' }}>
        <Search className="header-search-icon" />
        <input
          type="text"
          placeholder="Search waste types, materials, reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.trim() && setIsDropdownOpen(true)}
          onKeyDown={handleKeyDown}
          style={{ paddingRight: searchTerm ? 36 : 14 }}
        />

        {/* Clear 'X' Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-grey-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
              borderRadius: '50%'
            }}
            title="Clear search"
          >
            <X size={15} />
          </button>
        )}

        {/* Live Search Results Dropdown */}
        {isDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              minWidth: 380,
              maxWidth: 500,
              background: '#ffffff',
              border: '1px solid var(--color-grey-200)',
              borderRadius: 12,
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)',
              zIndex: 999,
              maxHeight: 420,
              overflowY: 'auto',
              padding: '12px 0'
            }}
          >
            {searchResults.length > 0 ? (
              <div>
                {/* Results Found Header */}
                <div
                  style={{
                    padding: '6px 16px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--color-grey-100)',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--color-green-700)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={14} color="var(--color-green-500)" />
                    ✓ Results Found ({searchResults.length})
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--color-grey-400)', fontWeight: 500 }}>
                    Press ENTER for top result
                  </span>
                </div>

                {/* Results List */}
                <div style={{ padding: '6px 0' }}>
                  {searchResults.map((item) => {
                    const badgeClass =
                      item.type === 'REPORT' ? 'blue' :
                      item.type === 'WASTE TYPE' ? 'green' : 'grey';

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        style={{
                          padding: '10px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'var(--transition)',
                          borderBottom: '1px solid var(--color-grey-50)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-blue-50)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {item.type === 'REPORT' ? (
                            <FileText size={18} color="var(--color-blue-600)" />
                          ) : (
                            <Tag size={18} color="var(--color-green-600)" />
                          )}
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-grey-900)' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--color-grey-500)', marginTop: 2 }}>
                              {item.material || item.category} · {item.estimatedValue || item.recyclability}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span className={`badge ${badgeClass}`} style={{ fontSize: 10, padding: '2px 8px' }}>
                            {item.type}
                          </span>
                          <ChevronRight size={14} color="var(--color-grey-400)" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* No Results Found View */
              <div style={{ padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  <AlertCircle size={28} color="var(--color-red-500)" />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-grey-900)' }}>
                  No Results Found
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-grey-500)', marginTop: 4 }}>
                  “No matching waste type, material or report is available.”
                </div>

                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 12,
                    borderTop: '1px solid var(--color-grey-100)',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-grey-600)', textTransform: 'uppercase', marginBottom: 8 }}>
                    Try searching for:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {suggestedTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 999,
                          border: '1px solid var(--color-grey-200)',
                          background: 'var(--color-grey-50)',
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: 'var(--color-blue-600)',
                          cursor: 'pointer',
                          transition: 'var(--transition)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-blue-50)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-grey-50)'}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="header-actions">
        {/* System Status */}
        <div className="system-status-badge">
          <div className="system-status-dot" />
          All Systems Online
        </div>

        {/* AI Model */}
        <div className="ai-model-badge">
          <div className="ai-model-dot" />
          AI Model v2.4
        </div>

        {/* Notifications Button */}
        <div style={{ position: 'relative' }}>
          <button
            className="header-btn"
            title="Notifications"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            style={{ position: 'relative', background: isNotifOpen ? 'var(--color-blue-100)' : undefined }}
          >
            <Bell size={16} color={unreadCount > 0 ? 'var(--color-blue-600)' : 'var(--color-grey-600)'} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  background: 'var(--color-red-500)',
                  color: '#ffffff',
                  fontSize: 10,
                  fontWeight: 800,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 2px #ffffff'
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown Panel */}
          <NotificationCenter
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
            onOpenHistory={() => setIsHistoryOpen(true)}
          />
        </div>

        {/* User Avatar */}
        <div className="user-avatar" title="Admin User">AD</div>
      </div>

      {/* Notification History Full Modal */}
      <NotificationHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {/* Material Detail Modal */}
      <MaterialDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
}
