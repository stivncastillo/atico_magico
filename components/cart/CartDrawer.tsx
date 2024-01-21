"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ShoppingBagIcon, XIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

interface CartDrawerProps {}

const CartDrawer: React.FC<CartDrawerProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative" variant="outline" size="icon">
          <ShoppingBagIcon className="h-4 w-4" />
          <span className="absolute -top-2 -right-2 bg-violet-500 text-white rounded w-4 h-4 text-[11px] flex items-center justify-center">
            3
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader className="mb-8">
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between h-[100%] ">
          <ul className="flex-1 flex flex-col">
            <li className="flex flex-row gap-4">
              <div className="relative border rounded group">
                <span className="absolute hidden items-center justify-center -top-2 -right-2 h-5 w-5 bg-error-500 rounded-full group-hover:flex">
                  <XIcon className="h-4 w-4" color="#ffffff" />
                </span>
                <Image
                  src="/products/um4tupmpr5-5c2les4u1l.jpg"
                  alt="Ático Mágico Logo"
                  className="w-16 h-16 object-contain rounded-t-md"
                  width={499}
                  height={440}
                  priority
                />
              </div>

              <div className="flex flex-col flex-1 items-end justify-between">
                <div className="flex flex-row justify-between w-full">
                  <h3 className="font-medium">Producto</h3>
                  <span className="font-regular text-sm">$50.000</span>
                </div>

                <div>
                  {/* Number picker */}
                  <div className="relative flex items-center max-w-[8rem]">
                    <button
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="quantity-input"
                      className="rounded-s-lg border border-r-0 h-8 px-2"
                    >
                      <MinusIcon className="w-3 h-3 text-gray-900 dark:text-white" />
                    </button>
                    <input
                      type="text"
                      id="quantity-input"
                      data-input-counter
                      aria-describedby="helper-text-explanation"
                      className="border-y h-8 text-center text-gray-900 text-sm block w-full py-2.5 "
                      placeholder="999"
                      required
                      readOnly
                    />
                    <button
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="quantity-input"
                      className="rounded-e-lg border border-l-0 h-8 px-2"
                    >
                      <PlusIcon className="w-3 h-3 text-gray-900 dark:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div className=" mb-12">
            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                <p>Impuestos</p>
                <p className="text-right text-base text-black dark:text-white">
                  $0<span className="ml-1 inline">COP</span>
                </p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Envío</p>
                <p className="text-right">Se calcula en la órden</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Total</p>
                <p className="text-right text-base text-black dark:text-white">
                  $50.000<span className="ml-1 inline">COP</span>
                </p>
              </div>
            </div>
            <Button className="w-full">Hacer Pedido</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
