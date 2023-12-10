import React, { createContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

export const ChatContext = createContext(undefined);

const ChatProvider = ({ children, socket }) => {
  // Declare variables & state for provider.
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [systemMenuShowing, setSystemMenuShowing] = useState(false);
  const [userMenuShowing, setUserMenuShowing] = useState(false);
  const userName = socket.username;
  const { id } = useParams();

  // Function called to toggle the user list menu.
  const toggleUserMenu = () => {
    setUserMenuShowing((previousState) => !previousState);
  };

  // Function called to toggle the system menu.
  const toggleSystemMenu = () => {
    setSystemMenuShowing((previousState) => !previousState);
  };

  /* Function called whenever a new message is
   * passed from the host the client. */
  const onNewMessage = (data) => {
    try {
      setMessages((prevMessages) => prevMessages.concat(data));
    } catch (err) {
      setError(err);
      console.error("Error receiving message:", err);
    }
  };

  /* Function called whenever a new user
   * enters the chatroom. */
  const onUserJoinedRoom = (data) => {
    try {
      setUsers(data.users);
    } catch (err) {
      setError(err);
      console.error("Error communicating user joining room:", err);
    }
  };

  /* Function called whenever self enters
   * into a new chatroom.
   */
  const onSelfEntered = (data) => {
    try {
      setUsers(data.users);
    } catch (err) {
      setError(err);
      console.error("Error joining room:", err);
    }
  };

  const handleUserLeft = (data) => {
    /* pass */
  };

  useEffect(() => {
    socket.on("messageResponse", onNewMessage);
    socket.on("roomJoined", onUserJoinedRoom);
    socket.on("roomEntered", onSelfEntered);
    socket.on("userLeft", handleUserLeft);

    return () => {
      socket.off("messageResponse", onNewMessage);
      socket.off("roomJoined", onUserJoinedRoom);
      socket.off("roomEntered", onSelfEntered);
      socket.off("userLeft", handleUserLeft);
    };
  }, [socket]);

  // Handlle entering the room.
  const handleRoomEntered = useCallback(() => {
    socket.emit("roomEntered", {
      name: socket.username,
      id: id,
    });
  }, [socket, id]);

  useEffect(() => {
    handleRoomEntered();
  }, [handleRoomEntered]);

  // Funciton used to send message.
  const sendMessage = (message) => {
    const now = new Date();
    const timeStamp = now.getTime();

    message.name = socket.username;
    message.id = id;
    message.socketID = socket.id;
    message.timestamp = timeStamp;

    socket.emit("message", message);
  };

  return <ChatContext.Provider value={{ sendMessage, systemMenuShowing, userMenuShowing, toggleSystemMenu, toggleUserMenu, users, messages, userName }}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
