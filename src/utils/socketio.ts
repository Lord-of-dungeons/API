import { Server, Socket } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, ChatMessage } from "@interfaces/social/socketio.interface";
import http from "http";

// on transforme les id avec c en préfix pour différencier le chat des autres fonctionnalités utilisant socket.io
export const socketIoServer = (httpServer: http.Server) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
        cors: {
            origin: "*",
        },
    });

    io.on('connection', (socket) => {
        console.log('SOCKET.IO CONNECTED')
        socket.on('join_chat_room', (id_conversation: number) => {
            console.log("join_chat_room ", id_conversation)
            console.log('rooms : ', socket.rooms)
            socket.join("c" + id_conversation);
        });

        socket.on('leave_chat_room', (id_conversation: number) => {
            console.log("leave_chat_room ", id_conversation)
            socket.leave("c" + id_conversation);
        });

        socket.on('send_message', (messageData: ChatMessage) => {
            console.log('send_message', messageData)
            io.to("c" + messageData.idConversation).emit('message_sended', messageData);
        });

        socket.on('disconnect', () => {
            console.log('SOCKET.IO DISCONNECTED')
        });

        socket.on("connect_error", (err: any) => {
            console.log(`connect_error due to `, err.message);
        });
    });
}