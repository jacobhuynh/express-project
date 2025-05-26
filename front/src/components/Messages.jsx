import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import Message from "./Message"
import "../styles/MessageForm.css"

function Messages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
    }, [])

    const getMessages = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:3001/messages/")
            setMessages(response.data)
            console.log("Get Successful: ", response.data);
        } catch (e) {
            console.error("Failed to get: ", e.response?.data || e.message);
        }
    }

    const deleteMessage = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3001/messages/delete/${id}`)
            getMessages();
            console.log("Delete Successful: ", response.data);
        } catch (e) {
            console.error("Failed to delete: ", e.response?.data || e.message);
        }
    }

    const editMessage = async (id, name, message) => {
        const data = {
            name: name,
            message: message
        };
        try {
            const response = axios.put(`http://127.0.0.1:3001/messages/update/${id}`, data)
            console.log("Update Successful: ", response.data);
            getMessages();
        } catch (e) {
            console.error("Failed to update: ", e.response?.data || e.message);
        }
    }


    return (
        <>
            <div className="center">
                <div className="card">
                    <div className="cardHeader">
                        <div className="cardHeaderText"> Messages </div>
                    </div>
                    <div className="cardBody">
                        {messages ? (
                            messages.map((msg) => (
                                <Message 
                                    key={msg.messageId} 
                                    name={msg.messageData.name} 
                                    message={msg.messageData.message} 
                                    deleteFunction={() => deleteMessage(msg.messageId)} 
                                    editFunction={(newName, newMessage) => editMessage(msg.messageId, newName, newMessage)}
                                />
                            ))
                        ) : (
                            <p> no messages found </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages