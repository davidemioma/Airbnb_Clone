import React from "react";
import Box from "../components/Box";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientsOnly";
import { getCurrentUser } from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const Reservations = async () => {
  const currentUser = await getCurrentUser();

  const reservations = await getReservations({
    authorId: currentUser?.id,
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
            title="No reservations found!"
            subtitle="looks like you have no reservations on your properties."
          />
        </ClientOnly>
      </Box>
    );
  }

  return (
    <ClientOnly>
      <Box>
        <ReservationsClient
          currentUser={currentUser}
          reservations={reservations}
        />
      </Box>
    </ClientOnly>
  );
};

export default Reservations;
