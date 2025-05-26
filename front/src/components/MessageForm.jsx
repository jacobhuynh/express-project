import React from "react";
import { useState } from "react";

import axios from "axios";

import "../styles/MessageForm.css"

function MessageForm() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const submitMessage = async (e) => {
        e.preventDefault();

        const data = {
            name: name,
            message: message
        };
        try {
            const response = axios.post("http://127.0.0.1:3001/messages/new", data)
            console.log("Success: ", response.data);

            setName("");
            setMessage("");
            window.location.reload();

        } catch (e) {
            console.error("Failed to send: ", e.response?.data || e.message);
        }   
    }

    return (
        <>
            <div className="center">
                <div className="card">
                    <div className="cardHeader">
                        <div className="cardHeaderText"> Post a Message </div>
                        <div className="cardHeaderSubtext"> Enter your name and message to share with others </div>
                    </div>
                    <form className="messageForm" onSubmit={submitMessage}>
                        <div className="input">
                            <div className="inputText">Your Name</div>
                            <input 
                                className="inputField"
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input">
                            <div className="inputText">Message</div>
                            <textarea 
                                className="textAreaField"
                                id="message"
                                type="text"
                                placeholder="Enter a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">
                            Post Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MessageForm