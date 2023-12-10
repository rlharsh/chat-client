import React, { useContext } from "react";

// Import User List stylesheet.
import "./userlist.css";
import { ChatContext } from "../../Providers/ChatProvider";

const UserList = () => {
  // Obtain the messges from the User list.
  const { users, userMenuShowing, toggleUserMenu } = useContext(ChatContext);

  /* Function that is called to render a list
   * of users to the menu. */
  const renderUsers = () => {
    return users.map((user) => <div className="user">{user}</div>);
  };

  /* Function that is called to toggle the user
   * menu via the Context Provider. */
  const toggleDisplay = () => {
    toggleUserMenu();
  };

  return (
    <div>
      {userMenuShowing && (
        <div className="user-list">
          {renderUsers()}
          <button onClick={toggleDisplay}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
