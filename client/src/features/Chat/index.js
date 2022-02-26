import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatMain from "./components/ChatMain";
import SidebarLeft from "./components/SidebarLeft";
import io from "socket.io-client";

function Chat() {
    // const socket = io.connect(process.env.REACT_APP_API_URL);
    const socket = io.connect("http://localhost:3001");
    return (
        <div className="w-full pb-8 max-h-[79.4rem] ">
            <div className="w-full flex h-full rounded-lg overflow-hidden">
                <SidebarLeft socket={socket} />
                <ChatMain socket={socket} />
            </div>
        </div>
    );
}

export default Chat;
