import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import MessageItem from '../MessageItem';
import { QUERY_PRODUCT_MESSAGES } from '../../utils/queries';

function MessageList({ senderId, receiverId, productId }) {
  
  const { loading, error, data, refetch } = useQuery(QUERY_PRODUCT_MESSAGES, {
    variables: { product: productId },
});

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // Use the data fetched from the server. 
  const messages = data.productMessages;

  return (
    <div className="list-group">
      {messages.map((message) =>
        <MessageItem key={message.id} message={message} isCurrentUser={message.sender._id === senderId} />
      )}
    </div>
  );
}

export default MessageList;