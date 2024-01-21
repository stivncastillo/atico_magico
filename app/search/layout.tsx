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
      <div className="grid grid-cols-5 gap-4">
        <aside className="col-span-1 p-4">
          <h2 className="font-bold mb-4">Categorias</h2>
          <Filters categories={categories} />
        </aside>

        <section className="col-span-4 mb-8">{children}</section>
      </div>
    </main>
  );
}
