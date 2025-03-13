import React from "react";
import { useState } from "react";
import { LuBot, LuSendHorizontal } from "react-icons/lu";
import useChatbot from "../../hook/useChatbot";

type ChatProps = {};

const ChatComponent: React.FunctionComponent<ChatProps> = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChatbot();

  const handleSend = () => {
    console.log("input, input", input);
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-white">
      <h2 className="p-4 font-semibold text-lg text-center bg-blue-100 flex text-blue-800 justify-center item-center gap-2">
        OpenAI Chatbot <LuBot size={25} />
      </h2>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index: number) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${message.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-gray-800"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 bg-gray-50">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          placeholder="Your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend} className="cursor-pointer">
          <LuSendHorizontal size={30} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
