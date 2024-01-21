import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <Skeleton className="h-64 w-full mb-4" />

          <div className="p-4">
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-20 mb-4" />
          </div>
        </Card>
      ))}
    </div>
  );
}
