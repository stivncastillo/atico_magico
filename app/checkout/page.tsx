import { cookies } from "next/headers";

import ProductCart from "@/components/products/productCart/ProductCart";
import prisma from "@/lib/prisma";
import { formatCOP } from "@/lib/utils";

import OrderForm from "./components/OrderForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout | Ático Mágico",
};

export default async function Checkout() {
  const cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await prisma.cart.findUnique({
      where: {
        cartIdentifier: cartId,
      },
      include: {
        details: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
  }

  const total =
    cart?.details.reduce(
      (acc, detail) => acc + detail.product.price * detail.quantity,
      0
    ) || 0;

  const departmentsFetch = await fetch(
    "https://api-colombia.com/api/v1/Department"
  );
  const departments = await departmentsFetch.json();

  return (
    <main className="main-container flex min-h-[calc(100vh_-_180px)] flex-col justify-start">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <OrderForm departments={departments} cart={cart} />

        {/* Product list */}
        <div className="md:pl-4 pt-8">
          <div className=" sticky top-0">
            <h2 className="text-2xl font-bold">Resumen</h2>
            {/* TODO: suspense */}
            {cart ? (
              <ul className="flex-1 flex flex-col overflow-auto">
                {cart?.details.map((detail) => (
                  <li className=" border-b py-4" key={detail.id}>
                    <ProductCart detail={detail} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay productos en el carrito</p>
            )}

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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
