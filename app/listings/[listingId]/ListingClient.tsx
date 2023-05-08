"use client";
import React, { useMemo } from "react";
import { Reservation } from "@prisma/client";
import { categories } from "@/util/helper";
import { ListingProps, UserProps } from "@/types";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

interface Props {
  currentUser: UserProps | null;
  listing: ListingProps & {
    user: UserProps;
  };
  reservations?: Reservation[];
}

const ListingClient = ({ currentUser, listing }: Props) => {
  const category = useMemo(
    () => categories.find((cat) => cat.label === listing.category),
    [listing.category]
  );

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <ListingHead
          id={listing.id}
          currentuser={currentUser}
          title={listing.title}
          imgSrc={listing.imgSrc}
          locationValue={listing.locationValue}
        />

        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
