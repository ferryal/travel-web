import { create } from "zustand";
import type { ChatConversation, ChatMessage } from "@/types";

interface ChatStore {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  isTyping: boolean;
  setActiveConversation: (id: string | null) => void;
  addMessage: (
    conversationId: string,
    content: string,
    sender: "customer" | "ai" | "admin",
  ) => void;
  sendAIResponse: (conversationId: string, customerMessage: string) => void;
  markAsRead: (conversationId: string) => void;
  resolveConversation: (conversationId: string) => void;
  getActiveConversation: () => ChatConversation | undefined;
  getTotalUnread: () => number;
}

// AI response templates for demo
const aiResponses: Record<string, string[]> = {
  booking: [
    "I'd be happy to help you with your booking! Could you please provide me with your booking reference number (PNR)?",
    "I can assist you with modifying your booking. What changes would you like to make?",
  ],
  refund: [
    "I understand you'd like to request a refund. Our refund policy allows cancellations up to 24 hours before departure. Let me check your booking details.",
    "I'm processing your refund request. This typically takes 3-5 business days to reflect in your account.",
  ],
  flight: [
    "I can help you find available flights! Where would you like to travel, and on what dates?",
    "Let me search for the best flight options for you. One moment please...",
  ],
  default: [
    "Thank you for reaching out! How can I assist you today?",
    "I'm here to help! Could you please provide more details about your inquiry?",
    "I understand. Let me look into this for you right away.",
    "Is there anything else I can help you with?",
  ],
};

// Mock conversations
const initialConversations: ChatConversation[] = [
  {
    id: "conv-1",
    customerId: "cust-1",
    customerName: "Ahmad Rizki",
    customerEmail: "ahmad.rizki@gmail.com",
    customerAvatar:
      "https://ui-avatars.com/api/?name=Ahmad+Rizki&background=6366f1&color=fff",
    status: "active",
    lastMessage: "I need help with my booking",
    lastMessageTime: "2026-02-01T12:30:00Z",
    unreadCount: 2,
    messages: [
      {
        id: "msg-1",
        conversationId: "conv-1",
        sender: "customer",
        content: "Hello, I need help with my flight booking",
        timestamp: "2026-02-01T12:25:00Z",
        isRead: true,
      },
      {
        id: "msg-2",
        conversationId: "conv-1",
        sender: "ai",
        content:
          "Hello Ahmad! I'd be happy to help you with your flight booking. Could you please provide me with your booking reference number (PNR)?",
        timestamp: "2026-02-01T12:25:30Z",
        isRead: true,
      },
      {
        id: "msg-3",
        conversationId: "conv-1",
        sender: "customer",
        content: "My PNR is ABC123. I want to change my flight date",
        timestamp: "2026-02-01T12:28:00Z",
        isRead: false,
      },
      {
        id: "msg-4",
        conversationId: "conv-1",
        sender: "customer",
        content: "I need help with my booking",
        timestamp: "2026-02-01T12:30:00Z",
        isRead: false,
      },
    ],
  },
  {
    id: "conv-2",
    customerId: "cust-2",
    customerName: "Siti Nurhaliza",
    customerEmail: "siti.n@yahoo.com",
    customerAvatar:
      "https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=10b981&color=fff",
    status: "pending",
    lastMessage: "Can I get a refund for my cancelled flight?",
    lastMessageTime: "2026-02-01T11:45:00Z",
    unreadCount: 1,
    messages: [
      {
        id: "msg-5",
        conversationId: "conv-2",
        sender: "customer",
        content: "Can I get a refund for my cancelled flight?",
        timestamp: "2026-02-01T11:45:00Z",
        isRead: false,
      },
    ],
  },
  {
    id: "conv-3",
    customerId: "cust-3",
    customerName: "Budi Santoso",
    customerEmail: "budi.santoso@company.co.id",
    customerAvatar:
      "https://ui-avatars.com/api/?name=Budi+Santoso&background=f59e0b&color=fff",
    status: "resolved",
    lastMessage: "Thank you for your help!",
    lastMessageTime: "2026-02-01T09:00:00Z",
    unreadCount: 0,
    messages: [
      {
        id: "msg-6",
        conversationId: "conv-3",
        sender: "customer",
        content: "I need to book for a group of 10 people",
        timestamp: "2026-02-01T08:30:00Z",
        isRead: true,
      },
      {
        id: "msg-7",
        conversationId: "conv-3",
        sender: "ai",
        content:
          "I can help you with group booking! For groups of 10 or more passengers, I recommend using our Group Booking feature for special rates. Would you like me to guide you through the process?",
        timestamp: "2026-02-01T08:31:00Z",
        isRead: true,
      },
      {
        id: "msg-8",
        conversationId: "conv-3",
        sender: "customer",
        content: "Yes please, that would be great!",
        timestamp: "2026-02-01T08:45:00Z",
        isRead: true,
      },
      {
        id: "msg-9",
        conversationId: "conv-3",
        sender: "admin",
        content:
          "Hi Budi! I'm taking over from our AI assistant. Let me help you with the group booking. Please send me the travel dates and passenger list.",
        timestamp: "2026-02-01T08:50:00Z",
        isRead: true,
      },
      {
        id: "msg-10",
        conversationId: "conv-3",
        sender: "customer",
        content: "Thank you for your help!",
        timestamp: "2026-02-01T09:00:00Z",
        isRead: true,
      },
    ],
  },
];

