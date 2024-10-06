import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

const backendUrl = "http://localhost:5000";

// Define the shape of the message object
interface Message {
    text: string;
    audio: string; // base64-encoded audio
    lipsync: Record<string, any>; // lipsync JSON structure (can refine this type based on actual structure)
    facialExpression: string;
    animation: string;
}

// Define the shape of the context
interface ChatContextType {
    chat: (message: string) => Promise<void>;
    message: Message | null;
    onMessagePlayed: () => void;
    loading: boolean;
    cameraZoomed: boolean;
    setCameraZoomed: (value: boolean) => void;
}

// Create context with the correct type
const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState(false);
    const [cameraZoomed, setCameraZoomed] = useState(true);

    const chat = async (userMessage: string) => {
        setLoading(true);
        const data = await fetch(`${backendUrl}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage }),
        });
        const resp: Message[] = (await data.json()).messages;
        setMessages((prevMessages) => [...prevMessages, ...resp]);
        setLoading(false);
    };

    const onMessagePlayed = () => {
        setMessages((prevMessages) => prevMessages.slice(1));
    };

    useEffect(() => {
        if (messages.length > 0) {
            setMessage(messages[0]);
        } else {
            setMessage(null);
        }
    }, [messages]);

    return (
        <ChatContext.Provider
            value={{
                chat,
                message,
                onMessagePlayed,
                loading,
                cameraZoomed,
                setCameraZoomed,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
