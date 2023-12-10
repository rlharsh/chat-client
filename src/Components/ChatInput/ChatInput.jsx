import React, { useContext, useState } from "react";
import { ChatContext } from "../../Providers/ChatProvider";

// Import the Chat Body stylesheet.
import "./chatinput.css";

// Import the icons from Remix Icons.
import SendIcon from "remixicon-react/SendPlane2FillIcon";

const ChatInput = () => {
  // Declare variables & states for Chat Input component.
  const [userMessage, setUserMessage] = useState("");
  const { sendMessage } = useContext(ChatContext);

  /* Function is called whenever user attempts to send
   * a chat message, data is passed to the chat context for
   * processing. */
  const sendChatMessage = (e) => {
    e.preventDefault(); // Prevent the page from reloading.

    sendMessage({
      text: userMessage,
    });

    setUserMessage(""); // Clear the current text.
  };

  /* Function is called whenever the user inputs text. */
  const updateMessageText = (val) => {
    setUserMessage(val);
  };

  return (
    <div className="chat-input">
      <form action="" onSubmit={sendChatMessage}>
        <input type="text" name="chat-input" id="chat-input" placeholder="Enter text..." onChange={(e) => updateMessageText(e.target.value)} value={userMessage} />
      </form>
    </div>
  );
};

export default ChatInput;
