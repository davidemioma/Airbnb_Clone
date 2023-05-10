"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import qs from "query-string";
import Heading from "../Heading";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";
import { CountryType } from "@/types";
import { Range } from "react-date-range";
import Calender from "../inputs/Calender";
import CountrySelect from "../inputs/CountrySelect";
import { useRouter, useSearchParams } from "next/navigation";
import useFilterModal from "@/app/hooks/useFilterModal";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const Search = () => {
  const router = useRouter();

  const params = useSearchParams();

  const filterModal = useFilterModal();

  const [location, setLocation] = useState<CountryType | undefined>(undefined);

  const [step, setStep] = useState(STEPS.LOCATION);

  const [guestCount, setGuestCount] = useState(1);

  const [roomCount, setRoomCount] = useState(1);

  const [bathroomCount, setBathroomCount] = useState(1);

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return setStep((prev) => prev + 1);
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);

    filterModal.onClose();

    router.push(url);
  }, [
    router,
    params,
    step,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    filterModal,
  ]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />

      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountryType)}
      />

      <hr />

      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where do you plan to go?"
          subtitle="make sure everyone is free!"
        />

        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More Information" subtitle="Find your perfect place!" />

        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />

        <Counter
          title="bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={filterModal.isOpen}
      onClose={() => filterModal.onClose()}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={step === STEPS.INFO ? "Search" : "Next"}
      secondaryActionLabel={step === STEPS.LOCATION ? undefined : "Back"}
      secondaryAction={
        step === STEPS.LOCATION ? undefined : () => setStep((prev) => prev - 1)
      }
      body={bodyContent}
    />
  );
};

export default Search;
