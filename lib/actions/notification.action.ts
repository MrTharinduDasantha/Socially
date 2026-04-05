"use server";

import { prisma } from "../db";
import { getDbUserId } from "./user.action";

export async function getNotifications() {
  try {
    const userId = await getDbUserId();
    if (!userId) return { success: false, message: "User not found" };

    const notifications = await prisma.notification.findMany({
      where: { userId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            image: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, notifications };
  } catch (error) {
    console.log("Error in getNotifications: " + error);
    return { success: false, error: "Failed to get notifications" };
  }
}

export async function markNotificationAsRead(notificationIds: string[]) {
  try {
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
      data: {
        read: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.log("Error in markNotificationAsRead: " + error);
    return { success: false, error: "Failed to mark notification as read" };
  }
}
