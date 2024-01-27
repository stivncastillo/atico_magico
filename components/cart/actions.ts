'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

import { TAGS_COOKIES } from '@/lib/constants';
import prisma from "@/lib/prisma";

export async function addItem(prevState: any, itemId: number) {
  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await prisma.cart.findUnique({
      where: {
        cartIdentifier: cartId
      },
      });
  }

  if (!cartId || !cart) {
    cart = await prisma.cart.create({
      data: {
        cartIdentifier: uuidv4(),
      } });

    cartId = cart.cartIdentifier;
    cookies().set('cartId', cartId);
  }


  try {
    const cartDetails = await prisma.cartDetails.findFirst({
      where: {
        cartId: cart.cartIdentifier,
        productId: itemId
      },
    });

    if (cartDetails) {
      await prisma.cartDetails.update({
        where: {
          id: cartDetails.id
        },
        data: {
          quantity: cartDetails.quantity + 1
        }
      });
    } else {
      await prisma.cartDetails.create({
        data: {
          cartId: cart.cartIdentifier,
          productId: itemId,
          quantity: 1
        }
      });
    }
    revalidateTag(TAGS_COOKIES.cart);
    return {
      message: "Item added to cart",
      error: false
    }
  } catch (e) {
    return {
      message: "Error adding item to cart",
      error: true
    };
  }
}

export async function removeItem(prevState: any, detailId: number) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return {
      message: 'Missing cart ID',
      error: true
    }
  }

  try {
    await prisma.cartDetails.delete({
      where: {
        id: detailId
      }
    });

    revalidateTag(TAGS_COOKIES.cart);
    return {
      message: 'Item removed from cart',
      error: false
    }
  } catch (e) {
    return {
      message: 'Error removing item from cart',
      error: true
    }
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    detailId: number;
    quantity: number;
  }
) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { detailId, quantity } = payload;

  try {
    if (quantity === 0) {
      await prisma.cartDetails.delete({
        where: {
          id: detailId
        }
      });
      revalidateTag(TAGS_COOKIES.cart);
      return;
    }

    await prisma.cartDetails.update({
      where: {
        id: detailId
      },
      data: {
        quantity
      }
    });
    revalidateTag(TAGS_COOKIES.cart);
  } catch (e) {
    return 'Error updating item quantity';
  }
}