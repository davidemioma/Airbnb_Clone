"use client";
import React from "react";

interface Props {
  label: string;
  bold?: boolean;
  onClick: () => void;
}

const MenuItem = ({ label, bold, onClick }: Props) => {
  return (
    <button
      className={`w-full text-left py-2 px-4 text-sm ${
        bold ? "font-semibold" : "font-light"
      } hover:bg-gray-50`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MenuItem;
