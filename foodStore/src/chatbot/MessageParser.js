import React from "react";
const MessageParser = ({ children, actions}) => {
   
    const parse = (message) => {
      const lowerCaseMessage = message.toLowerCase();
      console.log("Message received:", lowerCaseMessage);


      if (lowerCaseMessage.includes("xin chào") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("chào")) {
        actions.handleHello();
      } else {
        if (lowerCaseMessage.includes("đặt") || lowerCaseMessage.includes("mua")) {
          actions.handleLogin();
        } else {
          actions.error();
        }
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