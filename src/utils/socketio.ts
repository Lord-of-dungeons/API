import { Server, Socket } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, ChatMessage } from "@interfaces/social/socketio.interface";
import http from "http";

export const socketIoServer = (httpServer: http.Server) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);
    io.on('connection', (socket) => {
        // console.log("Connected to the socket ")

        socket.on('join_chat_room', (id_conversation: number) => {
            socket.join("" + id_conversation);
            // console.log("connected to the conv " + id_conversation)
        });

        socket.on('leave_chat_room', (id_conversation: number) => {
            socket.leave("" + id_conversation);
            // console.log("disconnect to the conv " + id_conversation)
        });

        socket.on('send_message', (messageData: ChatMessage) => {
            // console.log("message received : ")
            // console.log(messageData)
            io.to("" + messageData.conversationId).emit('message', messageData);
        });

        socket.on('disconnect', () => {
            // console.log("socket disconnected")
        });
    });
}
    //#endregion

