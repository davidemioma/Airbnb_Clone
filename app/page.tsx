import Box from "./components/Box";
import { ListingProps } from "@/types";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ClientOnly from "./components/ClientsOnly";
import { SearchParamsProps, getListings } from "./actions/getListings";
import { getCurrentUser } from "./actions/getCurrentUser";
import ListingCard from "./components/listings/ListingCard";

interface Props {
  searchParams: SearchParamsProps;
}

export default async function Home({ searchParams }: Props) {
  const listings = await getListings(searchParams);

  const currentUser = await getCurrentUser();

  if (listings.length === 0)
    return (
      <Box>
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      </Box>
    );

  return (
    <ClientOnly>
      <Box>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing: ListingProps) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                currentUser={currentUser}
              />
            ))}
          </div>
        </Container>
      </Box>
    </ClientOnly>
  );
}
