import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ChatInterface from '../ChatInterface';
import { QUERY_MESSAGE_HISTORY } from '../../utils/queries';
import Auth from '../../utils/auth';

function MessageHistory() {
  const userProfile = Auth.getProfile();
  const currentUserId = userProfile.data._id;

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProductId, setProductId] = useState(null);

  const { loading, error, data, refetch } = useQuery(QUERY_MESSAGE_HISTORY, {
    variables: { user: currentUserId },
    skip: !currentUserId
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return 'Loading...';
  if (error) {
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
    setSelectedUser(userId);
    if (productId) setProductId(productId);
    else setProductId(null); 
  };

  return (
    <div className="container mt-3">
      <h2>Message History</h2>
      <ul className="list-group mb-3">
        {data && data.messageHistory && data.messageHistory.map((userItem) => {
          return userItem.products.map(product => (
              <li 
                  key={product._id}
                  onClick={() => handleUserClick(userItem._id, product._id)}
                  className={`list-group-item d-flex align-items-center ${userItem._id === selectedUser ? 'active' : ''}`}
              >
                  <img src={`/images/${product.image}`} alt={product.name} width="100" height="100"/>
                  <div className="ml-3">
                      <h5>{product.name}</h5>
                      <p>{product.description}</p>
                  </div>
              </li>
          ));
        })}
      </ul>
      {selectedUser && (
        <ChatInterface senderId={currentUserId} receiverId={selectedUser} productId={selectedProductId} />
      )}
    </div>
  );
}

export default MessageHistory;