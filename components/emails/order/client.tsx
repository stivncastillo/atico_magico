/* eslint-disable @next/next/no-img-element */
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
    <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
      <header>
        <a href="https://aticomagico.com">
          <img className="w-auto h-10 sm:h-8" src="/logo.png" alt="" />
        </a>
      </header>

      <main className="mt-8">
        <h2 className="text-gray-700 dark:text-gray-200 mb-4">
          Hola {order.name}, Tu orden{" "}
          <span className="font-semibold ">#{order.orderNumber}</span> ha sido
          creada.
        </h2>

        <h2 className=" text-lg font-bold">Detalles de contacto</h2>
        <div className="ml-4 mb-4">
          <p>
            <strong>Nombre:</strong> {order.name}
          </p>
          <p>
            <strong>Teléfono:</strong> {order.phone}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Dirección:</strong> {order.address} {order.complement},{" "}
            {order.department}, {order.city}
          </p>
          {order.notes && (
            <p>
              <strong>Notas:</strong> {order.notes}
            </p>
          )}
        </div>

        <h2 className=" text-lg font-bold">Productos</h2>

        <ul className=" list-disc pl-4">
          {order.cart.details.map((detail) => (
            <li key={detail.product.id}>
              {detail.product.name} (X{detail.quantity})
            </li>
          ))}
        </ul>

        <a
          href={`https://aticomagico.com/order/${order.orderIdentifier}`}
          className="inline-block px-6 py-4 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 focus:ring-opacity-80"
        >
          Ver Orden #{order.orderNumber}
        </a>

        <p className="mt-8 text-gray-600 dark:text-gray-300">
          Gracias, <br />
          Equipo de Ático Mágico
        </p>
      </main>

      <footer className="mt-8">
        <p className="text-gray-500 dark:text-gray-400">
          <span className=" font-bold">NOTA: </span>Nuestro equipo se comunicará
          vía Whatsapp para coordinar el pago de la orden y el envío de los
          productos. Si en las próximas 24 horas no nos hemos comunicado con
          usted puede enviarnos un mensaje a nuestro Whatsapp{" "}
          <a
            className=" text-primary-500 font-bold"
            href={`https:/wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
          >
            {process.env.NEXT_PUBLIC_PHONE_NUMBER}
          </a>
        </p>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          © Ático Mágico. 2024
        </p>
      </footer>
    </section>
  );
};

export default OrderEmailClient;
