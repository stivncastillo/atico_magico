'use server';

import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';

import prisma from "@/lib/prisma";

type OrderData = {
  name: string;
  dni: string;
  phone: string;
  email: string;
  department: string;
  city: string;
  address: string;
  complement: string;
  notes: string;
  cart: Prisma.cartGetPayload<{
    include: {
      details: {
        include: {
          product: true;
        };
      };
    };
  }>;
};

export const saveOrder = async (prevState: any, data: OrderData) => {
  const { cart, ...orderData } = data;
  const cartId = cart.cartIdentifier;
  const lastOrder = await prisma.order.findFirst({
    orderBy: {
      createdAt: 'desc'
    }
  });
  const total =
    cart?.details.reduce(
      (acc, detail) => acc + detail.product.price * detail.quantity,
      0
    ) || 0;

  if (!cartId) {
    return {
      message: 'Missing cart ID',
      error: true
    }
  }

  try {
    const order = await prisma.order.create({
      data: {
        orderIdentifier: uuidv4(),
        ...orderData,
        cartId,
        orderNumber: formatNumber(lastOrder ? lastOrder.id + 1 : 1),
        total
      }
    });

    cookies().delete('cartId');

    return {
      message: `Orden ${order.orderNumber} creada`,
      error: false,
      order
    }
  } catch (e) {
    return {
      message: 'Error creando una orden, intentelo más tarde',
      error: true
    }
  }
}

function formatNumber(num: number): string {
  const paddedNum = num.toString().padStart(4, '0');
  return paddedNum;
}
