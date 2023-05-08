"use client";
import React from "react";
import { IconType } from "react-icons";
import { UserProps } from "@/types";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

interface Props {
  user: UserProps | null;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}: Props) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="flex flex-col gap-8 col-span-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <p>Hosted by {user?.name}</p>

          <Avatar src={user?.image} />
        </div>

        <div className="flex items-center gap-4 text-neutral-500 font-light">
          <p>
            {guestCount} guest{guestCount > 1 && "s"}
          </p>

          <p>
            {roomCount} room{roomCount > 1 && "s"}
          </p>

          <p>
            {bathroomCount} bathroom{bathroomCount > 1 && "s"}
          </p>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          Icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr />
    </div>
  );
};

export default ListingInfo;
