import { Prisma } from "@prisma/client";

import { formatCOP, formatDate } from "@/lib/utils";

interface OrderEmailAdminProps {
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

export const orderEmailAdmin = ({order}: OrderEmailAdminProps) => (
  `
  Cédula: ${order.dni}
  Teléfono: ${order.phone}
  Notas: ${order.notes}
  Link: https://aticomagico.com/order/${order.orderIdentifier}

  COPY----------
  🌟 ¡Hola ${order.name}!
  ¡Es un placer confirmar tu pedido con nosotros! 🛍️ Aquí tienes los detalles:
  Pedido No.: ${order.orderNumber}
  Fecha de Pedido: ${formatDate(new Date(order.createdAt))}

  Productos:
  ${order.cart.details.map(detail => (`* ${detail.product.name} (X${detail.quantity}) ${formatCOP(detail.product.price * detail.quantity)}\n`))}
  Total: ${formatCOP(order.total)}

  Dirección de Envío:
  ${order.address} ${order.complement} , ${order.department}, ${order.city}

  Método de Pago:
  ${process.env.NEXT_PUBLIC_PAYMENT_1}
  ${process.env.NEXT_PUBLIC_PAYMENT_2}

  Una vez realices el pago, envíanos el comprobante de la transferencia.

  Fecha Estimada de Entrega: de 3 a 7 días después de confirmar el pago.

  ✨ ¡Gracias por elegirnos! Tu satisfacción es nuestra prioridad. Estamos trabajando arduamente para preparar tu pedido y te notificaremos cuando se envíe.
  📦 Estado del Pedido:
  En Preparación

  💬 ¿Alguna pregunta o solicitud especial? No dudes en decírnoslo. Queremos asegurarnos de que tu experiencia sea perfecta.
  🙏 Agradecemos tu confianza en nosotros. ¡Esperamos que disfrutes de tú compra!
  ¡Nos vemos pronto!
  Atico Magico
  ${process.env.NEXT_PUBLIC_PHONE_NUMBER}
  aticomagicoparati@gmail.com
  ¡Síguenos!
  Instagram: https://www.instagram.com/aticomagico.ventas/
  Facebook: https://www.facebook.com/profile.php?id=61555341675125`
)