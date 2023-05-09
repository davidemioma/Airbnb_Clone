import React from "react";
import Box from "../components/Box";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientsOnly";
import { getCurrentUser } from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import { getMyProperties } from "../actions/getMyProperties";

const Properties = async () => {
  const currentUser = await getCurrentUser();

  const properties = await getMyProperties();

  if (!currentUser) {
    return (
      <Box>
        <ClientOnly>
          <EmptyState title="Unauthorized" subtitle="Please login" />
        </ClientOnly>
      </Box>
    );
  }

  if (properties.length === 0) {
    return (
      <Box>
        <ClientOnly>
          <EmptyState
            title="No properties found!"
            subtitle="looks like you have no properties."
          />
        </ClientOnly>
      </Box>
    );
  }

  return (
    <ClientOnly>
      <Box>
        <PropertiesClient currentUser={currentUser} listings={properties} />
      </Box>
    </ClientOnly>
  );
};

export default Properties;
