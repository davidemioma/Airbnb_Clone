"use client";
import React, { useState } from "react";
import { UserProps } from "@/types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface Props {
  listingId: string;
  currentUser: UserProps | null;
}

const HeartButton = ({ listingId, currentUser }: Props) => {
  const [hasFavourited, setHasFavourited] = useState(false);

  const togglefavourite = () => {};

  return (
    <div
      className="relative cursor-pointer transition hover:opacity-80"
      onClick={togglefavourite}
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
