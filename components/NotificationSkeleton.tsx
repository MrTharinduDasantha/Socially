import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

export function NotificationSkeleton() {
  const skeletonItems = Array.from({ length: 5 }, (_, i) => i);
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Notifications</CardTitle>
            <Skeleton className="w-20 h-4" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {skeletonItems.map((index) => (
              <div key={index} className="flex items-start gap-4 p-4 border-b">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-40 h-4" />
                  </div>
                  <div className="pl-6 space-y-2">
                    <Skeleton className="w-full h-20" />
                    <Skeleton className="w-24 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
