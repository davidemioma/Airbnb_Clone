import React from "react";
import Box from "../components/Box";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientsOnly";
import { getCurrentUser } from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import TripsClient from "./TripsClient";

const Trips = async () => {
  const currentUser = await getCurrentUser();

  const reservations = await getReservations({
    userId: currentUser?.id,
  });

  if (!currentUser) {
    return (
      <Box>
        <ClientOnly>
          <EmptyState title="Unauthorized" subtitle="Please login" />
        </ClientOnly>
      </Box>
    );
  }

  if (reservations.length === 0) {
    return (
      <Box>
        <ClientOnly>
          <EmptyState
            title="No trips found!"
            subtitle="looks like you haven't reserved any trips."
          />
        </ClientOnly>
      </Box>
    );
  }

  return (
    <ClientOnly>
      <Box>
        <Container>
          <TripsClient currentUser={currentUser} reservations={reservations} />
        </Container>
      </Box>
    </ClientOnly>
  );
};

export default Trips;
