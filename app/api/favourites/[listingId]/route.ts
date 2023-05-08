import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface Iparams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  const newFaviouritesIds = [listingId, ...(currentUser.favouriteIds || [])];

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds: newFaviouritesIds,
    },
  });

  return new Response("Added to favourite");
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  const newFaviouritesIds = currentUser.favouriteIds.filter(
    (id) => id !== listingId
  );

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds: newFaviouritesIds,
    },
  });

  return new Response("Removed from favourite");
}
