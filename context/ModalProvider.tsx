import React, { createContext, useContext, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openRegister: boolean;
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  openRent: boolean;
  setOpenRent: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChildrenProps {
  children: React.ReactNode;
}

export const ModalContext = createContext<ModalProps | null>(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: ChildrenProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [openRegister, setOpenRegister] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);

  const [openRent, setOpenRent] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openRegister,
        setOpenRegister,
        openLogin,
        setOpenLogin,
        openRent,
        setOpenRent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
