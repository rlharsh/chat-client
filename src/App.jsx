import { useState } from "react";
import socketIO, { Socket } from "socket.io-client";

// Initialize our socket.
const socket = socketIO.connect("https://annon-chat-bf04f092ecf9.herokuapp.com");

// Import default stylesheet.
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Chat from "./Pages/Chat/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home socket={socket} />} />
        <Route path="/chat/:id" element={<Chat socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
