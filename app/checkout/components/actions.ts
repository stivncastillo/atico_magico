'use server';

import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

import { orderEmailAdmin } from "@/components/emails/order/admin";
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


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail =  async ({to, order, from = process.env.EMAIL_FROM ?? ''}: SendEmailData) => {
  const payload = {
    from: from,
    subject: `Tu orden ${order.orderNumber} ha sido creada`,
    text: `Tu orden ${order.orderNumber} ha sido creada`,
  }

  const { data, error } = await resend.emails.send({
    ...payload,
    to: [to],
    react: OrderEmail({ order }),
  });

  console.log("Email client sent: ", data, error);

  const { data: dataAdmin, error: errorAdmin } = await resend.emails.send({
    ...payload,
    to: [process.env.EMAIL_CC ?? ''],
    subject: `${process.env.NODE_ENV === "development" ? '[PRUEBA] - ':  ''}Nueva Orden ${order.orderNumber} ha sido creada`,
    text: orderEmailAdmin({order}),
  });

  console.log("Email admin sent: ", dataAdmin, errorAdmin);

  if (error || errorAdmin) {
    return {
      message: 'Error enviando el correo',
      error: true
    }
  }

  console.log("Email sent: ", data, dataAdmin);
};

const saveOrder = async (prevState: any, data: OrderData) => {
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

export default saveOrder;