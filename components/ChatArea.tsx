"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";

const ChatArea = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);
      try {
        const response = await axios.post("/api/hello", { message: input });
        const botMessage = { text: response.data.reply, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage = { text: "Sorry, something went wrong.", sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg flex flex-col w-full max-w-md h-[650px]">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white py-3 px-4 rounded-t-lg flex items-center justify-between">
        <h2 className="text-lg font-semibold">RailAI Bot</h2>
        <span className="text-sm opacity-75">{loading ? "Typing..." : "Online"}</span>
      </div>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg text-sm bg-gray-200 text-black">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Chat Input */}
      <div className="border-t border-gray-300 p-3 flex items-center">
        <input
          type="text"
          className="flex-1 px-4 py-2 border text-black border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <IoMdSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
