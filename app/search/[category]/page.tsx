import { Metadata } from "next";

import { notFound } from "next/navigation";

import ProductCard from "@/components/products/productCard/ProductCard";
import prisma from "@/lib/prisma";
import { capitalize } from "@/lib/utils";

import Pagination from "../components/Pagination";
import ProductGrid from "../components/ProductGrid";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = await prisma.categories.findFirst({
    where: {
      slug: params.category,
    },
  });

  if (!category) return notFound();

  return {
    title: `${capitalize(category.name)} | Ático Mágico`,
    description: `Productos de ${category.name}`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { page } = searchParams as { [key: string]: string };
  const pageValue = Number(page) || 1;

  const allProducts = await prisma?.products.findMany({
    where: {
      category: {
        slug: params.category,
      },
    },
    include: {
      images: true,
    },
    take: 20,
    skip: 20 * (Number(pageValue) - 1),
  });

  // total products
  const totalProducts = await prisma?.products.count({
    where: {
      category: {
        slug: params.category,
      },
    },
  });
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
