"use client";

import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";

export function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();

  const { user } = useUser();
  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        variant="ghost"
        size="icon"
        className="mr-2"
      >
        <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle Theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="w-5 h-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-75">
          <SheetHeader>
            <SheetTitle className="text-center">Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-3"
              asChild
            >
              <Link href="/" onClick={() => setShowMobileMenu(false)}>
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-3"
                  asChild
                >
                  <Link
                    href="/notifications"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-3"
                  asChild
                >
                  <Link
                    href={`/profile/${user?.username ?? user?.emailAddresses[0].emailAddress.split("@")[0]}`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <BellIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start gap-3"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton>
                <Button variant="default" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
