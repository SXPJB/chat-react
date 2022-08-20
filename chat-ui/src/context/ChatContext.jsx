import {createContext, useContext, useState} from "react";
import {io} from "socket.io-client";

const socket = io('http://localhost:4000')

const ChatContext = createContext()

export const useChatContext = () => {
    const chatContext = useContext(ChatContext)
    if (!chatContext) {
        throw new Error("chatContext must be used within a ChatContextProvider")
    }
    return chatContext
}


const toHHMM = (date) => {
    let hh = date.getHours();
    let mm = date.getMinutes();
    const ampm = hh >= 12 ? 'pm' : 'am';
    hh = hh % 12;
    hh = hh ? hh : 12;
    mm = mm < 10 ? '0' + mm : mm;
    return hh + ':' + mm + ' ' + ampm;
}

export const ChatProvider = ({children}) => {
    const [chats,setChats] = useState([])

    const loadChats = ()=>{
        socket.on('message', message=>{
            console.log(message)
            setChats([message, ...chats])
        })
    }

    const sendMessage = message =>{
        const newMessage = {
            body: message,
            from: 'Me',
            time: toHHMM(new Date())
        }
        socket.emit('message',newMessage)
        setChats([newMessage,...chats])
    }

    return <ChatContext.Provider value={{
        chats,
        user: {
            id: '123123123',
            nickname: 'Emmanuel'
        },
        loadChats,
        sendMessage
    }}>
        {children}
    </ChatContext.Provider>
}