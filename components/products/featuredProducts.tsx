import { cache } from "react";

import ProductGrid from "@/app/search/components/ProductGrid";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

const getFeaturedProducts = cache(async () => {
  return await prisma.products.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      featured: true,
    },
    include: {
      images: true,
    },
  });
});

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return <ProductGrid products={products} />;
}
