import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getFavorites = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeFavorites = favorites.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (err: any) {
    throw new Error(err);
  }
};
