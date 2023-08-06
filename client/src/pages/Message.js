import React from 'react';
import MessageHistory from '../components/MessageHistory';

function Message({ currentUserId }) {
  return (
    <div className="message-page">
      <h1>Your Messages</h1>
      <MessageHistory currentUserId={currentUserId} />
      {/* You can add any other components or information if needed */}
    </div>
  );
}

export default Message;