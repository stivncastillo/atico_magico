import ProductGrid from "@/app/search/components/ProductGrid";
import prisma from "@/lib/prisma";

export default async function FeaturedProducts() {
  const products = await prisma.products.findMany({
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

  return <ProductGrid products={products} />;
}
