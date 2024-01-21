import ProductCard from "@/components/products/productCard/ProductCard";
import prisma from "@/lib/prisma";

export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: {
  categoryId: number;
  currentProductId: number;
}) {
  const products = await prisma.products.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      categoryId,
      id: {
        not: currentProductId,
      },
    },
    include: {
      images: true,
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.name} product={product} badge="featured" />
      ))}
    </div>
  );
}
