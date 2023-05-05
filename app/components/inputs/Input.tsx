"use client";
import React from "react";
import { BiDollar } from "react-icons/bi";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input = ({
  id,
  label,
  type,
  disabled,
  required,
  formatPrice,
  register,
  errors,
}: Props) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          className="absolute top-5 left-2 text-neutral-700"
          size={24}
        />
      )}

      <input
        className={`peer bg-white w-full pt-5 p-3 font-light rounded-md border-2 outline-none transition disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        } ${
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-black"
        }`}
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
      />

      <label
        className={`absolute top-5 -translate-y-3 z-10 origin-[0] text-sm ${
          formatPrice ? "left-9" : "left-4"
        } ${
          errors[id] ? "text-rose-500" : "text-zinc-400"
        } transform duration-150 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
