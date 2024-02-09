/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";

import { Suspense, cache } from "react";

import Image from "next/image";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/buttons/AddToCartButton";
import GuaranteePolicy from "@/components/feedback/guaranteePolicy";
import ProductGridSkeleton from "@/components/feedback/productGridSkeleton";
import ImageSlider from "@/components/products/productCard/ImageSlider";
import { getBadge } from "@/components/products/productCard/ProductCard";
import { Badge } from "@/components/ui/badge";
import { BADGE_PRODUCTS } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { capitalize, formatCOP } from "@/lib/utils";

import RelatedProducts from "./components/relatedProducts";

const getProduct = cache(async (slug: string) => {
  return await prisma.products.findFirst({
    where: {
      slug,
    },
  });
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  return {
    title: `${capitalize(product.name)} | Ático Mágico`,
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
  const badge = getBadge(product);

  return (
    <main className="main-container flex min-h-screen flex-col justify-start pt-8">
      <section className=" font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-8 md:mb-24 -mx-4">
            <div className="w-full md:px-4 mb-8 md:w-1/2 md:mb-0">
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
            <div className="w-full md:px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  {badge && (
                    <Badge
                      className="mb-2"
                      variant={BADGE_PRODUCTS[badge].color}
                    >
                      {BADGE_PRODUCTS[badge].text}
                    </Badge>
                  )}
                  <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                    {product.name}
                  </h2>

                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>{formatCOP(product.price)}</span>
                  </p>
                </div>
                <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Descripción
                  </span>
                  <p className="mt-2 text-base text-gray-800 dark:text-blue-200">
                    {product.description}
                  </p>

                  <GuaranteePolicy />
                </div>
                <div className="mb-6 "></div>
                <div className="flex flex-row md:mb-6">
                  <AddToCartButton
                    product={product}
                    size="xl"
                    disabled={product.outOfStock}
                  />
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
