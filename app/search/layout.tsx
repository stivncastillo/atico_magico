import prisma from "@/lib/prisma";

import Filters from "./components/Filters";

export default async function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await prisma?.categories.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <main className="main-container flex min-h-screen flex-col justify-start pt-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <aside className="col-span-1 p-4 hidden md:block">
          <div className="md:sticky md:top-8">
            <h2 className="font-bold mb-4">Categorias</h2>
            <Filters categories={categories} />
          </div>
        </aside>

        <section className="col-span-4 mb-8">{children}</section>
      </div>
    </main>
  );
}
