import { Metadata } from "next";

import { cache } from "react";

import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { capitalize } from "@/lib/utils";

import Pagination from "../components/Pagination";
import ProductGrid from "../components/ProductGrid";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  let category = await prisma.categories.findFirst({
    where: {
      slug: params.category,
    },
  });

  if (params.category === "nuevos") {
    category = {
      id: 0,
      name: "Nuevos",
      slug: "nuevos",
      createdAt: new Date(),
    };
  }

  if (!category) return notFound();

  return {
    title: `${capitalize(category.name)} | Ático Mágico`,
    description: `Productos de ${category.name}`,
  };
}

export const revalidate = 3600;

const getProducts = cache(
  async ({ slug, pageValue }: { slug: string; pageValue: number }) => {
    const where =
      slug === "nuevos" ? { newProduct: true } : { category: { slug } };
    console.log("👻 ~ where:", where);
    return await prisma?.products.findMany({
      where,
      include: {
        images: true,
      },
      take: 20,
      skip: 20 * (Number(pageValue) - 1),
    });
  }
);

const getTotal = cache(async ({ slug }: { slug: string }) => {
  const where =
    slug === "nuevos" ? { newProduct: true } : { category: { slug } };
  return await prisma?.products.count({
    where,
  });
});

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { page } = searchParams as { [key: string]: string };
  const pageValue = Number(page) || 1;

  const allProducts = await getProducts({ slug: params.category, pageValue });

  const totalProducts = await getTotal({ slug: params.category });
  const totalPages = Math.ceil(totalProducts / 20);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center py-2 mb-4 md:mb-0">
        <h1 className="text-lg font-bold capitalize">
          Categoría: {params.category} ({totalProducts})
        </h1>

        <span className="text-sm text-gray-500">
          Mostrando de {20 * (Number(pageValue) - 1) + 1} a{" "}
          {20 * (Number(pageValue) - 1) + allProducts?.length}
        </span>
      </div>

      <ProductGrid products={allProducts} />
      <Pagination
        page={pageValue}
        totalPages={totalPages}
        path={`/search/${params.category}`}
      />
    </>
  );
}