const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("book") ||
    lowerMessage.includes("reservation") ||
    lowerMessage.includes("pnr")
  ) {
    return aiResponses.booking[
      Math.floor(Math.random() * aiResponses.booking.length)
    ];
  }
  if (
    lowerMessage.includes("refund") ||
    lowerMessage.includes("cancel") ||
    lowerMessage.includes("money back")
  ) {
    return aiResponses.refund[
      Math.floor(Math.random() * aiResponses.refund.length)
    ];
  }
  if (
    lowerMessage.includes("flight") ||
    lowerMessage.includes("travel") ||
    lowerMessage.includes("fly")
  ) {
    return aiResponses.flight[
      Math.floor(Math.random() * aiResponses.flight.length)
    ];
  }
  return aiResponses.default[
    Math.floor(Math.random() * aiResponses.default.length)
  ];
};

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: initialConversations,
  activeConversationId: null,
  isTyping: false,

  setActiveConversation: (id) => {
    set({ activeConversationId: id });
    if (id) {
      get().markAsRead(id);
    }
  },

  getActiveConversation: () => {
    const { conversations, activeConversationId } = get();
    return conversations.find((c) => c.id === activeConversationId);
  },

  getTotalUnread: () => {
    return get().conversations.reduce(
      (total, conv) => total + conv.unreadCount,
      0,
    );
  },

  addMessage: (conversationId, content, sender) => {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      conversationId,
      sender,
      content,
      timestamp: new Date().toISOString(),
      isRead: sender !== "customer",
    };

    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: content,
              lastMessageTime: newMessage.timestamp,
              unreadCount:
                sender === "customer" ? conv.unreadCount + 1 : conv.unreadCount,
              status: conv.status === "resolved" ? "active" : conv.status,
            }
          : conv,
      ),
    }));
  },

  sendAIResponse: (conversationId, customerMessage) => {
    set({ isTyping: true });

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getAIResponse(customerMessage);
      get().addMessage(conversationId, response, "ai");
      set({ isTyping: false });
    }, 1500);
  },

  markAsRead: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              unreadCount: 0,
              messages: conv.messages.map((msg) => ({ ...msg, isRead: true })),
            }
          : conv,
      ),
    }));
  },

  resolveConversation: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, status: "resolved" as const }
          : conv,
      ),
    }));
  },
}));
