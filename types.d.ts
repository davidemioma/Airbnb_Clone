import { User, Listing } from "@prisma/client";

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

export interface CountryType {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
}
