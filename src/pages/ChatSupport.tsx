import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "@/stores/useChatStore";
import { Input, Button } from "@/components/ui";

const statusColors: Record<string, string> = {
  active: "bg-success-50 text-success-600",
  pending: "bg-warning-50 text-warning-500",
  resolved: "bg-slate-100 text-slate-500",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  pending: "Pending",
  resolved: "Resolved",
};

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export function ChatSupport() {
  const {
    conversations,
    activeConversationId,
    isTyping,
    setActiveConversation,
    addMessage,
    sendAIResponse,
    getActiveConversation,
    getTotalUnread,
    resolveConversation,
  } = useChatStore();

  const [messageInput, setMessageInput] = useState("");
  const [filter, setFilter] = useState<
    "all" | "active" | "pending" | "resolved"
  >("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = getActiveConversation();
  const totalUnread = getTotalUnread();

  const filteredConversations = conversations.filter((conv) =>
    filter === "all" ? true : conv.status === filter,
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversationId) return;

    addMessage(activeConversationId, messageInput.trim(), "admin");
    setMessageInput("");
  };

  const handleSimulateCustomerMessage = () => {
    if (!activeConversationId) return;
    const customerMessages = [
      "I have a question about my booking",
      "Can you help me with seat selection?",
      "What's the baggage allowance?",
      "I need to change my flight date",
    ];
    const randomMsg =
      customerMessages[Math.floor(Math.random() * customerMessages.length)];
    addMessage(activeConversationId, randomMsg, "customer");

    // Trigger AI response
    setTimeout(() => {
      sendAIResponse(activeConversationId, randomMsg);
    }, 500);
  };

  return (
    <div className="page-enter flex h-[calc(100vh-120px)] flex-col">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Chat Support
            </h1>
            {totalUnread > 0 && (
              <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-danger-500 px-2 text-xs font-bold text-white">
                {totalUnread}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            AI-powered customer support conversations (24/7)
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", "active", "pending", "resolved"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                filter === status
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Conversation List */}
        <div className="w-80 shrink-0 overflow-hidden rounded-[24px] bg-white shadow-[0px_2px_15px_-3px_rgba(0,0,0,0.03)]">
          <div className="border-b border-slate-100 p-4">
            <div className="relative">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                width={18}
              />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>

          <div className="h-[calc(100%-65px)] overflow-y-auto">
            <AnimatePresence>
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <Icon
                    icon="solar:chat-round-dots-linear"
                    width={40}
                    className="mx-auto mb-3 text-slate-300"
                  />
                  <p className="text-sm text-slate-500">
                    No conversations found
                  </p>
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <motion.button
                    key={conv.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveConversation(conv.id)}
                    className={`w-full border-b border-slate-50 p-4 text-left transition-colors hover:bg-slate-50 ${
                      activeConversationId === conv.id ? "bg-primary-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={conv.customerAvatar}
                        alt={conv.customerName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate font-semibold text-slate-900">
                            {conv.customerName}
                          </p>
                          <span className="shrink-0 text-xs text-slate-400">
                            {formatTime(conv.lastMessageTime)}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-sm text-slate-500">
                          {conv.lastMessage}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                              statusColors[conv.status]
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {statusLabels[conv.status]}
                          </span>
                          {conv.unreadCount > 0 && (
                            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-600 px-1.5 text-[10px] font-bold text-white">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-[24px] bg-white shadow-[0px_2px_15px_-3px_rgba(0,0,0,0.03)]">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeConversation.customerAvatar}
                    alt={activeConversation.customerName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {activeConversation.customerName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {activeConversation.customerEmail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSimulateCustomerMessage}
                    className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200"
                    title="Simulate customer message (for demo)"
                  >
                    <Icon icon="solar:user-speak-linear" width={16} />
                    Simulate
                  </button>
                  {activeConversation.status !== "resolved" && (
                    <button
                      onClick={() => resolveConversation(activeConversation.id)}
                      className="flex items-center gap-2 rounded-xl bg-success-50 px-3 py-2 text-xs font-semibold text-success-600 transition-colors hover:bg-success-100"
                    >
                      <Icon icon="solar:check-circle-linear" width={16} />
                      Resolve
                    </button>
                  )}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      statusColors[activeConversation.status]
                    }`}
                  >
                    {statusLabels[activeConversation.status]}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {activeConversation.messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`flex ${
                        message.sender === "customer"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          message.sender === "customer"
                            ? "bg-slate-100 text-slate-900"
                            : message.sender === "ai"
                              ? "bg-primary-50 text-primary-900"
                              : "bg-slate-900 text-white"
                        }`}
                      >
                        {message.sender !== "customer" && (
                          <div className="mb-1 flex items-center gap-1.5">
                            <Icon
                              icon={
                                message.sender === "ai"
                                  ? "solar:magic-stick-3-linear"
                                  : "solar:user-circle-linear"
                              }
                              width={14}
                              className={
                                message.sender === "ai"
                                  ? "text-primary-600"
                                  : "text-slate-400"
                              }
                            />
                            <span
                              className={`text-[10px] font-bold uppercase ${
                                message.sender === "ai"
                                  ? "text-primary-600"
                                  : "text-slate-400"
                              }`}
                            >
                              {message.sender === "ai"
                                ? "AI Assistant"
                                : "Admin"}
                            </span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`mt-1.5 text-[10px] ${
                            message.sender === "customer"
                              ? "text-slate-400"
                              : message.sender === "ai"
                                ? "text-primary-400"
                                : "text-slate-400"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* AI Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div className="flex items-center gap-2 rounded-2xl bg-primary-50 px-4 py-3">
                        <Icon
                          icon="solar:magic-stick-3-linear"
                          width={14}
                          className="text-primary-600"
                        />
                        <div className="flex gap-1">
                          <span
                            className="h-2 w-2 animate-bounce rounded-full bg-primary-400"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="h-2 w-2 animate-bounce rounded-full bg-primary-400"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="h-2 w-2 animate-bounce rounded-full bg-primary-400"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <form
                onSubmit={handleSendMessage}
                className="border-t border-slate-100 p-4"
              >
                <div className="flex gap-3">
                  <div className="min-w-0 flex-1">
                    <Input
                      placeholder="Type your message as admin..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="shrink-0"
                  >
                    <Icon
                      icon="solar:plain-linear"
                      width={18}
                      className="rotate-45"
                    />
                    Send
                  </Button>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  <Icon
                    icon="solar:magic-stick-3-linear"
                    width={12}
                    className="inline"
                  />{" "}
                  AI is automatically responding to customer messages
                </p>
              </form>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-8">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50">
                <Icon
                  icon="solar:chat-round-dots-linear"
                  width={40}
                  className="text-slate-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Select a Conversation
              </h3>
              <p className="mt-1 text-center text-sm text-slate-500">
                Choose a conversation from the list to view messages
                <br />
                and respond as an admin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
