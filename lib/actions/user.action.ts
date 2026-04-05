"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "../db";
import { revalidatePath } from "next/cache";

export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName}`,
        image: user.imageUrl,
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in syncUser: " + error);
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });

    return userData;
  } catch (error) {
    console.log("Error in getUserByClerkId: " + error);
  }
}

export async function getDbUserId() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;

    const user = await getUserByClerkId(clerkId);
    if (!user) return null;

    return user.id;
  } catch (error) {
    console.log("Error in getDbUserId: " + error);
  }
}

export async function getRandomUsers() {
  try {
    const userId = await getDbUserId();
    if (!userId) return;

    const randomUsers = await prisma.user.findMany({
      where: {
        AND: [
          { NOT: { id: userId } },
          {
            NOT: {
              followers: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
      take: 3,
    });

    return randomUsers;
  } catch (error) {
    console.log("Error in getRandomUsers: " + error);
  }
}

export async function toggleFollow(targerUserId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return { success: false, message: "User not found" };
    if (userId === targerUserId)
      return { success: false, message: "You can't follow yourself" };

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targerUserId,
        },
      },
    });
    if (existingFollow)
      // Unfollow
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targerUserId,
          },
        },
      });
    else
      // Follow
      await prisma.$transaction([
        prisma.follows.create({
          data: {
            followerId: userId,
            followingId: targerUserId,
          },
        }),
        prisma.notification.create({
          data: {
            type: "FOLLOW",
            userId: targerUserId,
            creatorId: userId,
          },
        }),
      ]);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Error in toggleFollow: " + error);
    return { success: false, message: "Failed to toggle follow" };
  }
}
