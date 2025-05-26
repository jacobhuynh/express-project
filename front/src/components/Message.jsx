import React from "react";
import { useState } from "react";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import "../styles/MessageForm.css"
import { TextField } from "@mui/material";

function Message({ name, message, deleteFunction, editFunction }) {
    const [edit, setEdit] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedMessage, setEditedMessage] = useState(message);

    return (
        <>
                {edit ? (
                    <div className="messageBox">
                        <form className="editForm" onSubmit={(e) => {
                            e.preventDefault();
                            editFunction(editedName, editedMessage);
                            setEdit(false);
                        }}>
                            <div className="input">
                                <div className="inputText">Name</div>
                                <input 
                                    className="inputField"
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
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
                                    value={editedMessage}
                                    onChange={(e) => setEditedMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">
                                Save
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="messageBox">
                        <div>
                            <div className="messageName">{name}</div>
                            <div className="messageMessage">{message}</div>
                        </div>
                        <div className="row">
                            <button className="messageButton" onClick={() => setEdit(true)}><CreateOutlinedIcon/></button>
                            <button className="messageButton" onClick={deleteFunction}><DeleteOutlineOutlinedIcon/></button>
                        </div>
                    </div>
                )}
        </>
    )
}

export default Message