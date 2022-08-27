import {createContext, useContext, useState} from "react";
import {io} from "socket.io-client";
import moment from "moment";
import fa from "moment/locale/fa.js";

const socket = io('http://localhost:4000', )

const ChatContext = createContext()

export const useChatContext = () => {
    const chatContext = useContext(ChatContext)
    if (!chatContext) {
        throw new Error("chatContext must be used within a ChatContextProvider")
    }
    return chatContext
}

export const ChatProvider = ({children}) => {
    const [chats, setChats] = useState([])
    const [user, setUser] = useState({
        id:null,
        nickname:''
    })
    const [show, setShow] = useState(false);
    const hideModal = () => setShow(false)
    const showModal = () => setShow(true)

    const login = user => {
        socket.emit('login',user)
        socket.on('login', user=>{
            setUser(user)
            hideModal()
        })
        socket.on('userFound',response=>{
            alert(response)
        })
    }

    const logout = () => {
        socket.emit('logout', user)
        socket.on('logout',user =>{
            console.log("USer",user)
            setUser({
                id:null,
                nickname:''
            })
        })
    }

    const loadChats = () => {
        socket.on('message', message => {
            console.log(message)
            setChats([message, ...chats])
        })
    }

    const sendMessage = message => {
        const newMessage = {
            body: message,
            from: 'Me',
            time: moment().format("HH:mm a")
        }
        socket.emit('message', newMessage)
        setChats([newMessage, ...chats])
    }

    return <ChatContext.Provider value={{
        chats,
        user,
        show,
        loadChats,
        sendMessage,
        login,
        hideModal,
        showModal,
        logout,
    }}>
        {children}
    </ChatContext.Provider>
}