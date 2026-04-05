import { ProfileClient } from "@/components/ProfileClient";
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/lib/actions/profile.action";
import { notFound } from "next/navigation";

export async function generateMetaData({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { user } = await getProfileByUsername(username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

export default async function Profile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profileResponse = await getProfileByUsername(username);
  if (!profileResponse.user) notFound();

  const [postsResponse, likedPostsResponse, followingResponse] =
    await Promise.all([
      getUserPosts(profileResponse.user.id),
      getUserLikedPosts(profileResponse.user.id),
      isFollowing(profileResponse.user.id),
    ]);
  return (
    <ProfileClient
      user={profileResponse.user}
      posts={postsResponse.posts}
      likedPost={likedPostsResponse.likedPosts}
      isFollowing={
        followingResponse.success
          ? (followingResponse.isFollowing ?? false)
          : false
      }
    />
  );
}
