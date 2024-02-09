/* eslint-disable react/no-unescaped-entities */
import React from "react";

export const metadata = {
  title: "Politica de privacidad y tratamiento de datos | Ático Mágico",
  description:
    "Somos una tienda virtual de ventas y novedades, con productos de alta calidad y a los mejores precios.",
};

export default function Privacy() {
  return (
    <main className="main-container flex min-h-screen flex-col justify-start pt-8">
      {/* terms and conditions */}
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-4">
          Política de Tratamiento de Datos - Ático Mágico
        </h1>

        <p className="mb-4">
          En Ático Mágico, valoramos y respetamos tu privacidad. Esta política
          describe cómo recopilamos, utilizamos y protegemos la información
          personal que nos proporcionas al utilizar nuestros servicios.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          1. Recopilación de Datos:
        </h2>
        <p className="mb-4">
          Recopilamos los siguientes datos al momento de realizar una compra:
          correo electrónico, nombre, teléfono, número de identificación y
          dirección de envío.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          2. Propósito del Tratamiento de Datos:
        </h2>
        <p className="mb-4">
          Los datos se recopilan con el fin de procesar pedidos y contactar al
          cliente durante el proceso de compra.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          3. Base Legal para el Tratamiento de Datos:
        </h2>
        <p className="mb-4">
          Al realizar un pedido, el usuario debe aceptar nuestros términos y
          nuestra política de datos, lo que constituye su consentimiento para el
          tratamiento de sus datos personales.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          4. Derechos de los Usuarios:
        </h2>
        <p className="mb-4">
          Los usuarios tienen derecho a acceder, rectificar, eliminar, limitar
          el procesamiento, portar y oponerse al tratamiento de sus datos
          personales.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          5. Seguridad de los Datos:
        </h2>
        <p className="mb-4">
          Implementamos medidas de seguridad, como la encriptación de datos y el
          acceso protegido por contraseña, para proteger la información personal
          de nuestros usuarios.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Retención de Datos:</h2>
        <p className="mb-4">
          Conservaremos los datos de los usuarios indefinidamente por motivos de
          facturación y estadísticas internas. Estarán disponibles para el
          usuario en cualquier momento a través de su cuenta.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          7. Transferencias Internacionales de Datos:
        </h2>
        <p className="mb-4">No transferimos datos personales a otros países.</p>

        <h2 className="text-xl font-semibold mb-2">8. Contacto:</h2>
        <p className="mb-4">
          Para ejercer tus derechos de privacidad o para cualquier pregunta
          relacionada con nuestra política de tratamiento de datos, contáctanos
          a través de nuestro correo electrónico:{" "}
          <a
            href="mailto:aticomagicoparati@gmail.com"
            className="text-blue-500"
          >
            aticomagicoparati@gmail.com
          </a>
          .
        </p>

        <p className="mb-4">
          Al utilizar nuestros servicios, aceptas esta política de tratamiento
          de datos. Nos reservamos el derecho de actualizar o modificar esta
          política en cualquier momento. Cualquier cambio será notificado a
          través de nuestros canales de comunicación.
        </p>

        <p className="mb-4">
          Fecha de última actualización: 08 de febrero de 2024
        </p>

        <p>¡Gracias por confiar en Ático Mágico!</p>
      </div>
    </main>
  );
}
