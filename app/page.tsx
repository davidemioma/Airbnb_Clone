"use client";
import useSearchModal from "./hooks/useSearchModal";

export default function Home() {
  const searchModal = useSearchModal();

  const closeAllModals = () => {
    searchModal.isOpen && searchModal.onClose();
  };

  return (
    <div className="w-screen h-full overflow-y-scroll" onClick={closeAllModals}>
      Home
    </div>
  );
}
