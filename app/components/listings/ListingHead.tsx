"use client";
import React from "react";
import Image from "next/image";
import { UserProps } from "@/types";
import useCountries from "@/app/hooks/useCountries";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface Props {
  id: string;
  currentuser: UserProps | null;
  title: string;
  imgSrc: string;
  locationValue: string;
}

const ListingHead = ({
  id,
  currentuser,
  title,
  imgSrc,
  locationValue,
}: Props) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="relative w-full h-[50vh] rounded-xl overflow-hidden">
        <Image className="object-cover" src={imgSrc} fill alt="Image" />

        <div className="absolute w-full h-full bg-black/50" />

        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentuser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
