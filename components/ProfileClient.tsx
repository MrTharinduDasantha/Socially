"use client";

import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  updateProfile,
} from "@/lib/actions/profile.action";
import { toggleFollow } from "@/lib/actions/user.action";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  EditIcon,
  FileTextIcon,
  HeartIcon,
  LinkIcon,
  LoaderIcon,
  MapPinIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { PostCard } from "./PostCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type ProfileUser = NonNullable<
  Awaited<ReturnType<typeof getProfileByUsername>>["user"]
>;
type UserPosts = Awaited<ReturnType<typeof getUserPosts>>["posts"];
type LikedPosts = Awaited<ReturnType<typeof getUserLikedPosts>>["likedPosts"];

interface ProfileClientProps {
  user: ProfileUser;
  posts: UserPosts;
  likedPost: LikedPosts;
  isFollowing: boolean;
}

export function ProfileClient({
  user,
  posts,
  likedPost,
  isFollowing: initialIsFollowing,
}: ProfileClientProps) {
  const { user: currentUser } = useUser();

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);

  const [editForm, setEditForm] = useState({
    name: user.name || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
  });

  const handleEditSubmit = async () => {
    setIsProfileUpdating(true);

    const formData = new FormData();
    Object.entries(editForm).forEach(([Key, value]) => {
      formData.append(Key, value);
    });

    const response = await updateProfile(formData);
    if (response.success) {
      setShowEditDialog(false);
      setIsProfileUpdating(false);
      toast.success("Profile updated successfully");
    }
  };

  const handleFollow = async () => {
    if (!currentUser) return;

    try {
      setIsUpdatingFollow(true);
      await toggleFollow(user.id);
      setIsFollowing(!isFollowing);
    } catch (error) {
      toast.error("Failed to update follow status");
    } finally {
      setIsUpdatingFollow(false);
    }
  };

  const isOwnProfile =
    currentUser?.username === user.username ||
    currentUser?.emailAddresses[0].emailAddress.split("@")[0] === user.username;

  const formattedDate = format(new Date(user.createdAt), "MMMM yyyy");
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full max-w-lg mx-auto">
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.image ?? "/avatar.png"} />
                </Avatar>
                <h1 className="mt-4 text-2xl font-bolds">
                  {user.name ?? user.username}
                </h1>
                <p className="text-muted-foregrounds">@{user.username}</p>
                <p className="mt-2 text-sm">{user.bio}</p>

                {/* Profile Status */}
                <div className="w-full mt-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="font-semibold">
                        {user._count.following}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Following
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      <div className="font-semibold">
                        {user._count.followers}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Followers
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      <div className="font-semibold">{user._count.posts}</div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </div>
                  </div>
                </div>

                {/* Follow & Edit Profile Buttons */}
                {!currentUser ? (
                  <SignInButton mode="modal">
                    <Button className="w-full mt-4">Follow</Button>
                  </SignInButton>
                ) : isOwnProfile ? (
                  <Button
                    onClick={() => setShowEditDialog(true)}
                    className="w-full mt-4 cursor-pointer"
                  >
                    <EditIcon className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    onClick={handleFollow}
                    className="w-full mt-4 cursor-pointer"
                    disabled={isUpdatingFollow}
                  >
                    {isFollowing ? (
                      <>
                        {isUpdatingFollow ? (
                          <>
                            <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />{" "}
                            Unfollowing...
                          </>
                        ) : (
                          "Unfollow"
                        )}
                      </>
                    ) : (
                      <>
                        {isUpdatingFollow ? (
                          <>
                            <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />{" "}
                            Following...
                          </>
                        ) : (
                          "Follow"
                        )}
                      </>
                    )}
                  </Button>
                )}

                {/* Location & Website */}
                <div className="w-full mt-6 space-y-2 text-sm">
                  {user.location && (
                    <div className="flex items-center text-muted-foreground">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {user.location}
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center text-muted-foreground">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      <a
                        href={
                          user.website.startsWith("http")
                            ? user.website
                            : `https://${user.website}`
                        }
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center text-muted-foreground">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Joined {formattedDate}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="posts"
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 font-semibold"
            >
              <FileTextIcon className="w-4 h-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 font-semibold"
            >
              <HeartIcon className="w-4 h-4" />
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="space-y-6">
              {posts?.length ? (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} dbUserId={user.id} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No posts yet
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <div className="space-y-6">
              {likedPost?.length ? (
                likedPost.map((post) => (
                  <PostCard key={post.id} post={post} dbUserId={user.id} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No liked posts to show
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-125">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  className="min-h-25"
                  placeholder="Tell us about yourself"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  name="location"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  placeholder="Where are you from?"
                />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  name="website"
                  value={editForm.website}
                  onChange={(e) =>
                    setEditForm({ ...editForm, website: e.target.value })
                  }
                  placeholder="Your personal website"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleEditSubmit}
                className="cursor-pointer"
                disabled={isProfileUpdating}
              >
                {isProfileUpdating ? (
                  <>
                    <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                    Editing Profile...
                  </>
                ) : (
                  "Edit Profile"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
