"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductCart from "../products/productCart/ProductCart";
import { Prisma } from "@prisma/client";
import { formatCOP } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";

interface CartDrawerProps {
  cart?: Prisma.cartGetPayload<{
    include: {
      details: {
        include: {
          product: {
            include: {
              images: true;
            };
          };
        };
      };
    };
  }> | null;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ cart }) => {
  const total =
    cart?.details.reduce(
      (acc, detail) => acc + detail.product.price * detail.quantity,
      0
    ) || 0;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative" variant="outline" size="icon">
          <ShoppingBagIcon className="h-4 w-4" />
          <span
            key={cart?.details.length}
            className="absolute -top-2 -right-2 bg-violet-500 text-white rounded w-4 h-4 text-[11px] flex items-center justify-center animate-shake"
          >
            {cart?.details.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader className="mb-8">
          <SheetTitle>Mi Carrito</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between h-[100%] ">
          <ul className="flex-1 flex flex-col overflow-auto">
            {cart?.details.map((detail) => (
              <li className=" border-b py-4" key={detail.id}>
                <ProductCart detail={detail} />
              </li>
            ))}
          </ul>
          <div className=" mb-12">
            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className=" py-2 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700">
                <p>Envío</p>
                <p className="text-right">Se calcula en la órden</p>
              </div>
              <div className=" py-2 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700">
                <p>Total</p>
                <p className="text-right text-base font-bold text-black dark:text-white">
                  {formatCOP(total)}
                </p>
              </div>
            </div>
            <Button className="w-full text-white" size="xl" variant="success">
              <FaWhatsapp className="mr-2" />
              Hacer Pedido
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
