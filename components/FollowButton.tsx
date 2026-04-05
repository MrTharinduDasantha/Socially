"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/lib/actions/user.action";

export function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);

      await toggleFollow(userId);
      toast.success("User followed successfully");
    } catch (error) {
      toast.error("Failed to following user");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleFollow}
      disabled={isLoading}
      className="cursor-pointer"
    >
      {isLoading ? (
        <>
          <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
          Following...
        </>
      ) : (
        "Follow"
      )}
    </Button>
  );
}
