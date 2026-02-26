"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";


// Runs once per user safely

export const onBoardUser = async () => {
  try {
    const user = await currentUser();

    if (!user)
      return { success: false, error: "No Authenticated user found" };

    const { id, firstName, lastName, imageUrl, emailAddresses } = user;
    const email = emailAddresses?.[0]?.emailAddress;

    if (!email) {
      throw new Error("No email found from Clerk");
    }

    // Check by clerkId
    const userByClerkId = await db.user.findUnique({
      where: { clerkId: id },
    });

    if (userByClerkId) {
      return { success: true };
    }

    // Check by email
    const userByEmail = await db.user.findUnique({
      where: { email },
    });

    // Email exists → attach clerkId
    if (userByEmail) {
      await db.user.update({
        where: { email },
        data: {
          clerkId: id,
          firstName: firstName || null,
          lastName: lastName || null,
          imageUrl: imageUrl || null,
        },
      });

      return { success: true };
    }

    // 4️⃣ Create brand-new user
    await db.user.create({
      data: {
        clerkId: id,
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        role: "USER",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("onBoardUser error:", error);
    return { success: false };
  }
};


// Get current user's role

export const currentUserRole = async () => {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
    select: { role: true },
  });

  return dbUser?.role ?? null;
};


// Get current DB user (id + role)

export const getCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  return await db.user.findUnique({
    where: { clerkId: user.id },
    select: { id: true, role: true },
  });
};







