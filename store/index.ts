import { Project } from "@/types";
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
  searchStaff: string;
  setSearchStaff: (payload: string) => void;
  startAt: string;
  setStartAt: (payload: string) => void;
  endAt: string;
  setEndAt: (payload: string) => void;
  searchStatus: string;
  setSearchStatus: (payload: string) => void;
  currentUser: CurrentUser;
  setCurrentUser: (payload: CurrentUser) => void;
  projects: Project[];
  setProjects: (payload: Project[]) => void;
  filterProjects: Project[];
  setFilterProjects: (payload: Project[]) => void;
};

export const useStore = create<useState>((set) => ({
  searchText: "",
  setSearchText: (searchText) => set({ searchText }),
  searchStaff: "",
  setSearchStaff: (searchStaff) => set({ searchStaff }),
  startAt: "",
  setStartAt: (startAt) => set({ startAt }),
  endAt: "",
  setEndAt: (endAt) => set({ endAt }),
  searchStatus: "",
  setSearchStatus: (searchStatus: string) => set({ searchStatus }),
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  projects: [],
  setProjects: (projects) => set({ projects }),
  filterProjects: [],
  setFilterProjects: (filterProjects) => set({ filterProjects }),
}));
