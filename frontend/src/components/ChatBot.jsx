import { useState, useRef, useEffect } from "react";
import Button from "./Button";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi there! I'm Wiron's virtual assistant. How can I help you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatRef = useRef(null);
  const buttonRef = useRef(null);

  // Auto-scroll to the most recent message
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        chatRef.current &&
        buttonRef.current &&
        !chatRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage = {
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking with a delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateResponse(inputValue);
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1500);
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let responseText = "";

    // Simple response logic
    if (
      input.includes("hello") ||
      input.includes("hi") ||
      input.includes("hey")
    ) {
      responseText = "Hello there! How can I assist you today?";
    } else if (input.includes("help")) {
      responseText =
        "I can help with information about Wiron's services, projects, or you can schedule a meeting.";
    } else if (input.includes("project") || input.includes("portfolio")) {
      responseText =
        "Wiron has worked on various web and mobile projects. You can check the Projects section for more details.";
    } else if (
      input.includes("contact") ||
      input.includes("email") ||
      input.includes("phone")
    ) {
      responseText =
        "You can reach Wiron at hello@wiron.com or call +250 780 961 542.";
    } else if (input.includes("service")) {
      responseText =
        "Wiron offers web development, mobile app development, UI/UX design, and more. What specific service are you interested in?";
    } else if (
      input.includes("price") ||
      input.includes("cost") ||
      input.includes("quote")
    ) {
      responseText =
        "Pricing depends on project requirements. Would you like to schedule a consultation to discuss your project?";
    } else if (input.includes("thank")) {
      responseText =
        "You're welcome! Is there anything else I can help you with?";
    } else if (input.includes("bye") || input.includes("goodbye")) {
      responseText =
        "Goodbye! Feel free to reach out if you have more questions.";
    } else {
      responseText =
        "I'm not sure I understand. Could you rephrase that or ask about services, projects, or contact information?";
    }

    return {
      text: responseText,
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // Quick response suggestions
  const quickResponses = ["Services", "Portfolio", "Contact", "Pricing"];

  const handleQuickResponse = (response) => {
    const userMessage = {
      text: response,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking with a delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateResponse(response);
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1500);
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 ${
          isOpen ? "left-[370px]" : "left-6"
        } w-14 h-14 bg-[#2b7fff] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#052d43]/30 hover:shadow-[#052d43]/50 transition-all duration-300 z-40 ${
          isOpen ? "scale-90" : "scale-100 hover:scale-105"
        } backdrop-blur-sm`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
        {!isOpen && messages.filter((m) => m.sender === "bot").length > 1 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse border border-white">
            !
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div
        ref={chatRef}
        className={`fixed bottom-6 left-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-40 transition-all duration-500 transform ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        } border border-[#052d43]/20`}
        style={{
          boxShadow: isOpen ? "0 25px 50px -12px rgba(5, 45, 67, 0.25)" : "",
        }}
      >
        {/* Glass morphism effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#052d43]/5 to-[#052d43]/10 opacity-50 pointer-events-none"></div>

        {/* Chat Header */}
        <div className="relative bg-[#052d43] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium">Wiron's Assistant</h3>
                <p className="text-blue-100 text-xs">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  Online | Usually replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-indigo-400 rounded-full opacity-20 blur-lg"></div>
        </div>

        {/* Messages Container */}
        <div className="h-[350px] overflow-y-auto p-4 bg-white relative">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } animate-fadeIn`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 1,
                }}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 mr-2 flex-shrink-0 flex items-center justify-center border border-blue-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl py-3 px-4 ${
                    message.sender === "user"
                      ? "bg-[#052d43] text-white rounded-tr-none shadow-sm"
                      : "bg-gray-100 text-black rounded-tl-none shadow-sm border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-1 opacity-70 text-right ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-[#052d43] ml-2 flex-shrink-0 flex items-center justify-center text-white text-sm shadow-sm">
                    <span className="uppercase">
                      {message.sender.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-blue-100 mr-2 flex-shrink-0 flex items-center justify-center border border-blue-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="bg-gray-100 text-black rounded-tl-none shadow-sm border border-gray-200 rounded-2xl py-3 px-4">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Responses */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex space-x-2">
            {quickResponses.map((response, index) => (
              <Button
                key={index}
                onClick={() => handleQuickResponse(response)}
                size="sm"
                variant="ghost"
                className="whitespace-nowrap"
              >
                {response}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className="border-t border-gray-200 p-3 bg-white relative"
        >
          <div className="relative">
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="w-full py-3 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-[#052d43] focus:ring-2 focus:ring-[#052d43]/20 text-black shadow-sm"
            />
            <button
              type="submit"
              disabled={inputValue.trim() === ""}
              className={`absolute right-1.5 top-1.5 p-2 rounded-full transition-colors ${
                inputValue.trim() === ""
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#052d43] text-white hover:bg-[#052d43]/90"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center text-xs mt-2 text-gray-500">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1 text-[#206fff]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Powered by Wiron AI</span>
            </div>
            <span className="text-[#206fff] cursor-pointer hover:underline">
              Contact support
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

// Add this CSS to your global styles
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

export default ChatBot;
