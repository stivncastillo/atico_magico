import ProductGridSkeleton from "@/components/skeleton/productGridSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <ProductGridSkeleton />
      <ProductGridSkeleton />
    </div>
  );
}
