import React, { useEffect, useRef } from 'react'; 
import { io } from 'socket.io-client'; 
import MessageList from '../MessageList';
import SendMessageForm from '../SendMessageForm';
import './style.css';

function ChatInterface({ senderId, receiverId, productId }) {
  const socket = useRef(null);

  console.log('ChatInterface Props:', { senderId, receiverId, productId });

  useEffect(() => {
    // Connect to the server
    socket.current = io('http://localhost:3001');

    socket.current.on('connect', () => {
      console.log('Socket connected:', socket.current.id);
    });

    socket.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.current.on('chat message', (msg) => {
      console.log("Received:", msg);
      // Add state management logic to update the message list if desired.
    });

    // Cleanup on component unmount
    return () => {
      console.log('Component unmounting, disconnecting socket.');
      socket.current.disconnect();
    };
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="chat-interface mt-4 p-4 border rounded">
      <MessageList 
          senderId={senderId} 
          receiverId={receiverId} 
          productId={productId} 
      />
      <SendMessageForm 
          senderId={senderId} 
          receiverId={receiverId} 
          productId={productId}  // Pass the productId here as well
          socket={socket.current} 
      />
    </div>
  );
}

export default ChatInterface;