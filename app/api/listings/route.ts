import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();

  const {
    title,
    price,
    imgSrc,
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    description,
  } = body;

  await prisma.listing.create({
    data: {
      title,
      price: parseInt(price, 10),
      imgSrc,
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      description,
      userId: currentUser.id,
    },
  });

  return new Response("New listing created!");
}
