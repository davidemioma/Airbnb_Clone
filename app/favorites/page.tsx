import React from "react";
import Box from "../components/Box";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientsOnly";
import { getCurrentUser } from "../actions/getCurrentUser";
import { getFavorites } from "../actions/getFavorites";
import FavoritesClient from "./FavoritesClient";

const Favorites = async () => {
  const currentUser = await getCurrentUser();

  const favorites = await getFavorites();

  if (!currentUser) {
    return (
      <Box>
        <ClientOnly>
          <EmptyState title="Unauthorized" subtitle="Please login" />
        </ClientOnly>
      </Box>
    );
  }

  if (favorites.length === 0) {
    return (
      <Box>
        <ClientOnly>
          <EmptyState
            title="No favorites found!"
            subtitle="looks like you have no favorite listings."
          />
        </ClientOnly>
      </Box>
    );
  }

  return (
    <ClientOnly>
      <Box>
        <FavoritesClient currentUser={currentUser} listings={favorites} />
      </Box>
    </ClientOnly>
  );
};

export default Favorites;
