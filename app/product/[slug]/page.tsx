/* eslint-disable @next/next/no-img-element */
import ImageSlider from "@/components/products/productCard/ImageSlider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { formatCOP } from "@/lib/utils";
import { ShoppingBagIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import RelatedProducts from "./components/relatedProducts";
import { Suspense } from "react";
import ProductGridSkeleton from "@/components/skeleton/productGridSkeleton";
import NumberPicker from "@/components/form/NumberPicker";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await prisma.products.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (!product) return notFound();

  return {
    title: `${product.name}`,
    description: `${product.description}`,
  };
}

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.products.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      images: true,
    },
  });

  if (!product) return notFound();

  return (
    <main className="main-container flex min-h-screen flex-col justify-start pt-8">
      <section className="py-10 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              {product.images.length > 1 ? (
                <ImageSlider
                  images={product.images.map((image) => image.url)}
                  productName={product.name}
                  size="lg"
                />
              ) : (
                <Image
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-[450px] object-cover rounded-t-md hover:scale-110 duration-150"
                  width={499}
                  height={440}
                  priority
                />
              )}
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <Badge className="mb-2" variant="info">
                    Nuevo
                  </Badge>
                  <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                    {product.name}
                  </h2>

                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>{formatCOP(product.price)}</span>
                    <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                      {formatCOP(product.price * 1.2)}
                    </span>
                  </p>
                </div>
                <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Descripción
                  </span>
                  <p className="mt-2 text-base text-gray-800 dark:text-blue-200">
                    {product.description}
                  </p>
                </div>
                <div className="mb-6 "></div>
                <div className="flex justify-between flex-wrap items-center mb-6">
                  <NumberPicker size="lg" />

                  <Button className="group" size="lg">
                    <ShoppingBagIcon className="h-4 w-4 mr-2 group-hover:animate-bounce" />{" "}
                    Agregar al Carrito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-bold mb-4 uppercase">Productos Relacionados</h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          <RelatedProducts
            categoryId={product.categoryId}
            currentProductId={product.id}
          />
        </Suspense>
      </section>
    </main>
  );
}
