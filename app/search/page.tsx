import { cache } from "react";

import prisma from "@/lib/prisma";

import Pagination from "./components/Pagination";
import ProductGrid from "./components/ProductGrid";

export const metadata = {
  title: "Productos | Ático Mágico",
  description: "Busca productos en la tienda.",
};

export const revalidate = 3600;

const getAllProducts = cache(
  async ({
    searchValue,
    pageValue,
  }: {
    searchValue?: string;
    pageValue: number;
  }) => {
    return await prisma.products.findMany({
      where: {
        name: {
          contains: searchValue?.toUpperCase() || "",
        },
      },
      include: {
        images: true,
      },
      take: 20,
      skip: 20 * (Number(pageValue) - 1),
    });
  }
);

const getTotal = cache(async ({ searchValue }: { searchValue?: string }) => {
  return await prisma.products.count({
    where: {
      name: {
        contains: searchValue?.toUpperCase() || "",
      },
    },
  });
});

export default async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue, page } = searchParams as { [key: string]: string };
  const pageValue = Number(page) || 1;

  const allProducts = await getAllProducts({ searchValue, pageValue });
  const totalProducts = await getTotal({ searchValue });
  const totalPages = Math.ceil(totalProducts / 20);

  return (
    <>
      <div className="flex flex-row justify-between items-center py-2">
        <h1 className="text-lg font-bold">
          {searchValue ? `Busueda: '${searchValue}'` : "Todos los productos"}
        </h1>

        <span className="text-sm text-gray-500">
          Mostrando de {20 * (Number(pageValue) - 1) + 1} a{" "}
          {20 * (Number(pageValue) - 1) + allProducts?.length}
        </span>
      </div>

      <ProductGrid products={allProducts} />
      <Pagination page={pageValue} totalPages={totalPages} path="/search" />
    </>
  );
}
