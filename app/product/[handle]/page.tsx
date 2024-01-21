import ProductCard from "@/components/products/productCard/ProductCard";

export const metadata = {
  title: "Product",
  description: "Search for products in the store.",
};

export default function Product({ params }: { params: { handle: string } }) {
  return (
    <main className="main-container flex min-h-screen flex-col justify-start pt-8">
      <h1>Product</h1>
    </main>
  );
}
