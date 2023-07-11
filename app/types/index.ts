import { Listing, Reservation, User } from "@prisma/client";

export type SafeListings = Omit<
   Listing,
   "createdAt"
> &{
   createdAt: string;
}

export type SafeReservations = Omit<
   Reservation,
   "createdAt" | "startData" | "endDate" | "listing"
> &{
   createdAt: string;
   startData: string;
   endDate: string;
   listing: SafeListings;
}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};