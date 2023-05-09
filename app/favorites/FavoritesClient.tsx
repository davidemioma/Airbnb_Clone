"use client";
import React from "react";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { ListingProps, UserProps } from "@/types";
import ListingCard from "../components/listings/ListingCard";

interface Props {
  currentUser: UserProps | null;
  listings: ListingProps[];
}

const FavoritesClient = ({ currentUser, listings }: Props) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            listing={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
