import prisma from "@/lib/prisma";

import Pagination from "./components/Pagination";
import ProductGrid from "./components/ProductGrid";

export const metadata = {
  title: "Productos | Ático Mágico",
  description: "Busca productos en la tienda.",
};

export default async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue, page } = searchParams as { [key: string]: string };
  const pageValue = Number(page) || 1;

  const allProducts = await prisma?.products.findMany({
    where: {
      name: {
        search: searchValue.toUpperCase(),
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
      name: {
        search: searchValue.toUpperCase(),
      },
    },
  });
  const totalPages = Math.ceil(totalProducts / 20);

  return (
    <>
      <div className="flex flex-row justify-between items-center py-2">
        <h1 className="text-lg font-bold">
          Todos los productos ({totalProducts})
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
