// Socket.io native interfaces
export interface ServerToClientEvents {
    message: (chatMessage: ChatMessage) => void;
}

export interface ClientToServerEvents {
    join_chat_room: (id_conversation: number) => void;
    leave_chat_room: (id_conversation: number) => void;
    send_message: (chatMessage: ChatMessage) => void;
}


export interface InterServerEvents {
}

export interface SocketData {
}

// Interfaces personnalisé
export interface ChatMessage {
    conversationId: number;
    userId: number;
    message: string;
    sendDate: Date;
}