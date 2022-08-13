import express from 'express'
import {PORT} from "./config.js"
import cors from 'cors'
import morgan from 'morgan'
import {Server as SocketServer} from "socket.io";
import http from "http";

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors:{
        origin: '*'
    }
})

const onConnection = socket => {
    console.log("New user connected",socket.id)
}

io.on("connection", onConnection)


app.use(cors())
app.use(morgan('dev'))

server.listen(PORT,
    ()=> console.log(`Server started on port ${PORT}` )
)