import ProductGrid from "@/app/search/components/ProductGrid";
import prisma from "@/lib/prisma";

export default async function NewProducts() {
  const products = await prisma.products.findMany({
    where: {
      newProduct: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
    },
  });

  return <ProductGrid products={products} />;
}
