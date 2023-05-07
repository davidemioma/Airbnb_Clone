import React from "react";
import { IconType } from "react-icons";

interface Props {
  disabled?: boolean;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  small?: boolean;
  Icon?: IconType;
}

const Button = ({ disabled, label, onClick, outline, small, Icon }: Props) => {
  return (
    <button
      className={`relative ${
        outline
          ? "bg-white border-black text-black"
          : "bg-rose-500 border-rose-500 text-white"
      } ${
        small ? "py-1 text-sm font-light" : "py-2 font-semibold"
      } w-full rounded-lg border transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-75`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="absolute top-2 left-4" size={24} />}

      {label}
    </button>
  );
};

export default Button;
