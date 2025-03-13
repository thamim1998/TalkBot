import { useState } from "react";
import axios from "axios";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const useChatbot = () => {
          const [messages, setMessages] = useState<Message[]>([]);
        
          const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
          
          const sendMessage = async (message: string) => {
            // Add user message immediately
            setMessages(prev => [...prev, { text: message, sender: "user" }]);
        
            await delay(1000); // Simulated delay
        
            try {
              // Use functional update to get latest messages
              setMessages(prev => [...prev, { text: "...", sender: "bot" }]);
        
              // Properly format API messages with history
              const apiMessages = messages.map(({ text, sender }) => ({
                role: sender === "user" ? "user" : "assistant",
                content: text
              }));
        
              const response = await axios.post(
                "https://api.deepseek.com/v1/chat/completions", // Correct endpoint
                {
                  model: "deepseek-chat",
                  messages: [
                    ...apiMessages,
                    { role: "user", content: message } // Include new message
                  ],
                },
                {
                  headers: {
                    Authorization: `Bearer sk-3ce044c4d6ac415a99863a9c27aed3c9`, // Use env var
                    "Content-Type": "application/json",
                  },
                }
              );
        
              // Remove typing indicator and add actual response
              setMessages(prev => [
                ...prev.slice(0, -1),
                { text: response.data.choices[0].message.content, sender: "bot" }
              ]);
            } catch (error) {
              console.error("Error fetching AI response:", error);
              // Remove typing indicator and show error
              setMessages(prev => [
                ...prev.slice(0, -1),
                { text: "Sorry, I'm having trouble responding.", sender: "bot" }
              ]);
            }
          };
        
          return { messages, sendMessage };
        };

export default useChatbot;