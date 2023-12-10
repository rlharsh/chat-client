import React, { useContext, useState } from "react";

// Import the header.css stylesheet.
import "./header.css";

// Import the icons from Remix Icons.
import SystemMenuIcon from "remixicon-react/MenuFillIcon";
import CopyIcon from "remixicon-react/FileCopyFillIcon";
import { ChatContext } from "../../Providers/ChatProvider";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { toggleSystemMenu, toggleUserMenu, userMenuShowing, systemMenuShowing } = useContext(ChatContext);
  const location = useLocation();
  const chatPath = location.pathname.substring(6);

  /* Function that runs whenever the user clicks
   * on the button to copy the room id. */
  const copyCode = () => {
    navigator.clipboard.writeText(chatPath);
  };

  return (
    <div className="flex horizontal space-between chat-header">
      {/* Button to toggle the User Panel */}
      <button className="button-clear" onClick={toggleUserMenu}>
        <SystemMenuIcon />
        <p>Masquerade</p>
      </button>
      {/* Button to copy the room code */}
      <button className="button-clear" onClick={copyCode}>
        <CopyIcon />
      </button>
    </div>
  );
};

export default Header;
