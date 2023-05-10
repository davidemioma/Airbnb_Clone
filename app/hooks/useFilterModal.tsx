import { create } from "zustand";

interface filterModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFilterModal = create<filterModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilterModal;
