import { create } from "zustand";

export type CurrentUser = {
  id: string;
  email: string;
  isAdmin: boolean;
  isEditor: boolean;
} | null;

type useState = {
  searchText: string;
  setSearchText: (payload: string) => void;
  currentUser: CurrentUser;
  setCurrentUser: (payload: CurrentUser) => void;
};

export const useStore = create<useState>((set) => ({
  searchText: "",
  setSearchText: (searchText) => set({ searchText: searchText }),
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
}));
