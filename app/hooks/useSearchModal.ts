import { create } from "zustand";

interface SearchModalProps {
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
}

const useSearchModal = create<SearchModalProps>((set) => ({
  isOpen: false,
  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
