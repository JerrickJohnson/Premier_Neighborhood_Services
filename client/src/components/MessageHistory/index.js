import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ChatInterface from '../ChatInterface';
import { QUERY_MESSAGE_HISTORY } from '../../utils/queries';
import Auth from '../../utils/auth';

function MessageHistory() {
  const userProfile = Auth.getProfile();
  const currentUserId = userProfile.data._id;
  console.log("Current User ID:", currentUserId);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProductId, setProductId] = useState(null);

  const { loading, error, data, refetch } = useQuery(QUERY_MESSAGE_HISTORY, {
    variables: { user: currentUserId },
    skip: !currentUserId
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    console.log("Loading message history...");
    return 'Loading...';
  }

  if (error) {
    console.error("Error fetching message history:", error.message);
    return (
      <div>
        <h4>Error Occurred:</h4>
        <p>{error.message}</p>
        {process.env.NODE_ENV === "development" && 
          <pre>{JSON.stringify(error, null, 2)}</pre>}
      </div>
    );
  }

  const handleUserClick = (userId, productId) => {
    console.log("User clicked:", userId);
    setSelectedUser(userId);
    if (productId) {
      console.log("Product ID associated:", productId);
      setProductId(productId);
    } else {
      setProductId(null); // Clear the previously selected product, if any
    }
  };

  return (
    <div className="container mt-3">
      <h2>Message History</h2>
      <ul className="list-group mb-3">
        {data && data.messageHistory && data.messageHistory.map((item) => {
          const isProduct = item.product && item.product.name;
          return (
            <li 
              key={isProduct ? item.product._id : item._id}
              onClick={() => handleUserClick(item._id, isProduct ? item.product._id : null)}
              className={`list-group-item ${item._id === selectedUser ? 'active' : ''}`}
            >
              {isProduct ? (
                <div>
                  <img src={item.product.image} alt={item.product.name} width="50" height="50"/>
                  <h5>{item.product.name}</h5>
                  <p>{item.product.description}</p>
                </div>
              ) : (
                `${item.firstName} ${item.lastName}`
              )}
            </li>
          );
        })}
      </ul>
      {selectedUser && (
        <ChatInterface senderId={currentUserId} receiverId={selectedUser} productId={selectedProductId} />
      )}
    </div>
  );
}

export default MessageHistory;