import React from "react";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import AddToCartButton from "@/components/buttons/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BADGE_PRODUCTS } from "@/lib/constants";
import { formatCOP } from "@/lib/utils";

import ImageSlider from "./ImageSlider";

interface ProductCardProps {
  product: Prisma.productsGetPayload<{
    include: {
      images: true;
    };
  }>;
  badge?: keyof typeof BADGE_PRODUCTS;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, badge }) => {
  return (
    <Card>
      <Link href={`/product/${product.slug}`}>
        <CardContent className="p-0 overflow-hidden">
          <div className="relative">
            {product.outOfStock ? (
              <Badge
                className="absolute top-2 right-2 z-[1]"
                variant={BADGE_PRODUCTS["outOfStock"].color}
              >
                {BADGE_PRODUCTS["outOfStock"].text}
              </Badge>
            ) : (
              badge && (
                <Badge
                  className="absolute top-2 right-2 z-[1]"
                  variant={BADGE_PRODUCTS[badge].color}
                >
                  {BADGE_PRODUCTS[badge].text}
                </Badge>
              )
            )}
            {product.images.length > 1 ? (
              <ImageSlider
                images={product.images.map((image) => image.url)}
                productName={product.name}
              />
            ) : (
              <Image
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-32 md:h-64 object-cover rounded-t-md hover:scale-110 duration-150"
                width={499}
                height={440}
                priority
              />
            )}
          </div>
          <div className="p-2 md:p-4 space-y-1">
            <h3 className="text-lg font-medium truncate capitalize text-gray-600">
              {product.name.toLowerCase()}
            </h3>
            <div className="flex justify-start items-center gap-2">
              <span className="font-bold">
                {formatCOP(product.price * product.profit)}
              </span>
              {/* <span className="line-through text-sm text-gray">68.000</span> */}
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-2 md:p-4 pt-2">
        <AddToCartButton product={product} disabled={product.outOfStock} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
