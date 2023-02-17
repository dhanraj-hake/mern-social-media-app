import React, { useState, useEffect, useRef } from 'react'
import { format } from 'timeago.js';
import "./ChatBox.css"
import InputEmoji from "react-input-emoji";

const ChatBox = (props) => {

    const { chat, curentUserId, setSendMessage, receivedMessage } = props;
    const [user, setUser] = useState(null);

    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState("");

    const scroll = useRef();

    // // For Header
    useEffect(() => {


        const fetchUser = async () => {
            try {
                const user_id = chat.members.find((id) => id !== curentUserId);
                const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/user/${user_id}`);
                const result = await response.json();
                setUser(result);
                console.log(result);
            }
            catch (error) {
                console.log(error);
            }
        }
        if (chat) {
            fetchUser();
        }
    }, [chat, curentUserId]);

    // // For Message

    useEffect(() => {

        const fetchMessages = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/message/${chat._id}`);
                const result = await response.json();
                setMessages(result);
            }
            catch (error) {
                console.log(error);
            }
        }

        if (user) {
            fetchMessages();
        }

    }, [user, curentUserId]);

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }


    const handalSend = async () => {

        if (newMessage !== "") {

            const message = {
                chatId: chat._id,
                senderId: curentUserId,
                message: newMessage
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/message`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(message)
                });

                const result = await response.json();
                const userId = chat.members.find(id => id !== curentUserId);
                setSendMessage({...message, userId:userId })
                setMessages([...messages, result]);
            }
            catch (error) {
                console.log(error);
            }

        }
    }

    useEffect(()=>{
        if(receivedMessage!=null){
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage]);

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior : 'smooth'});
    }, [messages]);

    return (

        <div className='ChatBox-container'>
            {chat && <>
                <div className="chat-header" >
                    <div className="follower" >
                        <div>
                            <img src={user?.profilePicture ? process.env.REACT_APP_SERVER_PORT + "/images/" + user?.profilePicture : process.env.REACT_APP_SERVER_PORT + "/images/defaultprofile.png"} alt="" className="followerImage"
                                style={{ width: "50px", height: "50px" }} className="profile-circle" />

                            <div className="name" >
                                <span>
                                    {user?.firstname} {user?.lastname}
                                </span>
                            </div>

                        </div>
                    </div>
                   

                </div>
                <div  className="chat-body" style={{margin: "1.5rem 0 0 0", border: "none"}}>
                    {messages.map((message, index) => {
                        return (
                            <div ref={scroll} key={index} className={message.senderId === curentUserId ? "message  own" : "message"}>
                                <span>{message.message}</span>
                                <span>{format(message.createdAt)}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="chat-sender">
                    <div>+</div>
                    <InputEmoji
                        value={newMessage}
                        onChange={handleChange}
                        placeholder="Type a message"
                    />
                    <button onClick={handalSend} className="btn">Send</button>
                </div>
            </>

            }
        </div>
    )
}

export default ChatBox
