import { User, Listing, Reservation } from "@prisma/client";

export interface SearchParamsProps {
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export type UserProps = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type ListingProps = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type ReservationProps = Omit<
  Reservation,
  "startDate" | "endDate" | "createdAt" | "listing"
> & {
  startDate: string;
  endDate: string;
  createdAt: string;
  listing: ListingProps;
};

export interface CountryType {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
}
