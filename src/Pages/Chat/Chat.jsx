import React, { useEffect, useState, useRef } from "react";
import Header from "../../Components/Header/Header";
import ChatProvider from "../../Providers/ChatProvider";
import ChatBody from "../../Components/ChatBody/ChatBody";
import ChatInput from "../../Components/ChatInput/ChatInput";
import UserList from "../../Components/UserList/UserList";

// Import the Chat stylesheet.
import "./chat.css";

const Chat = ({ socket }) => {
  // Declare variables & states for Chat component.
  const [error, setError] = useState(null);
  const typingStatusRef = useRef("");

  /* Function called whenever a typing status
   * indicator is received from the host. */
  const onTypingStatus = (data) => {
    try {
      typingStatusRef.current = data.message;
    } catch (err) {
      setError(err);
      console.error("Error setting typing status:", err);
    }
  };

  // Register and unregister event listeners.
  useEffect(() => {
    socket.on("typingResponse", onTypingStatus);

    // Unregister the event listeners.
    return () => {
      socket.off("typingResponse", onTypingStatus);
    };
  }, [socket]);

  // Render the Chat Component
  return (
    <div className="main">
      <ChatProvider socket={socket}>
        <div className="main-chat-layout">
          {/* Render the chat header component. */}
          <div className="chat-header">
            <Header />
          </div>
          <div className="chat-content-container">
            {/* Render the user list component */}
            <UserList />
            <div className="chat-inner-container">
              {/* Render the chat body. */}
              <ChatBody />
              {/* Render the chat input. */}
              <ChatInput />
            </div>
          </div>
          {/* Display errors when they have been detected. */}
          {error && (
            <div className="error-modal">
              <p>An error has occured: ${error}</p>
            </div>
          )}
        </div>
      </ChatProvider>
    </div>
  );
};

export default Chat;
