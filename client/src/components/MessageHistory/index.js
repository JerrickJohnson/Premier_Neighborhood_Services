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
    setProductId(productId);
  };

  return (
    <div className="container-fluid mt-6 px-5"> 
      {/* Button to toggle message list */}
      <button
        className="btn btn-primary mb-2"
        type="button"
        data-toggle="collapse"
        data-target="#messageList"
        aria-expanded="false"
        aria-controls="messageList"
      >
        Messages
      </button>

      {/* Collapsible message list */}
      <ul id="messageList" className="list-group mb-3 collapse show">
        {data && data.messageHistory && data.messageHistory.map((userItem) => {
          return userItem.products.map(product => (
            <li 
              key={product._id}
              onClick={() => handleUserClick(userItem._id, product._id)}
              className={`list-group-item d-flex align-items-center 
                ${userItem._id === selectedUser && product._id === selectedProductId ? 'active' : ''}`} 
              style={{cursor: 'pointer', border: '2px solid transparent', transition: 'border-color 0.2s'}}
              onMouseEnter={e => e.target.style.borderColor = '#333'} 
              onMouseLeave={e => e.target.style.borderColor = 'transparent'} 
            >
              <img src={`/images/${product.image}`} alt={product.name} width="100" height="100"/>
              <div className="ml-3 d-flex flex-column flex-grow-1">
                <div className="d-flex justify-content-between">
                  <h5>{product.name}</h5>
                  <span className="font-weight-bold">{userItem.firstName} {userItem.lastName}</span>
                </div>
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