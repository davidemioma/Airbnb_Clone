"use client";
import React from "react";
import { IconType } from "react-icons";

interface Props {
  label: string;
  selected: boolean;
  Icon: IconType;
  onClick: () => void;
}

const CategoryInput = ({ label, selected, Icon, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-3 rounded-xl p-3 sm:p-4 border-2 ${
        selected ? "border-black" : "border-neutral-200"
      } transition hover:border-black`}
    >
      <Icon size={30} />

      <p className="font-semibold">{label}</p>
    </button>
  );
};

export default CategoryInput;
