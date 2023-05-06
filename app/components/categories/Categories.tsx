"use client";
import React from "react";
import Container from "../Container";
import CategoryBox from "./CategoryBox";
import { categories } from "../../../util/helper";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();

  const category = params?.get("category");

  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <div className="w-screen">
      <Container>
        <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <CategoryBox
              key={cat.label}
              label={cat.label}
              Icon={cat.icon}
              selected={category === cat.label}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
