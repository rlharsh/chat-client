import React, { useState, useEffect } from "react";

// Import the Home.css stylesheet.
import "./home.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Home = ({ socket }) => {
  // Declare variables & states for Chat component.
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [chatTermsShowing, setChatTermsShowing] = useState(false);
  const [error, setError] = useState(null);

  // Declare navigate, so that we can redirect browser.
  const navigate = useNavigate();

  /* Function called whenever the user agrees to
   * the terms & conditions. When the user agrees
   * we will send the user information over to the
   * server and create a room, then join that room. */
  const userAgreesToTerms = () => {
    setChatTermsShowing(false);

    if (roomID) {
      console.log(roomID);
      socket.emit("joinRoom", { name: username, id: roomID });
    } else {
      try {
        const roomID = uuidv4(); // Generate a UUID for the chatroom.
        socket.emit("createRoom", { name: username, roomId: roomID }); // Create a room on the server.
        socket.emit("joinRoom", { name: username, id: roomID }); // Send the join room signal to the server.
      } catch (err) {
        setError(err);
        console.error("Error creating/joining room:", err);
      }
    }
  };

  /* Function called once a room joined event is
   * received from the host, we then redirect the
   * user to their created room. */
  useEffect(() => {
    /* If roomJoined is received from the server, then we will
     * navigate the user to the room that has been received
     *from data.id (which contains the room id). */
    socket.on("roomJoined", (data) => {
      try {
        navigate(`/chat/${data.id}`);
      } catch (err) {
        setError(err);
        console.error("Error navigating to room:", err);
      }
    });
  }, [socket]);

  /* Function called to update username */
  const updateUser = (val) => {
    socket.username = val;
    setUsername(val);
  };

  /* Function called to update the room id. */
  const udpateRoomId = (val) => {
    setRoomID(val);
  };

  /* Function used to handle the form submission */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username) {
      setChatTermsShowing(true);
    }
  };

  /* Function called whenever the user does not agree
   * or closes the terms & conditions modal. */
  const closeTerms = () => {
    setChatTermsShowing(false);
  };

  return (
    <main className="full-container vertical gap-2 padding-1">
      {chatTermsShowing && (
        <div className="full-container vertical gap-2 modal">
          <h2 className="center-text">Anonymous Chat Room Application - Terms of Service</h2>
          <p className="fine-print">
            <span className="bold">1. Content Responsibility A. User-Generated Content:</span> Anonymous Chat is not responsible for any content posted, shared, or transmitted by users in the chat rooms. This includes text, links, images, and any other types of content. Users are solely responsible for the material they post. B. Imagery: We are not
            responsible for any imagery depicted or shared within the chat rooms. Users must exercise their discretion and are responsible for any imagery they view or share.
            <br />
            <br />
            <span className="bold">2. Views and Opinions C. Personal Views:</span> The views and opinions expressed in the chat rooms are those of the individual users and do not necessarily reflect the official policy or position of Anonymous Chat. We take no responsibility for personal views or opinions shared within the chat rooms. <br />
            <br />
            <span className="bold">3. Age Requirement D. Age Verification:</span> By using this service, users affirm that they are over 18 years of age, or of the legal age of consent in their jurisdiction. We are not responsible for verifying the age of our users. <br />
            <br />
            <span className="bold">4. Acceptance of Terms E. Agreement to Terms:</span> By clicking "I Agree", users acknowledge that they have read, understood, and agreed to these Terms and Conditions. This agreement is a legal binding between the user and Anonymous Chat. <br />
            <br />
            <span className="bold">5. Changes to Terms We reserve the right to modify these Terms at any time. Users are encouraged to periodically review these Terms to stay informed of our updates. Contact Us For any questions or concerns about these Terms, please contact us through: ronald.harsh@protonmail.com.</span>
          </p>
          <button onClick={userAgreesToTerms}>I Agree</button>
        </div>
      )}
      <section className="flex vertical center gap-1 width-full padding-1 center-text">
        <h1>Masquerade</h1>
        <p className="dark">Please Enter Details to Chat</p>
      </section>
      <section className="flex vertical center gap-1 width-full">
        <form action="" className="flex vertical gap-1 width-full" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="user" id="user" placeholder="Enter Your Nickname" onChange={(e) => updateUser(e.target.value)} />
          <input type="text" name="id" id="id" placeholder="Enter Your Rooom Code" onChange={(e) => udpateRoomId(e.target.value)} />
          <div className="fixed-2"></div>
          <button>Start Chatting</button>
        </form>
      </section>
      {error && (
        <div className="error-modal">
          <p>An error has occured: ${error}</p>
        </div>
      )}
    </main>
  );
};

export default Home;
