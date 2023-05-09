"use client";
import { ReservationProps, UserProps } from "@/types";
import React from "react";

interface Props {
  currentUser: UserProps;
  reservations: ReservationProps[];
}

const TripsClient = ({ currentUser, reservations }: Props) => {
  return <div>TripsClient</div>;
};

export default TripsClient;
