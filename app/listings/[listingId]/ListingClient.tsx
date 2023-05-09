"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "@/util/axios";
import { toast } from "react-hot-toast";
import { Reservation } from "@prisma/client";
import { categories } from "@/util/helper";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { ListingProps, ReservationProps, UserProps } from "@/types";
import Container from "@/app/components/Container";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface Props {
  currentUser: UserProps | null;
  listing: ListingProps & {
    user: UserProps;
  };
  reservations: ReservationProps[];
}

const ListingClient = ({ currentUser, listing, reservations = [] }: Props) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const [totalPrice, setTotalPrice] = useState(listing.price);

  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const category = useMemo(
    () => categories.find((cat) => cat.label === listing.category),
    [listing.category]
  );

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const createReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        listingId: listing.id,
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then(() => {
        toast.success("Listings Reserved!");

        setDateRange(initialDateRange);

        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [loginModal, currentUser, totalPrice, listing.id, dateRange, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(-dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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

          <div className="order-first mb-10 md:order-last md:col-span-3">
            <ListingReservation
              dateRange={dateRange}
              price={listing.price}
              totalPrice={totalPrice}
              disabled={isLoading}
              disabledDate={disabledDates}
              onChangeDate={(value) => setDateRange(value)}
              onSubmit={createReservation}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
