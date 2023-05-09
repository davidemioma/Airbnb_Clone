import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getMyProperties = async () => {
  try {
    const currentUser = await getCurrentUser();

    const properties = await prisma.listing.findMany({
      where: {
        userId: currentUser?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeProperties = properties.map((property) => ({
      ...property,
      createdAt: property.createdAt.toISOString(),
    }));

    return safeProperties;
  } catch (err: any) {
    throw new Error(err);
  }
};
