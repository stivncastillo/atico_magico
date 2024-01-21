import { Suspense } from "react";
import FeaturedProducts from "@/components/products/featuredProducts";
import NewProducts from "@/components/products/newProducts";
import ProductGridSkeleton from "@/components/skeleton/productGridSkeleton";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-start pt-8">
      <div className="main-container">
        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Productos Destacados</h2>
          <Suspense fallback={<ProductGridSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Productos Nuevos</h2>
          <Suspense fallback={<ProductGridSkeleton />}>
            <NewProducts />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
