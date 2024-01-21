import ProductCard from "@/components/products/productCard/ProductCard";
import prisma from "@/lib/prisma";
import Pagination from "./components/Pagination";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
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
        contains: searchValue,
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
        contains: searchValue,
      },
    },
  });
  const totalPages = Math.ceil(totalProducts / 20);

  return (
    <>
      <div className="flex flex-row justify-between items-center py-2">
        <h1 className="text-lg font-bold capitalize">
          Todos los productos ({totalProducts})
        </h1>

        <span className="text-sm text-gray-500">
          Mostrando de {20 * (Number(pageValue) - 1) + 1} a{" "}
          {20 * (Number(pageValue) - 1) + allProducts?.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination page={pageValue} totalPages={totalPages} path="/search" />
    </>
  );
}
