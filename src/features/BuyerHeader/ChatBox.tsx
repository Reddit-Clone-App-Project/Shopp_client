import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { addMessage } from "../Chat/ChatSlice";
import { RootState, AppDispatch } from "../../redux/store";
import GoBack from "../../assets/left-arrow.svg";
import GenericAvatar from "../../assets/generic-avatar.svg";

interface ChatBoxProps {
  buyerId: number;
  sellerId: number;
  onClose?: () => void;
  isOpen?: boolean;
  storeInfo?: {
    name: string;
    avatar?: string;
  } | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  buyerId,
  sellerId,
  onClose,
  isOpen,
  storeInfo,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, conversationId, conversations } = useSelector(
    (state: RootState) => state.chat
  );
  const { user } = useSelector((state: RootState) => state.profile);
  const [newMessage, setNewMessage] = useState("");
  const roomId = `conversation_${[buyerId, sellerId]
    .sort((a, b) => a - b)
    .join("_")}`;

  // Find the current conversation to get store/user info
  const currentConversation = conversations.find(
    (conv) => conv.other_user.id === sellerId
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      console.log(conversationId);
      socket.emit("sendMessage", {
        roomId,
        content: newMessage,
        senderBuyerId: user.id,
        conversationId,
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    // 1. Define the event listener function
    const handleReceiveMessage = (message: any) => {
      dispatch(addMessage(message));
    };

    // 2. Register the listener
    socket.on("receiveMessage", handleReceiveMessage);

    // 3. Connect and join the room
    socket.connect();
    socket.emit("joinRoom", { buyerId, sellerId });

    // 4. Define the cleanup function
    return () => {
      // This runs when the component unmounts OR when buyerId/sellerId changes
      socket.off("receiveMessage", handleReceiveMessage);
      socket.disconnect();
      // Don't clear messages here - Redux handles message clearing when fetching new conversations
    };
  }, [dispatch, buyerId, sellerId]);

  return (
    <div
      data-buyer-chatbox="true"
      className={`fixed bg-white shadow-xl border-gray-200 z-50 flex flex-col ${
        !isOpen ? "hidden" : ""
      }
                  top-16 left-0 right-0 bottom-0 border-t
                  md:top-20 md:right-80 md:left-auto md:bottom-8 md:w-80 md:border-l md:border-t-0`}
    >
      {/* Header */}
      <div className="flex-shrink-0 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Mobile back button */}
            <button
              onClick={onClose}
              className="md:hidden text-blue-600 hover:text-blue-800 p-1"
            >
              <img src={GoBack} alt="Back" className="w-5 h-5" />
            </button>

            {/* Store/User Info */}
            {currentConversation ? (
              <div className="flex items-center space-x-3">
                <img
                  src={currentConversation.other_user.avatar || GenericAvatar}
                  alt={currentConversation.other_user.name}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                />
                <h3 className="text-sm md:text-base font-semibold text-gray-800">
                  {currentConversation.other_user.name}
                </h3>
              </div>
            ) : storeInfo ? (
              <div className="flex items-center space-x-3">
                <img
                  src={storeInfo.avatar || GenericAvatar}
                  alt={storeInfo.name}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                />
                <h3 className="text-sm md:text-base font-semibold text-gray-800">
                  {storeInfo.name}
                </h3>
              </div>
            ) : (
              <h3 className="text-base md:text-lg font-semibold text-gray-800">
                Chat
              </h3>
            )}
          </div>

          {/* Desktop close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto chatbox-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender_buyer_id ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.sender_buyer_id ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
