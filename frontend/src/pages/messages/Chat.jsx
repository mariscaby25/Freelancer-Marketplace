import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMessages } from '../../context/MessageContext';
import * as messageService from '../../services/messageService';

export default function Chat() {
  const { userId } = useParams();
  const { user } = useAuth();
  const { refreshUnreadCount } = useMessages();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  const loadConversation = () => {
    messageService.getConversation(userId).then((data) => {
      setMessages(data);
      refreshUnreadCount();
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadConversation();
    const interval = setInterval(loadConversation, 5000); // simple polling
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

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="chat-page">
      <div className="chat-messages">
        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble ${m.sender_id === user.id ? 'sent' : 'received'}`}>
            <p>{m.content}</p>
            <span className="chat-time">{new Date(m.created_at).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="chat-input" onSubmit={handleSend}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="btn-primary">Send</button>
      </form>
    </div>
  );
}