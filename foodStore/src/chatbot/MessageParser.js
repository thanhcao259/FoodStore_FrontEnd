// src/MessageParser.js
import React from "react";
const MessageParser = ({ children, actions}) => {
    
    const parse = (message) => {
      const lowerCaseMessage = message.toLowerCase();
      console.log("Message received:", lowerCaseMessage);

      if (lowerCaseMessage.includes("xin chào") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hello")) {
        actions.handleHello();
      }

      if (lowerCaseMessage.includes("đặt hàng")) {
        actions.handleLogin();
      }
      if(lowerCaseMessage.includes("đặt combo", "combo")){
        actions.handleComboList();
      }
    }

    return (
        <div>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              parse: parse,
              actions,
            });
          })}
        </div>
      );
};
  
export default MessageParser;
  