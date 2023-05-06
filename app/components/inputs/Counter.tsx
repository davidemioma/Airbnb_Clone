"use client";
import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Props {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ title, subtitle, value, onChange }: Props) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="font-semibold">{title}</p>

        <p className="font-light text-gray-600">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onReduce}
          className="flex items-center justify-center w-10 h-10 text-neutral-600 rounded-full border border-neutral-400 transition hover:opacity-80"
        >
          <AiOutlineMinus />
        </button>

        <div className="text-neutral-600 font-light">{value}</div>

        <button
          onClick={onAdd}
          className="flex items-center justify-center w-10 h-10 text-neutral-600 rounded-full border border-neutral-400 transition hover:opacity-80"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
