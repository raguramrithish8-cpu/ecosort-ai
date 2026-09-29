import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

// Toast context
export const ToastContext = React.createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'blue') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const icons = { green: CheckCircle, blue: Info, yellow: AlertTriangle, red: XCircle };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toast-container">
        {toasts.map(t => {
          const Icon = icons[t.type] || Info;
          return (
            <div key={t.id} className={`toast ${t.type}`}>
              <Icon className="toast-icon" size={18} />
              <span className="toast-message">{t.message}</span>
              <button className="toast-close" onClick={() => removeToast(t.id)}>×</button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return React.useContext(ToastContext);
}
