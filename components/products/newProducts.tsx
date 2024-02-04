import { cache } from "react";

import ProductGrid from "@/app/search/components/ProductGrid";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

const getNewProducts = cache(async () => {
  return await prisma.products.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      newProduct: true,
    },
    include: {
      images: true,
    },
  });
});

export default async function NewProducts() {
  const products = await getNewProducts();

  return <ProductGrid products={products} />;
}
