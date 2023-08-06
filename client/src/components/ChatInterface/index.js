import React, { useEffect, useRef } from 'react'; 
import { io } from 'socket.io-client'; 
import MessageList from '../MessageList';
import SendMessageForm from '../SendMessageForm';
import './style.css';

function ChatInterface({ senderId, receiverId, productId }) {
  const socket = useRef(null);

  console.log('ChatInterface Props:', { senderId, receiverId, productId }); // Log props

  useEffect(() => {
    // Connect to the server
    socket.current = io('http://localhost:3001');

    // Connection logs
    socket.current.on('connect', () => {
      console.log('Socket connected:', socket.current.id); // This logs the socket ID
    });

    socket.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Listen to messages from the server
    socket.current.on('chat message', (msg) => {
      console.log("Received:", msg);
      // You'd likely update some state here to render the new message
    });

    // Cleanup on component unmount
    return () => {
      console.log('Component unmounting, disconnecting socket.');
      socket.current.disconnect();
    };
  }, []);

  return (
    <div className="chat-interface mt-4 p-4 border rounded">
      <MessageList senderId={senderId} receiverId={receiverId} productId={productId} />
      <SendMessageForm senderId={senderId} receiverId={receiverId} socket={socket.current} />
    </div>
  );
}

export default ChatInterface;