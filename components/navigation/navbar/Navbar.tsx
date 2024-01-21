import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

import NavigationMenu from "./NavigationMenu";
import CartDrawer from "@/components/cart/CartDrawer";
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
          <div className=" w-20">
            <Image
              src="/logo.png"
              width={489}
              height={300}
              alt="Ático Mágico Logo"
              className="w-20"
              priority
            />
          </div>
          <NavigationMenu categories={categories} />
        </div>
        <div className="flex flex-1 ml-auto items-center space-x-4">
          <SearchInput />
        </div>
        <div className="flex flex-1 ml-auto items-center space-x-4 justify-end">
          <div className=" ">
            <CartDrawer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
