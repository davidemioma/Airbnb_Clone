"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}: Props) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />

      <div className="w-48 mt-4">
        {showReset && (
          <Button
            onClick={() => router.push("/")}
            label="Remove all filters"
            outline
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;