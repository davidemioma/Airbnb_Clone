import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
