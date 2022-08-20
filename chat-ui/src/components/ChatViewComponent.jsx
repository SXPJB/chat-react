import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import ChatMessage from "./ChatMessageComponent.jsx";
import {useChatContext} from "../context/ChatContext.jsx";

const ChatViewComponent = () => {
    const [message, setMessage] = useState('');
    const {chats,loadChats, sendMessage} = useChatContext()

    const submitMessage= e =>{
        e.preventDefault()
        sendMessage(message)
        setMessage('')
    }

    useEffect(()=>{
        loadChats()
    },[chats])

    return (
        <div>
            <h1>Chat Rom</h1>
            <Form className='my-2' onSubmit={submitMessage}>
                <Form.Control
                    type='text'
                    placeholder='Type message...'
                    onChange={ e => setMessage(e.target.value)}
                    value={message}
                />
            </Form>
            <ul>
                {
                    chats.map((m, i) => (
                        <ChatMessage key={i} message={m}/>
                    ))
                }
            </ul>
        </div>
    );
};

export default ChatViewComponent;