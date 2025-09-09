import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../socket";
import { addMessage } from "../../../features/Chat/ChatSlice";
import { RootState, AppDispatch } from "../../../redux/store";
import GoBack from "../../../assets/left-arrow.svg";
import GenericAvatar from "../../../assets/generic-avatar.svg";

interface SellerChatBoxProps {
  buyerId: number;
  sellerId: number;
  onClose?: () => void;
  isOpen?: boolean;
  buyerInfo?: {
    name: string;
    avatar?: string | null;
  } | null;
}

const SellerChatBox: React.FC<SellerChatBoxProps> = ({
  buyerId,
  sellerId,
  onClose,
  isOpen,
  buyerInfo = null,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, conversationId } = useSelector(
    (state: RootState) => state.chat
  );
  const { user } = useSelector((state: RootState) => state.profile);
  const [newMessage, setNewMessage] = useState("");
  const roomId = `conversation_${[buyerId, sellerId]
    .sort((a, b) => a - b)
    .join("_")}`;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      console.log(conversationId);
      socket.emit("sendMessage", {
        roomId,
        content: newMessage,
        senderStoreId: sellerId,
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
      data-seller-chatbox="true"
      className={`fixed bg-gray-900 shadow-xl border-gray-700 z-50 flex flex-col ${
        !isOpen ? "hidden" : ""
      }
                  top-16 left-0 right-0 bottom-0 border-t
                  md:top-20 md:right-80 md:left-auto md:bottom-8 md:w-80 md:border-l md:border-t-0`}
    >
      {/* Header */}
      <div className="flex-shrink-0 p-3 md:p-4 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Mobile back button */}
            <button
              onClick={onClose}
              className="md:hidden text-purple-400 hover:text-purple-300 p-1 transition-colors"
            >
              <img
                src={GoBack}
                alt="Back"
                className="w-5 h-5 filter brightness-0 invert"
              />
            </button>
            {/* Buyer info */}
            {buyerInfo ? (
              <div className="flex items-center space-x-3">
                <img
                  src={buyerInfo.avatar || GenericAvatar}
                  alt="Buyer avatar"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                />
                <h3 className="text-base md:text-lg font-semibold text-white">
                  {buyerInfo.name}
                </h3>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <img
                  src={GenericAvatar}
                  alt="Buyer avatar"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                />
                <h3 className="text-base md:text-lg font-semibold text-white">
                  Buyer
                </h3>
              </div>
            )}
          </div>
          {/* Desktop close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="hidden md:block text-gray-400 hover:text-white p-1 transition-colors"
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
      <div className="flex-1 p-4 overflow-y-auto seller-chatbox-scrollbar bg-gray-900">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 ${
              msg.sender_store_id ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-xs ${
                msg.sender_store_id
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <div className="mb-4">
              <svg
                className="w-12 h-12 mx-auto text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-sm">No messages yet</p>
            <p className="text-xs text-gray-600 mt-1">
              Start the conversation!
            </p>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-700 bg-gray-800"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
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

export default SellerChatBox;
