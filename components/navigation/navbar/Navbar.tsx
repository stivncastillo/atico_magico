import React, { Suspense } from "react";

import Image from "next/image";

import Cart from "@/components/cart/Cart";

import NavigationMenu from "./NavigationMenu";
import SearchInput from "./SearchInput";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = async () => {
  const categories = await prisma?.categories.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="border-b">
      <div className="main-container flex justify-between">
        <div className="flex flex-1 h-16 items-center px-4">
          <div className="w-16 md:w-20">
            <Image
              src="/logo.png"
              width={489}
              height={300}
              alt="Ático Mágico Logo"
              className="w-16 md:w-20"
              priority
            />
          </div>
          <NavigationMenu categories={categories} />
        </div>
        <div className="hidden md:flex flex-1 ml-auto items-center space-x-4">
          <SearchInput />
        </div>
        <div className="flex flex-1 ml-auto items-center space-x-4 justify-end">
          <div className=" ">
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
