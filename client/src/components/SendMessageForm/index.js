import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../../utils/mutations";
import { QUERY_PRODUCT_MESSAGES } from '../../utils/queries';

function SendMessageForm({ senderId, receiverId, productId, socket }) {
  const [messageText, setMessageText] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await sendMessage({
        variables: { sender: senderId, receiver: receiverId, messageText, product: productId },
        refetchQueries: [{ query: QUERY_PRODUCT_MESSAGES, variables: { product: productId } }],
      });

      if (response && socket) {
        const message = {
          senderId,
          receiverId,
          text: messageText,
        };
        socket.emit("chat message", message);
      }

      setMessageText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3" style={{ width: '100%' }}>
      <div className="form-group d-flex" style={{ width: '100%' }}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="form-control mr-2"
          placeholder="Type your message..."
          style={{ flexGrow: 1 }}  // Makes the input grow to occupy available space
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </div>
    </form>
  );
}

export default SendMessageForm;