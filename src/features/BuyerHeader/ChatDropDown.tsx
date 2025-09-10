import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchConversations, fetchConversationDetail } from "../Chat/ChatSlice";
import { AppDispatch, RootState } from "../../redux/store";
import GenericAvatar from "../../assets/generic-avatar.svg";

interface ChatDropDownProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentChat: (chat: { buyerId: number; sellerId: number }) => void;
  setIsChatBoxOpen: (isOpen: boolean) => void;
}

const ChatDropDown: React.FC<ChatDropDownProps> = ({
  isOpen,
  onClose,
  setCurrentChat,
  setIsChatBoxOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [nameFilter, setNameFilter] = useState("");

  const { conversations, status, error } = useSelector(
    (state: RootState) => state.chat
  );
  const { user } = useSelector((state: RootState) => state.profile);

  const handleConversationClick = async (sellerId: number) => {
    await dispatch(
      fetchConversationDetail({ buyerIdFromSeller: undefined, sellerId })
    );
    const buyerId = user?.id ?? 0;
    const validSellerId = sellerId ?? 0;
    setCurrentChat({ buyerId, sellerId: validSellerId });
    setIsChatBoxOpen(true);
  };

  useEffect(() => {
    if (isOpen && user) {
      dispatch(fetchConversations());
    }
  }, [dispatch, isOpen, user]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Element;

      // Check if the click is inside the dropdown
      if (
        dropdownRef.current &&
        target &&
        dropdownRef.current.contains(target)
      ) {
        return; // Don't close if clicking inside dropdown
      }

      // Check if the click is inside a chat box (exclude chat box from closing dropdown)
      const chatBoxElement = target.closest("[data-buyer-chatbox]");
      if (chatBoxElement) {
        return; // Don't close if clicking inside chat box
      }

      // Close dropdown if clicking outside both dropdown and chat box
      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const formatMessageTime = (timestamp: string | null) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const getLatestConversations = () => {
    return [...conversations]
      .filter((conversation) => {
        if (!nameFilter) return true;
        return conversation.other_user.name
          .toLowerCase()
          .includes(nameFilter.toLowerCase());
      })
      .sort((a, b) => {
        const timeA = a.last_message_timestamp
          ? new Date(a.last_message_timestamp).getTime()
          : 0;
        const timeB = b.last_message_timestamp
          ? new Date(b.last_message_timestamp).getTime()
          : 0;
        return timeB - timeA;
      })
      .slice(0, 8); // Show latest 8 conversations
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Invisible backdrop to capture outside clicks */}
      <div className="fixed inset-0 z-5" onClick={onClose} />
      <div
        ref={dropdownRef}
        className="fixed top-16 right-0 bottom-0 bg-white shadow-xl border-l border-gray-200 z-50 flex flex-col
                   w-full md:w-80 md:top-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with search */}
        <div className="flex-shrink-0 p-3 md:p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-base md:text-lg font-semibold text-gray-800">
                {user ? "Messages" : "Messages"}
              </h3>
              {!user && (
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                  Log in required
                </span>
              )}
            </div>
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
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder={
                user
                  ? "Search conversations..."
                  : "Sign in to search conversations"
              }
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              disabled={!user}
              className={`w-full px-3 py-2 pr-8 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                !user
                  ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-gray-300"
              }`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {nameFilter ? (
                <button
                  onClick={() => setNameFilter("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <svg
                    className="w-4 h-4"
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
              ) : (
                <svg
                  className="w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          {!user ? (
            <div className="p-6 md:p-8 text-center">
              <div className="text-purple-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
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
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Start Messaging
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Sign in to your account to view and send messages
              </p>
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-150 text-sm font-medium"
                  onClick={onClose}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block w-full py-2 px-4 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-150 text-sm font-medium"
                  onClick={onClose}
                >
                  Register
                </Link>
              </div>
            </div>
          ) : status === "loading" ? (
            <div className="p-6 md:p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading conversations...</p>
            </div>
          ) : error ? (
            <div className="p-6 md:p-8 text-center">
              <div className="text-red-500 mb-2">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-sm">
                Failed to load conversations
              </p>
              <button
                onClick={() => dispatch(fetchConversations())}
                className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Try again
              </button>
            </div>
          ) : getLatestConversations().length === 0 ? (
            <div className="p-6 md:p-8 text-center">
              <div className="text-gray-400 mb-4"></div>
              {nameFilter ? (
                <>
                  <p className="text-gray-600 font-medium">
                    No conversations found
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Try adjusting your search term
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-600 font-medium">
                    No conversations yet
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Start chatting with sellers or buyers
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {getLatestConversations().map((conversation) => (
                <div
                  key={conversation.conversation_id}
                  className="block hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() =>
                    handleConversationClick(conversation.other_user.id)
                  }
                >
                  <div className="p-3 md:p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          src={conversation.other_user.avatar || GenericAvatar}
                          alt={conversation.other_user.name}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-gray-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm md:text-sm font-semibold text-gray-900 truncate">
                            {conversation.other_user.name}
                          </h4>
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {formatMessageTime(
                              conversation.last_message_timestamp
                            )}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 truncate mt-1">
                          {conversation.last_message_content ||
                            "No messages yet"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatDropDown;
