import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MessageCard from '../../components/MessageCard';
import * as messageService from '../../services/messageService';

export default function Messages() {
  const { user } = useAuth();
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messageService.getInbox().then(setInbox).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="list-page">
      <h1>Messages</h1>
      {inbox.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <div className="message-list">
          {inbox.map((conv) => (
            <MessageCard key={conv.id} conversation={conv} currentUserId={user?.id} />
          ))}
        </div>
      )}
    </div>
  );
}