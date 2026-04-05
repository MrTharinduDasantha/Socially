import { currentUser } from "@clerk/nextjs/server";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export async function DesktopNavbar() {
  const user = await currentUser();
  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center g-2" asChild>
            <Link
              href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]}`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <>
          <SignInButton mode="modal">
            <Button variant="default" className="cursor-pointer">
              Sign In
            </Button>
          </SignInButton>
        </>
      )}
    </div>
  );
}
