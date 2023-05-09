"use client";
import React from "react";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { ReservationProps, UserProps } from "@/types";

interface Props {
  currentUser: UserProps | null;
  reservations: ReservationProps[];
}

const ReservationsClient = ({ currentUser, reservations }: Props) => {
  return <Container>ReservationsClient</Container>;
};

export default ReservationsClient;
