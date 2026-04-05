import { CreatePost } from "@/components/CreatePost";
import { PostCard } from "@/components/PostCard";
import { WhoToFollow } from "@/components/WhoToFollow";
import { getPosts } from "@/lib/actions/post.action";
import { getDbUserId } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = (await getDbUserId()) ?? null;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}

        <div className="space-y-6">
          {(posts.posts || []).map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}
