"use client";
import React, { useCallback } from "react";
import qs from "query-string";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  label: string;
  Icon: IconType;
  selected?: boolean;
}

const CategoryBox = ({ label, Icon, selected }: Props) => {
  const router = useRouter();

  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-1 p-2 cursor-pointer transition border-b-2 hover:text-neutral-800 ${
        selected
          ? "border-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />

      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
