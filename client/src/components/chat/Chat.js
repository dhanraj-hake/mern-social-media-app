import React, { useState, useEffect, useRef } from 'react'
import "./Chat.css";

import LogoSearch from '../logosearch/LogoSearch';
import TrendNavBar from "../trendnavbar/TrendNavBar";
import { useSelector } from 'react-redux';
import Conversation from '../conversation/Conversation';
import ChatBox from '../chatbox/ChatBox';

import { io } from "socket.io-client";
import { useFetcher } from 'react-router-dom';

const Chat = () => {
    const { user } = useSelector((state)=>state.authReducer.authData);

    const [chats, setChats] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);

    const socket = useRef();

    const [onlineUsers, setOnlineUsers] = useState([]);

    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);


    
    useEffect(()=>{
        socket.current = io("http://localhost:5000");

        socket.current.emit("add-new-user", user._id);
        socket.current.on("get-users", (users)=>{
            setOnlineUsers(users);
            console.log(users);
        });

    }, [user]);

    useEffect(()=>{
        const fetchChats = async ()=>{
            const response = await fetch(process.env.REACT_APP_SERVER_PORT+"/chat/"+user._id);
            const result = await response.json();
            setChats(result);
        }

        fetchChats();

    }, [user]);

    useEffect(()=>{

        if(sendMessage!=null){
            socket.current.emit("send-message", sendMessage);
        }

    }, [sendMessage]);

    useEffect(()=>{

        socket.current.on("recieve-message", (message)=>{
            setReceivedMessage(message);
        });

    }, []); 


    const onlineStatus = (chat)=>{

        const memberId = chat.members.find((userId)=>userId!==user._id);
        const isOnLine = onlineUsers.find((user)=>user.userId===memberId);
        console.log(isOnLine)
        return isOnLine ? true : false;
    }


  return (
    <div className='Chat'>
      
    <div className="Left-side-chat">
            <LogoSearch />
        <div className="Chat-container">
        <h2 style={{textAlign : "center"}}>Chats</h2>
            <div className="Chat-list">
                {chats.map((chat, index)=>{
                    return (
                        <div className='' key={index} onClick={()=>setCurrentChat(chat)} >
                            <Conversation chat={chat} curentUserId={user._id} onlineStatus={onlineStatus(chat)} />
                        </div>
                    );
                })}
            </div>
        </div>
    </div>

    <div className="Right-side-chat">
        <div style={{width : "21rem"}} className="nav">
       <TrendNavBar />
        </div>
        
        <ChatBox chat={currentChat} curentUserId={user._id} setSendMessage={setSendMessage} receivedMessage={receivedMessage} />

    </div>

    </div>
  )
}

export default Chat;
