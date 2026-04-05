"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ImageIcon, LoaderIcon, SendIcon } from "lucide-react";
import { createPost } from "@/lib/actions/post.action";
import toast from "react-hot-toast";
import { ImageUpload } from "./ImageUpload";

export function CreatePost() {
  const { user } = useUser();

  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;

    try {
      setIsPosting(true);

      const response = await createPost(content, imageUrl);
      if (response.success) {
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);

        toast.success("Post created successfully");
      }
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl || "/avatar.png"} />
            </Avatar>
            <Textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="What's on your mind 🤔"
              className="min-h-25 resize-none border-none focus-visible:ring-0 p-0 text-base"
              disabled={isPosting}
            />
          </div>

          {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload
                onChange={(ufsUrl) => {
                  setImageUrl(ufsUrl);
                  if (!ufsUrl) setShowImageUpload(false);
                }}
                value={imageUrl}
                endpoint="postImage"
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowImageUpload(!showImageUpload)}
                className="text-muted-foreground hover:text-primary cursor-pointer"
                disabled={isPosting}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Photo
              </Button>
            </div>
            <Button
              onClick={handleSubmit}
              className="flex items-center cursor-pointer"
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="w-4 h-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
