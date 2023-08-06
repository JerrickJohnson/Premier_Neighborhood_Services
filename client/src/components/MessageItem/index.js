import React from 'react';

function MessageItem({ message, isCurrentUser }) {
    return (
        <div className={`list-group-item ${isCurrentUser ? 'text-end' : 'text-start'}`}>
            {!isCurrentUser && 
                <div className="d-block">
                    <span className="sender-name font-weight-bold">{message.senderName}</span>
                </div>
            }
            
            {/* Handling Media Messages */}
            {message.mediaType === 'image' && 
                <img src={message.mediaUrl} alt="Sent media" className="message-media img-fluid rounded mt-2"/>
            }
            {message.mediaType === 'video' && 
                <video controls src={message.mediaUrl} className="message-media img-fluid rounded mt-2"></video>
            }
            
            <p className="mt-2">{message.messageText}</p>

            <span className="timestamp text-muted">{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
    );
}

export default MessageItem;