import React, { useState } from 'react';
import MessageList from '../MessageList';
import SendMessageForm from '../SendMessageForm';

function ProductItemExpanded({ product, currentUserId }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleMakeOffer = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="product-item-expanded">
      {/* existing code to display product information */}

      <button onClick={handleMakeOffer}>Make Offer</button>

      {isChatOpen && (
        <div className="chat-interface">
          <MessageList senderId={currentUserId} receiverId={product.seller} />
          <SendMessageForm senderId={currentUserId} receiverId={product.seller} />
        </div>
      )}
    </div>
  );
}

export default ProductItemExpanded;