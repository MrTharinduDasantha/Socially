"use client";

import {
  createComment,
  deletePost,
  getPosts,
  toggleLike,
} from "@/lib/actions/post.action";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { formatDistanceToNow } from "date-fns";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { Button } from "./ui/button";
import {
  HeartIcon,
  LoaderIcon,
  LogInIcon,
  MessageCircleIcon,
  SendIcon,
} from "lucide-react";
import { Textarea } from "./ui/textarea";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = NonNullable<Posts["posts"]>[number];

export function PostCard({
  post,
  dbUserId,
}: {
  post: Post;
  dbUserId: string | null;
}) {
  const { user } = useUser();

  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === dbUserId),
  );
  const [likes, setLikes] = useState(post._count.likes);
  const [showComments, setshowCommentss] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setLikes((prev) => prev + (hasLiked ? -1 : 1));

      await toggleLike(post.id);
    } catch (error) {
      setLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === dbUserId));
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;

    try {
      setIsCommenting(true);

      const response = await createComment(post.id, newComment);
      if (response.success) {
        toast.success("Comment added successfully");
        setNewComment("");
      }
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);

      const response = await deletePost(post.id);
      if (response.success) toast.success("Post deleted successfully");
      else toast.error(response.message ?? "Failed to delete post");
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex space-x-3 sm:space-x-4">
            <Link href={`/profile/${post.author.username}`}>
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarImage src={post.author.image ?? "/avatar.png"} />
              </Avatar>
            </Link>

            {/* Post Header & Text Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="font-semibold truncate"
                  >
                    {post.author.name}
                  </Link>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Link href={`/profile/${post.author.username}`}>
                      @{post.author.username}
                    </Link>
                    <Separator orientation="vertical" className="mt-0.5 h-5" />
                    <span>
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </span>
                  </div>
                </div>
                {/* Check if current user is the post author */}
                {dbUserId === post.author.id && (
                  <DeleteAlertDialog
                    isDeleting={isDeleting}
                    onDelete={handleDeletePost}
                  />
                )}
              </div>
              <p className="mt-2 text-sm text-foreground wrap-break-word">
                {post.content}
              </p>
            </div>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.image}
                className="w-full h-auto object-cover"
                alt="Post"
              />
            </div>
          )}

          {/* Like & Comment Butons */}
          <div className="flex items-center pt-2 space-x-2">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground gap-2 cursor-pointer ${hasLiked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"}`}
                onClick={handleLike}
              >
                {hasLiked ? (
                  <HeartIcon className="w-5 h-5 fill-current" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>{likes}</span>
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground gap-2 cursor-pointer"
                >
                  <span>{likes}</span>
                </Button>
              </SignInButton>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground gap-2 hover:text-blue-500 cursor-pointer"
              onClick={() => setshowCommentss((prev) => !prev)}
            >
              <MessageCircleIcon
                className={`w-5 h-5 ${showComments ? "fill-blue-500 text-blue-500" : ""}`}
              />
              <span>{post.comments.length}</span>
            </Button>
          </div>

          {/* Comments Sections */}
          {showComments && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-4">
                {/* Display Comments */}
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarImage
                        src={comment.author.image ?? "/avatar.png"}
                      />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-medium text-sm">
                          {comment.author.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          @{comment.author.username}
                        </span>
                        <Separator
                          orientation="vertical"
                          className="mt-0.5 h-5"
                        />
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt))} ago
                        </span>
                      </div>
                      <p className="text-sm wrap-break-word">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {user ? (
                <div className="flex space-x-3">
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      onChange={(e) => setNewComment(e.target.value)}
                      value={newComment}
                      placeholder="Write a comment 💬"
                      className="min-h-20 resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        size="sm"
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={handleAddComment}
                        disabled={!newComment.trim() || isCommenting}
                      >
                        {isCommenting ? (
                          <>
                            <LoaderIcon className="w-4 h-4 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          <>
                            <SendIcon className="w-4 h-4" />
                            Comment
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-4 rounded-lg bg-muted/50">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="g-2 cursor-pointer">
                      <LogInIcon className="w-4 h-4" />
                      Sign in to comment
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
