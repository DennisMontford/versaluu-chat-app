import { User } from "@/db/dummy";
import { create } from "zustand";

type setSelectedUserState = {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

export const useSelectedUser = create<setSelectedUserState>((set) => ({
  selectedUser: null,
  setSelectedUser: (user: User | null) => set({ selectedUser: user }),
}));
