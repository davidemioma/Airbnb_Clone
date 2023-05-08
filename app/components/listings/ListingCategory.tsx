"use client";
import React from "react";
import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
  label: string;
  description: string;
}

const ListingCategory = ({ Icon, label, description }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <Icon size={40} className="text-neutral-500" />

      <div className="flex flex-col">
        <p className="font-semibold text-lg">{label}</p>

        <p className="text-neutral-500 font-light">{description}</p>
      </div>
    </div>
  );
};

export default ListingCategory;
