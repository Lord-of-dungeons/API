// Socket.io native interfaces
export interface ServerToClientEvents {
    message_sended: (chatMessage: ChatMessage) => void;
}

export interface ClientToServerEvents {
    join_chat_room: (id_conversation: number) => void;
    leave_chat_room: (id_conversation: number) => void;
    send_message: (chatMessage: ChatMessage) => void;
    connect_error: (error: any) => void;
}

export interface InterServerEvents {
}

export interface SocketData {
}

// Interfaces personnalisé
export interface ChatMessage {
    idConversation: number;

    _id: number;
    index: Date;
    content: string;
    senderId: number;
    date: string;
    timestamp: string;
    disableActions: boolean;
    disableReactions: boolean;
}