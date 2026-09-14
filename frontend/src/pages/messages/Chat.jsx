import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMessages } from '../../context/MessageContext';
import * as messageService from '../../services/messageService';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export default function Chat() {
  const { userId } = useParams();
  const { user } = useAuth();
  const { refreshUnreadCount } = useMessages();
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  const loadConversation = () => {
    messageService.getConversation(userId).then((data) => {
      setMessages(data.messages);
      setOtherUser(data.otherUser);
      refreshUnreadCount();
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadConversation();
    const interval = setInterval(loadConversation, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newMessage = await messageService.sendMessage({ receiver_id: userId, content: text });
    setMessages((prev) => [...prev, newMessage]);
    setText('');
  };

  const otherAvatarSrc = otherUser?.avatar_url ? `${API_BASE}${otherUser.avatar_url}` : null;
  const myAvatarSrc = user?.avatar_url ? `${API_BASE}${user.avatar_url}` : null;

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="chat-page">
      <div className="chat-header">
        <Link to="/messages" className="chat-back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
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
                avatarSrc ? (
                  <img src={avatarSrc} alt={name} className="chat-bubble-avatar" />
                ) : (
                  <div className="chat-bubble-avatar chat-avatar-placeholder">{name?.[0]}</div>
                )
              )}
              <div className={`chat-bubble ${isMine ? 'sent' : 'received'}`}>
                <p>{m.content}</p>
                <span className="chat-time">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              {isMine && (
                avatarSrc ? (
                  <img src={avatarSrc} alt={name} className="chat-bubble-avatar" />
                ) : (
                  <div className="chat-bubble-avatar chat-avatar-placeholder">{name?.[0]}</div>
                )
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="chat-send-btn" aria-label="Send">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}