"use client";
import React from "react";
import useSearchModal from "../hooks/useSearchModal";

interface Props {
  children: React.ReactNode;
}

const Box = ({ children }: Props) => {
  const searchModal = useSearchModal();

  const closeAllModals = () => {
    searchModal.isOpen && searchModal.onClose();
  };

  return (
    <div
      className="relative w-screen h-screen overflow-y-auto"
      onClick={closeAllModals}
    >
      {children}
    </div>
  );
};

export default Box;
