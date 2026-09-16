import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMessages } from '../../context/MessageContext';
import * as messageService from '../../services/messageService';
import '../../styles/messages.css';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export default function MessagesPage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const { refreshUnreadCount } = useMessages();
  const navigate = useNavigate();

  const [inbox, setInbox] = useState([]);
  const [inboxLoading, setInboxLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);
  const hasLoadedChatOnce = useRef(false);

  const loadInbox = () => {
    messageService.getInbox().then(setInbox).finally(() => setInboxLoading(false));
  };

  useEffect(() => {
    loadInbox();
    const interval = setInterval(loadInbox, 8000);
    return () => clearInterval(interval);
  }, []);

  const loadConversation = (isFirstLoad = false) => {
    if (!userId) return;
    if (isFirstLoad) setChatLoading(true);
    messageService.getConversation(userId).then((data) => {
      setMessages(data.messages);
      setOtherUser(data.otherUser);
      refreshUnreadCount();
      loadInbox();
    }).finally(() => {
      if (isFirstLoad) setChatLoading(false);
      hasLoadedChatOnce.current = true;
    });
  };

  useEffect(() => {
    if (!userId) return;
    hasLoadedChatOnce.current = false;
    loadConversation(true);
    const interval = setInterval(() => loadConversation(false), 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !userId) return;
    const newMessage = await messageService.sendMessage({ receiver_id: userId, content: text });
    setMessages((prev) => [...prev, newMessage]);
    setText('');
  };

  const myAvatarSrc = user?.avatar_url ? `${API_BASE}${user.avatar_url}` : null;
  const otherAvatarSrc = otherUser?.avatar_url ? `${API_BASE}${otherUser.avatar_url}` : null;

  return (
    <div className={`messages-layout ${userId ? 'chat-open' : ''}`}>
      <div className="messages-sidebar">
        <div className="messages-sidebar-header">
          <h2>Messages</h2>
        </div>
        <div className="messages-sidebar-list">
          {inboxLoading ? (
            <p className="page-loading">Loading...</p>
          ) : inbox.length === 0 ? (
            <p className="messages-empty-hint">No conversations yet.</p>
          ) : (
            inbox.map((conv) => {
              const otherId = conv.sender_id === user.id ? conv.receiver_id : conv.sender_id;
              const avatarSrc = conv.other_avatar_url ? `${API_BASE}${conv.other_avatar_url}` : null;
              return (
                <Link
                  key={conv.id}
                  to={`/messages/${otherId}`}
                  className={`messages-sidebar-item ${String(otherId) === String(userId) ? 'active' : ''}`}
                >
                  {avatarSrc ? (
                    <img src={avatarSrc} alt={conv.other_name} />
                  ) : (
                    <div className="chat-avatar-placeholder">{conv.other_name?.[0]}</div>
                  )}
                  <div className="messages-sidebar-item-info">
                    <div className="messages-sidebar-item-top">
                      <strong>{conv.other_name}</strong>
                      {conv.unread_count > 0 && <span className="badge">{conv.unread_count}</span>}
                    </div>
                    <p>{conv.content}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

      <div className="messages-chat-panel">
        {!userId ? (
          <div className="messages-empty-state">
            <i className="fa-solid fa-comments"></i>
            <p>Select a conversation to start chatting</p>
          </div>
        ) : chatLoading && !hasLoadedChatOnce.current ? (
          <p className="page-loading">Loading...</p>
        ) : (
          <>
            <div className="chat-header">
              <button className="chat-back-btn" onClick={() => navigate('/messages')}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              {otherAvatarSrc ? (
                <img src={otherAvatarSrc} alt={otherUser?.name} className="chat-header-avatar" />
              ) : (
                <div className="chat-header-avatar chat-avatar-placeholder">{otherUser?.name?.[0]}</div>
              )}
              <div className="chat-header-info">
                <strong>{otherUser?.name}</strong>
                <span className="chat-header-role">{otherUser?.role}</span>
              </div>
              {otherUser?.email && (
                <a href={`mailto:${otherUser.email}`} className="chat-email-btn" aria-label="Email">
                  <i className="fa-solid fa-envelope"></i>
                </a>
              )}
            </div>

            <div className="chat-messages">
              {messages.map((m) => {
                const isMine = m.sender_id === user.id;
                const avatarSrc = isMine ? myAvatarSrc : otherAvatarSrc;
                const name = isMine ? user.name : otherUser?.name;
                return (
                  <div key={m.id} className={`chat-row ${isMine ? 'sent' : 'received'}`}>
                    {!isMine && (
                      avatarSrc
                        ? <img src={avatarSrc} alt={name} className="chat-bubble-avatar" />
                        : <div className="chat-bubble-avatar chat-avatar-placeholder">{name?.[0]}</div>
                    )}
                    <div className={`chat-bubble ${isMine ? 'sent' : 'received'}`}>
                      <p>{m.content}</p>
                      <span className="chat-time">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {isMine && (
                      avatarSrc
                        ? <img src={avatarSrc} alt={name} className="chat-bubble-avatar" />
                        : <div className="chat-bubble-avatar chat-avatar-placeholder">{name?.[0]}</div>
                    )}
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <form className="chat-input" onSubmit={handleSend}>
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." />
              <button type="submit" className="chat-send-btn" aria-label="Send">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}