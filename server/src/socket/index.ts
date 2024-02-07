import {Server, Socket} from "socket.io";
import {configureTableSocket} from "./table";

export const configureSocketIo = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        configureTableSocket(io, socket)
    })
}
