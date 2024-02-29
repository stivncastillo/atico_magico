import type { NextApiRequest, NextApiResponse } from 'next'

import {sendEmail} from '@/app/checkout/components/actions';
import prisma from '@/lib/prisma';


type ResponseData = {
  message: string
}
interface Image {
  image_url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {query} = req;

  try {
    if (process.env.NODE_ENV !== 'development') {
      return res.status(200).json({ message: 'This endpoint is disabled in production' });
    }

    if (!query.id) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const order = await prisma.order.findUnique({
      where: {
        orderIdentifier: query.id as string
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
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    sendEmail({
      to: order.email,
      order
    });

    res.status(200).json({ message: 'Emails has been sent' })
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` })
  }
}
