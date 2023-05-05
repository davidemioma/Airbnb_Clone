"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import Container from "./Container";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import useSearchModal from "../hooks/useSearchModal";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

interface Props {
  currentUser: User | null;
}

const Navbar = ({ currentUser }: Props) => {
  const router = useRouter();

  const searchModal = useSearchModal();

  const loginModal = useLoginModal();

  const registerModal = useRegisterModal();

  const onRentHandler = useCallback(() => {
    if (!currentUser) {
    }
  }, [currentUser]);

  console.log(currentUser);

  return (
    <nav className="w-screen sticky top-0 z-30 bg-white py-4 border-b shadow-sm">
      <Container>
        <div className="flex items-center justify-between gap-3 lg:gap-0">
          <Image
            className="hidden md:inline cursor-pointer"
            src="/assets/logo.png"
            alt="Logo"
            width="100"
            height="100"
            onClick={() => router.push("/")}
          />

          <div className="w-full md:w-auto flex items-center justify-between py-2 text-sm cursor-pointer border rounded-full shadow-sm hover:shadow-md transition">
            <button className="px-4 font-semibold sm:border-r">Anywhere</button>

            <button className="hidden sm:inline px-6 font-semibold border-r">
              Any week
            </button>

            <div className="flex items-center justify-center space-x-2 px-6">
              <button className="hidden sm:inline text-gray-600">
                Add Guests
              </button>

              <button className="bg-rose-500 text-white p-1.5 sm:p-2 rounded-full">
                <BiSearch size={18} />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3">
              <button
                className="hidden lg:inline text-sm font-semibold py-2 px-4 rounded-full transition hover:bg-neutral-100"
                onClick={onRentHandler}
              >
                Airbnb your home
              </button>

              <button
                className="flex items-center gap-3 border border-neutral-200 p-4 md:py-1 md:px-2 transition shadow-sm rounded-full hover:shadow-md"
                onClick={() => searchModal.toggle()}
              >
                <AiOutlineMenu />

                <div className="hidden md:inline">
                  <Avatar src={currentUser?.image} />
                </div>
              </button>
            </div>

            {searchModal.isOpen && (
              <div className="absolute mt-3 right-0 z-30 bg-white w-60 py-2 border border-[whitesmoke] rounded-xl shadow-md">
                {currentUser ? (
                  <>
                    <MenuItem label="My trips" onClick={() => {}} />

                    <MenuItem label="My favourites" onClick={() => {}} />

                    <MenuItem label="My reservations" onClick={() => {}} />

                    <MenuItem label="My properties" onClick={() => {}} />

                    <hr className="my-2" />

                    <MenuItem
                      label="Airbnb your home"
                      onClick={onRentHandler}
                    />

                    <MenuItem label="Logout" onClick={() => signOut()} />
                  </>
                ) : (
                  <>
                    <MenuItem
                      label="Sign up"
                      bold
                      onClick={() => {
                        searchModal.onClose();

                        registerModal.onOpen();
                      }}
                    />

                    <MenuItem
                      label=" Log in"
                      onClick={() => {
                        searchModal.onClose();

                        loginModal.onOpen();
                      }}
                    />

                    <hr className="my-2" />

                    <MenuItem
                      label="Airbnb your home"
                      onClick={onRentHandler}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
