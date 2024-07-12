import React, { useState } from "react";
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './css/chatbot.css';
import config from "./chatbot/config";
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";


function Foodbot() {
    const [showBot, toggleBot] = useState(false);

    // const saveMessages = (messages, HTMLString) => {
    //     localStorage.setItem('chat_messages', JSON.stringify(messages));
    // };

    // const loadMessages = () => {
    //     const messages = JSON.parse(localStorage.getItem('chat_messages'));
    //     return messages;
    // };            
    return(
        <div className="chatbot">
            {showBot && (
                <div className="chatbot-container">
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                    // messageHistory={loadMessages()}
                    // saveMessages={saveMessages}
                />
                </div>
            )}
            <button className="chatbot-toggle-button" onClick={() => toggleBot((prev) => !prev)}>
                {showBot ? '✖' : '💬'}
            </button>
        </div>
    );
};

export default Foodbot;