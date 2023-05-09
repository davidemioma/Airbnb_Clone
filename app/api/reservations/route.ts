import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();

  const { listingId, totalPrice, startDate, endDate } = body;

  if (!listingId || !totalPrice || !startDate || !endDate) {
    return NextResponse.error();
  }

  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          totalPrice,
          startDate,
          endDate,
        },
      },
    },
  });

  return new Response("New reservation created!");
}
