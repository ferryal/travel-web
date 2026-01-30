import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "1",
    name: "Jane Cooper",
    email: "jane.cooper@bookmytix.com",
    role: "Flight Manager",
    avatar:
      "https://ui-avatars.com/api/?name=Jane+Cooper&background=0f172a&color=fff",
  },
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
