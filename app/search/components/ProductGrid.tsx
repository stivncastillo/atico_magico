import React from "react";

import { Prisma } from "@prisma/client";

import ProductCard from "@/components/products/productCard/ProductCard";

interface ProductListProps {
  products: Prisma.productsGetPayload<{
    include: {
      images: true;
    };
  }>[];
}

const ProductGrid: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
