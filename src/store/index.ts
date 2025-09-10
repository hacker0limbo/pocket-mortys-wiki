import { create } from "zustand";

type SettingsStore = {
  tablePageSize: number;
  setTablePageSize: (size: number) => void;
};

export const useSettingsStore = create<SettingsStore>()((set) => ({
  tablePageSize: 10,
  setTablePageSize: (size: number) => set((state) => ({ ...state, tablePageSize: size })),
}));
