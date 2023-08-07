import React from 'react';
import './style.css';

function MessageItem({ message, isCurrentUser, onProductClick }) {
    return (
        <div 
            className={`d-flex justify-content-${isCurrentUser ? 'end' : 'start'} my-2`}  // This line aligns the box to the left or right
        >
            <div  // This inner div represents the message box itself
                className={`message-box px-3 py-2 rounded ${isCurrentUser ? 'bg-primary text-white' : 'bg-lightgrey text-dark'}`}
                onClick={() => onProductClick && onProductClick(message.product._id)}
            >
                {!isCurrentUser && 
                    <div className="d-block mb-1">
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

                <span className="timestamp text-muted">
                    {message.createdAt ? new Date(Number(message.createdAt)).toLocaleTimeString() : 'No timestamp'}
                </span>
            </div>
        </div>
    );
}

export default MessageItem;