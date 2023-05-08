"use client";
import React from "react";
import { UserProps } from "@/types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavourite from "../hooks/useFavourite";

interface Props {
  listingId: string;
  currentUser: UserProps | null;
}

const HeartButton = ({ listingId, currentUser }: Props) => {
  const { hasFavourited, toggleFavourite } = useFavourite({
    currentUser,
    listingId,
  });

  return (
    <div
      className="relative cursor-pointer transition hover:opacity-80"
      onClick={toggleFavourite}
    >
      <AiOutlineHeart
        size={28}
        className="absolute fill-white -top-[2px] -right-[2px]"
      />

      <AiFillHeart
        size={24}
        className={`${hasFavourited ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};

export default HeartButton;
