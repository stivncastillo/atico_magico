"use client";
import React from "react";

import { Prisma } from "@prisma/client";
import Link from "next/link";

import {
  NavigationMenu as NavigationMenuPkg,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavigationMenuProps {
  categories?: Array<Prisma.categoriesGetPayload<{}>>;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ categories }) => {
  return (
    <NavigationMenuPkg>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Inicio
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {categories && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className=" min-w-[300px]">
                <NavigationMenuItemComp href="/search">
                  Todos
                </NavigationMenuItemComp>
                <NavigationMenuItemComp href="/search/nuevos">
                  Nuevos{" "}
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                </NavigationMenuItemComp>
                {categories?.map((category) => (
                  <NavigationMenuItemComp
                    href={`/search/${category.slug}`}
                    key={category.id}
                  >
                    {category.name.toLowerCase()}
                  </NavigationMenuItemComp>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenuPkg>
  );
};

export default NavigationMenu;

const NavigationMenuItemComp = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href} legacyBehavior passHref>
          <a className="block select-none p-3 leading-none outline-none transition-colors hover:bg-primary-100 hover:underline focus:bg-accent focus:text-accent-foreground">
            <div className="flex flex-row items-center gap-2 text-sm font-medium leading-none capitalize">
              {children}
            </div>
          </a>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
