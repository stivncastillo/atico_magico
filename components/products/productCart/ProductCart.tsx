import EditQtyButton from "@/components/cart/EditQtyButton";
import { capitalize, formatCOP } from "@/lib/utils";
import { Prisma, products } from "@prisma/client";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import DeleteProductCartButton from "./DeleteProductCartButton";

interface ProductCartProps {
  detail: Prisma.cartDetailsGetPayload<{
    include: {
      product: {
        include: {
          images: true;
        };
      };
    };
  }>;
}

const ProductCart: React.FC<ProductCartProps> = ({ detail }) => {
  const product = detail.product;
  return (
    <div className="flex flex-row gap-4">
      <div className="relative border rounded group">
        <DeleteProductCartButton detail={detail} />
        <Image
          src={product.images[0]?.url}
          alt={product.name}
          className="w-16 h-16 object-contain rounded-t-md"
          width={499}
          height={440}
          priority
        />
      </div>

      <div className="flex flex-col flex-1 items-end justify-between">
        <div className="flex flex-row justify-between w-full">
          <h3
            className="font-medium line-clamp-1"
            title={capitalize(product.name)}
          >
            {capitalize(product.name)}
          </h3>
          <span className="font-regular text-sm">
            {formatCOP(product.price * detail.quantity)}
          </span>
        </div>

        <div className="ml-auto flex h-9 flex-row items-center rounded  border border-neutral-200 dark:border-neutral-700">
          <EditQtyButton type="minus" detail={detail} />
          <p className="w-6 text-center">
            <span className="w-full text-sm">{detail.quantity}</span>
          </p>
          <EditQtyButton type="plus" detail={detail} />
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
