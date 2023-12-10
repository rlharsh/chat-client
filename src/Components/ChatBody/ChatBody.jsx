import React, { useContext, useEffect } from "react";

import "./chatbody.css";
import { ChatContext } from "../../Providers/ChatProvider";

const ChatBody = () => {
  // Obtain the messges from the ChatContext.
  const { userName, messages } = useContext(ChatContext);

  // Message component.
  const MessageComponent = (message, isOwn, index) => {
    // Declare the variables using destructuring on message.
    const timestamp = new Date(message.timestamp).toLocaleString();
    const { text } = message;
    return (
      <div className={`chat-message-container ${isOwn ? "chat-message-container-own" : null}`}>
        <div key={index} className={`chat-message ${isOwn ? "chat-message-own" : null}`}>
          {text}
        </div>
        <div>
          <p>
            {isOwn ? "Sent: " : "Received: "}
            {timestamp}
          </p>
        </div>
      </div>
    );
  };

  // Function is called to render messages.
  const renderMessages = () => {
    return messages.map((message, index) => MessageComponent(message, message.name === userName, index));
  };

  return <div className="chat-body">{renderMessages()}</div>;
};

export default ChatBody;
