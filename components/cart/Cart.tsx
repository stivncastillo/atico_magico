import React from "react";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import CartDrawer from "./CartDrawer";

interface CartProps {}

const Cart: React.FC<CartProps> = async () => {
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

  return <CartDrawer cart={cart} />;
};

export default Cart;
