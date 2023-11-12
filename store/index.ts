import { create } from 'zustand';

type useState = {
  searchText: string;
  setSearchText: (payload: string) => void;
};

export const useStore = create<useState>((set) => ({
  searchText: "",
  setSearchText: (searchText) => set({ searchText: searchText })
}));