import ProductCart from "@/components/products/productCart/ProductCart";
import prisma from "@/lib/prisma";
import { formatCOP } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function Order({ params }: { params: { slug: string } }) {
  const order = await prisma.order.findFirst({
    where: {
      orderIdentifier: params.slug,
    },
    include: {
      cart: {
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
      },
    },
  });

  if (!order) return notFound();

  return (
    <main className="main-container flex min-h-screen flex-col justify-start pt-8">
      <div className="border-b border-gray-100 py-4 mb-4">
        <p className=" text-primary-500">Gracias!</p>
        <h1 className=" text-2xl font-bold">
          Tu Órden #{order.orderNumber} ha sido creada con éxito
        </h1>
        <span className="text-sm text-gray-500">
          Hemos hemos recibido tu órden, estaremos comunicandonos con usted muy
          pronto por medio de Whatsapp o Correo electrónico
        </span>
      </div>

      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Detalle de la Orden
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Nombre
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {order.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Dirección
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {order.address} / {order.complement}, {order.city} (
                {order.department})
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Correo Electrónico
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {order.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Teléfono
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {order.phone}
              </dd>
            </div>
            {order.notes && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Notas
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {order.notes}
                </dd>
              </div>
            )}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Productos ({order.cart?.details.length})
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {order.cart ? (
                  <ul className="flex-1 flex flex-col overflow-auto">
                    {order.cart?.details.map((detail) => (
                      <li className=" border-b py-4" key={detail.id}>
                        <ProductCart detail={detail} withActions={false} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay productos en el carrito</p>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Total a Pagar
              </dt>
              <dd className="mt-1 text-sm text-right leading-6 text-gray-700 sm:col-span-2 sm:mt-0 font-bold">
                {formatCOP(order.total)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
