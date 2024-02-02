import React from "react";

import { Prisma } from "@prisma/client";

interface OrderEmailClientProps {
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

const OrderEmailClient: React.FC<OrderEmailClientProps> = ({ order }) => {
  return (
    <div>
      <h1>Tu orden #{order.orderNumber} ha sido creada</h1>
      <hr />
      <h2>Detalles de contacto</h2>
      <p>Nombre: {order.name}</p>
      <p>Teléfono: {order.phone}</p>
      <p>Email: {order.email}</p>
      <p>
        Dirección: {order.address} {order.complement}, {order.department},{" "}
        {order.city}
      </p>
      <p>Notas: {order.notes}</p>

      <h2>Productos:</h2>
      <ul>
        {order.cart.details.map((detail) => (
          <li key={detail.product.id}>
            {detail.product.name} x {detail.quantity}
          </li>
        ))}
      </ul>

      <h2>Total: ${order.total}</h2>
      <hr />
      <p>
        Gracias por tu compra, nuestro equipo se comunicará vía Whatsapp para el
        pago de la orden y el envío.
      </p>
    </div>
  );
};

export default OrderEmailClient;
