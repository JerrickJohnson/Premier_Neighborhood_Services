import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import MessageItem from '../MessageItem';
import { QUERY_PRODUCT_MESSAGES } from '../../utils/queries';
import './style.css';

function MessageList({ senderId, receiverId, productId, onProductClick }) {
  
  const { loading, error, data, refetch } = useQuery(QUERY_PRODUCT_MESSAGES, {
    variables: { product: productId },
  });
  const bottomChatRef = useRef(null);

  console.log("GraphQL Data:", data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data && data.productMessages) {
      bottomChatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const messages = data.productMessages;

  return (
    <div className="list-group" style={{ width: '100%' }}>
      {messages.slice().reverse().map((message) =>
        <MessageItem 
            key={message.id} 
            message={message} 
            isCurrentUser={message.sender._id === senderId} 
            onProductClick={onProductClick} 
        />
      )}
      <div ref={bottomChatRef}></div>  {/* Added empty div with the reference */}
    </div>
  );
}

export default MessageList;