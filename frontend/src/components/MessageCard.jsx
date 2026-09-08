import React from 'react';
import { Link } from 'react-router-dom';

export default function MessageCard({ conversation, currentUserId }) {
  const otherId = conversation.sender_id === currentUserId ? conversation.receiver_id : conversation.sender_id;

  return (
    <Link to={`/messages/${otherId}`} className="message-card">
      <div className="message-card-avatar">{conversation.other_name?.[0]}</div>
      <div className="message-card-body">
        <div className="message-card-top">
          <strong>{conversation.other_name}</strong>
          {conversation.unread_count > 0 && (
            <span className="badge">{conversation.unread_count}</span>
          )}
        </div>
        <p className="message-preview">{conversation.content}</p>
      </div>
    </Link>
  );
}