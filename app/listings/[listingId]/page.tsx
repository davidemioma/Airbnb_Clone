import React from "react";
import Box from "@/app/components/Box";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientsOnly";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import ListingClient from "./ListingClient";

interface Params {
  listingId?: string;
}

const Listing = async ({ params }: { params: Params }) => {
  const listing = await getListingById(params);

  const currentUser = await getCurrentUser();

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
        <ListingClient currentUser={currentUser} listing={listing} />
      </Box>
    </ClientOnly>
  );
};

export default Listing;
