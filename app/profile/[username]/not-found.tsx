import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <p className="text-8xl font-bold text-primary font-mono">404</p>

            {/* Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">
                User not found 🥲
              </h1>
              <p className="text-muted-foreground">
                The user you're looking for does'nt exist.
              </p>
            </div>

            {/* Action Button */}
            <Button variant="default" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4 mr-2" />
                Back to home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
