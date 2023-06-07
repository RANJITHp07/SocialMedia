import React from 'react'
import {format} from "timeago.js"

function Message({ message,own }) {
  const containerClass = own ? "d-flex justify-content-end" : "d-flex justify-content-start";

  return (
    <div className={`message-container ${containerClass}`}>
      <div className="message-content">
        <div>
          <img
            className="chatimg mr-3 ml-3"
            src="https://static.toiimg.com/photo/80482429.cms"
          />
        </div>
        <div>
          <p>{message.text}</p>
          <p>{format(message.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;

