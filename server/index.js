import express from 'express'
import {PORT} from "./config.js"
import cors from 'cors'
import morgan from 'morgan'
import {Server as SocketServer} from "socket.io";
import http from "http";

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})

const users = []

const onConnection = socket => {
    console.log("New user connected", socket.id)
    socket.on('login', user => {
        if(!users.find(u => u.nickname === user.nickname)){
            const tmpUser = {
                id: socket.id,
                ...user
            }
            users.push(tmpUser)
            socket.emit('login',tmpUser)
            console.log("User login ",tmpUser.nickname)
        } else {
            socket.emit('userFound', user.nickname + ' username is taken! Try some other username.')
        }
    })

    socket.on('logout',({id})=>{
        console.log('logout',id)
        const userRemoved = users.find(u=>u.id === id)
        if(userRemoved){
            users.slice(users.findIndex(u=>u.id===userRemoved.id),1)
            socket.emit('logout',userRemoved)
            console.log('User logout',userRemoved.nickname)
        }
    })

    socket.on('message', message => {
        socket.broadcast.emit('message', {
            ...message,
            from: users.find(user => user.id === socket.id).nickname
        })
    })
}

io.on("connection", onConnection)

app.use(cors())
app.use(morgan('dev'))

server.listen(PORT,
    () => console.log(`Server started on port ${PORT}`)
)