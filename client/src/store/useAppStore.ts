import { create } from "zustand";

type AppState = {
  isSidebarOpen: boolean;
  workspaceId: string;
  darkMode: boolean;
  toggleSidebar: () => void;
  setWorkspaceId: (workspaceId: string) => void;
  toggleDarkMode: () => void;
};

const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  workspaceId: "default",
  darkMode: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setWorkspaceId: (workspaceId) => set({ workspaceId }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useAppStore;
