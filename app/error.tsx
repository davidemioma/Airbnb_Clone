"use client";
import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface Props {
  error: Error;
}

const Error = ({ error }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default Error;
