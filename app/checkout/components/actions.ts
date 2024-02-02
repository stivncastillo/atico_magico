'use server';

import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

import OrderEmail from "@/components/emails/order/client";
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

type SendEmailData = {
  to: string;
  from?: string;
  order: Prisma.orderGetPayload<{
    include: {
      cart: {
        include: {
          details: {
            include: {
              product: true;
            };
          };
        };
      };
    };
  }>;
}

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
      },
      include: {
        cart: {
          include: {
            details: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });

    cookies().delete('cartId');

    sendEmail({
      to: order.email,
      order
    });

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


const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail =  async ({to, from = process.env.EMAIL_FROM ?? '', order}: SendEmailData) => {
  const { data, error } = await resend.emails.send({
    from: from,
    to: [to, process.env.EMAIL_CC ?? ''],
    subject: `Tu orden ${order.orderNumber} ha sido creada`,
    text: `Tu orden ${order.orderNumber} ha sido creada`,
    react: OrderEmail({ order }),
  });

  if (error) {
    return {
      message: 'Error enviando el correo',
      error: true
    }
  }

  console.log("Email sent: ", data);
};

export default sendEmail;