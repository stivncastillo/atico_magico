/* eslint-disable react/no-unescaped-entities */
import React from "react";

export const metadata = {
  title: "Términos y Condiciones | Ático Mágico",
  description:
    "Somos una tienda virtual de ventas y novedades, con productos de alta calidad y a los mejores precios.",
};

export default function Terms() {
  return (
    <main className="main-container flex min-h-screen flex-col justify-start pt-8">
      {/* terms and conditions */}
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">
          Términos y Condiciones de Compra en "Ático Mágico"
        </h1>
        <ol className="list-decimal space-y-4 pl-4">
          <li>
            <h3 className="mb-2 font-bold">Ámbito de Aplicación:</h3>
            <p>
              Estos términos y condiciones rigen la relación entre "Ático
              Mágico" y sus clientes al realizar compras a través de la página
              web.
            </p>
          </li>
          <li>
            <h3 className="mb-2 font-bold">Proceso de Compra:</h3>
            <ol className="list-decimal space-y-2 pl-4">
              <li>
                El cliente selecciona los productos deseados y los agrega al
                carrito de compras.
              </li>
              <li>
                Al dirigirse al checkout, el cliente completa el formulario de
                contacto y dirección de envío.
              </li>
              <li>
                El pedido se realiza exclusivamente para ciudades en Colombia y
                está sujeto a disponibilidad, ya que se produce bajo encargo.
              </li>
              <li>
                El proceso de pago se finaliza a través de WhatsApp, donde se
                proporciona un número válido de WhatsApp para completar la
                transacción.
              </li>
            </ol>
          </li>
          <li>
            <h3 className="mb-2 font-bold">Pago y Medios de Pago:</h3>
            <ol className="list-decimal space-y-2 pl-4">
              <li>
                Los medios de pago habilitados son Nequi, Daviplata, Davivienda
                y Bancolombia.
              </li>
              <li>
                El cliente se compromete a realizar el pago correspondiente
                mediante el medio seleccionado durante el proceso de compra.
              </li>
            </ol>
          </li>
          <li>
            <h3 className="mb-2 font-bold">Garantía y Devoluciones:</h3>
            <ol className="list-decimal space-y-2 pl-4">
              <li>
                La garantía de los productos es de 1 mes a partir de la fecha de
                entrega.
              </li>
              <li>
                En caso de devolución, el proceso de cambio puede tardar entre 3
                y 5 días hábiles.
              </li>
              <li>
                La devolución se realizará conforme a las políticas establecidas
                en nuestra política de devoluciones.
              </li>
            </ol>
          </li>
          <li>
            <h3 className="mb-2 font-bold">Envío:</h3>
            <ol className="list-decimal space-y-2 pl-4">
              <li>El envío se realiza exclusivamente dentro de Colombia.</li>
              <li>
                El tiempo de entrega puede variar según la disponibilidad del
                producto y la ubicación del cliente.
              </li>
            </ol>
          </li>
          <li>
            <h3 className="mb-2 font-bold">Responsabilidad del Cliente:</h3>
            <p>
              El cliente es responsable de proporcionar información precisa y
              actualizada durante el proceso de compra, incluyendo datos de
              contacto y dirección de envío.
            </p>
          </li>
          <li>
            <h3 className="mb-2 font-bold">Privacidad y Seguridad:</h3>
            <p>
              Los datos proporcionados por el cliente se manejan según nuestra
              política de privacidad. Nos comprometemos a proteger la
              información personal del cliente.
            </p>
          </li>
          <li>
            <h3 className="mb-2 font-bold">
              Modificaciones y Actualizaciones:
            </h3>
            <p>
              "Ático Mágico" se reserva el derecho de realizar modificaciones y
              actualizaciones a estos términos y condiciones. Los cambios
              entrarán en vigencia una vez publicados en la página web.
            </p>
          </li>
          <li>
            <h3 className="mb-2 font-bold">Ley Aplicable:</h3>
            <p>
              Estos términos y condiciones se rigen por las leyes de Colombia.
            </p>
          </li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-2">Contacto</h2>
        <p>
          Para cualquier consulta relacionada con estos términos y condiciones,
          puedes contactarnos a través de{" "}
          <a
            href="mailto:aticomagicoparati@gmail.com"
            className="text-primary-500 hover:underline"
          >
            aticomagicoparati@gmail.com
          </a>{" "}
          o mediante el número de WhatsApp proporcionado durante el proceso de
          compra.
        </p>
        <p className="mt-8">
          Al realizar una compra en "Ático Mágico", el cliente acepta y se
          compromete a cumplir con estos términos y condiciones.
        </p>
      </div>
    </main>
  );
}
