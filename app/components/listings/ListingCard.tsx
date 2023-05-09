"use client";
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { Reservation } from "@prisma/client";
import { ListingProps, ReservationProps, UserProps } from "@/types";
import { format } from "date-fns";
import HeartButton from "../HeartButton";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import Button from "../Button";

interface Props {
  listing: ListingProps;
  currentUser: UserProps | null;
  reservation?: ReservationProps;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  onAction?: (id: string) => void;
}

const ListingCard = ({
  listing,
  currentUser,
  reservation,
  disabled,
  actionId,
  actionLabel,
  onAction,
}: Props) => {
  const router = useRouter();

  const { getByValue } = useCountries();

  const location = getByValue(listing.locationValue);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);

    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return listing.price;
  }, [listing.price, reservation]);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction && onAction(actionId!);
    },
    [disabled, onAction, actionId]
  );

  return (
    <div
      className="col-span-1 group cursor-pointer"
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      <div className="w-full flex flex-col gap-2">
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <Image
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            fill
            src={listing.imgSrc}
            alt="listings"
          />

          <div className="absolute top-3 right-3">
            <HeartButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>

        <div className="font-light text-neutral-500">
          {reservationDate || listing.category}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>

          {!reservation && <div className="font-light">night</div>}
        </div>

        {onAction && actionLabel && (
          <Button
            small
            label={actionLabel}
            disabled={disabled}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
