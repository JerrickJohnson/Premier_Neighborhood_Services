import React from 'react';
import MessageHistory from '../components/MessageHistory';

function Message({ currentUserId }) {
  return (
    <div className="message-page d-flex justify-content-center vh-90" style={{ marginTop: '10%' }}>
      <div className="card" style={{ maxWidth: '80%', minWidth: '80%' }}>
        <div className="card-header">
          <h1>Your Messages</h1>
        </div>
        <div className="card-body">
          <MessageHistory currentUserId={currentUserId} />
        </div>
      </div>
    </div>
  );
}

export default Message;