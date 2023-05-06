import { User } from "@prisma/client";

export type UserProps = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export interface CountryType {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
}
