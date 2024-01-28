"use client";
import React, { useState } from "react";

import { Prisma } from "@prisma/client";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatCOP } from "@/lib/utils";

import ProductCart from "../products/productCart/ProductCart";

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
  const [open, setOpen] = useState(false);

  const total =
    cart?.details.reduce(
      (acc, detail) =>
        acc + detail.product.price * detail.product.profit * detail.quantity,
      0
    ) || 0;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="relative" variant="outline" size="icon">
          <ShoppingBagIcon className="h-4 w-4" />
          {cart?.details && (
            <span
              key={cart?.details.length}
              className="absolute -top-2 -right-2 bg-violet-500 text-white rounded w-4 h-4 text-[11px] flex items-center justify-center animate-shake"
            >
              {cart?.details.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader className="mb-8">
          <SheetTitle>Mi Carrito</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between h-[100%] ">
          {/* TODO: new component */}
          {cart?.details.length ? (
            <ul className="flex-1 flex flex-col overflow-auto">
              {cart?.details.map((detail) => (
                <li className=" border-b py-4" key={detail.id}>
                  <ProductCart detail={detail} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center">
              <p className="text-center text-neutral-500 dark:text-neutral-400">
                Tu carrito está vacío
              </p>
              <Link href="/search" onClick={() => setOpen(false)}>
                <Button className="mt-4">Ver productos</Button>
              </Link>
            </div>
          )}
          {/* TODO: new component */}
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
            <Link href="/checkout" onClick={() => setOpen(false)}>
              <Button className="w-full text-white" size="xl">
                Continuar
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
