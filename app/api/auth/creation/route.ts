import prisma from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  console.log(user);
  const email = user?.emailAddresses[0]?.emailAddress;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const profilePicture = user?.imageUrl;

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  console.log(dbUser);

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: email ?? "",
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        profileImage: profilePicture,
      },
    });
    console.log(dbUser);
  }
  return NextResponse.redirect("http://localhost:3000");
}
