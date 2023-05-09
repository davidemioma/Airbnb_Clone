import React from "react";
import Box from "@/app/components/Box";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientsOnly";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import ListingClient from "./ListingClient";
import { getReservations } from "@/app/actions/getReservations";

interface Params {
  listingId?: string;
}

const Listing = async ({ params }: { params: Params }) => {
  const listing = await getListingById(params);

  const currentUser = await getCurrentUser();

  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <Box>
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      </Box>
    );
  }

  return (
    <ClientOnly>
      <Box>
        <ListingClient
          currentUser={currentUser}
          listing={listing}
          reservations={reservations}
        />
      </Box>
    </ClientOnly>
  );
};

export default Listing;
