import ProductCard from "./productCard/ProductCard";
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.name} product={product} badge="featured" />
      ))}
    </div>
  );
}
