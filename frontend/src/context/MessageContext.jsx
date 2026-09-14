import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as messageService from '../services/messageService';
import { useAuth } from './AuthContext';

const MessageContext = createContext(null);

export function MessageProvider({ children }) {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = useCallback(async () => {
    if (!user) return;
    try {
      const { count } = await messageService.getUnreadCount();
      setUnreadCount(count);
    } catch {
      // silently ignore — user may not be authenticated yet
    }
  }, [user]);

  useEffect(() => {
    refreshUnreadCount();
    const interval = setInterval(refreshUnreadCount, 15000); // poll every 15s
    return () => clearInterval(interval);
  }, [refreshUnreadCount]);

  return (
    <MessageContext.Provider value={{ unreadCount, refreshUnreadCount }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useMessages must be used within a MessageProvider');
  return context;
}