import { Server, Socket } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, ChatMessage } from "@interfaces/social/socketio.interface";
import http from "http";

/**
 * 
 * 
 *  TODO : SEPARER LES DIFFERENTS TYPES D'ID POUR EVITER LES CONFLITS (entre le chat et le deplacement des perso en multi par exemple)
 * 
 * 
**/

export const socketIoServer = (httpServer: http.Server) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);
    io.on('connection', (socket) => {

        socket.on('join_chat_room', (id_conversation: number) => {
            socket.join("" + id_conversation);
        });

        socket.on('leave_chat_room', (id_conversation: number) => {
            socket.leave("" + id_conversation);
        });

        socket.on('send_message', (messageData: ChatMessage) => {
            io.to("" + messageData.conversationId).emit('message', messageData);
        });

        socket.on('disconnect', () => {

        });
    });
}