import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../../utils/mutations";

function SendMessageForm({ senderId, receiverId, productId, socket }) {
  const [messageText, setMessageText] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);
  console.log("SenderId:", senderId, "ReceiverId:", receiverId);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log({ sender: senderId, receiver: receiverId, messageText });
      const response = await sendMessage({
        variables: { sender: senderId, receiver: receiverId, messageText, product: productId },
    });

      // If the message was sent successfully and we have a socket connection, emit the message
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
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group d-flex">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="form-control mr-2"
          placeholder="Type your message..."
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </div>
    </form>
  );
}

export default SendMessageForm;
