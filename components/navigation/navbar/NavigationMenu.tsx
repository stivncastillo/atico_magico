"use client";
import React from "react";
import {
  NavigationMenu as NacigationMenuPkg,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Prisma } from "@prisma/client";

interface NavigationMenuProps {
  categories?: Array<Prisma.categoriesGetPayload<{}>>;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ categories }) => {
  return (
    <NacigationMenuPkg>
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
    </NacigationMenuPkg>
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
            <div className="text-sm font-medium leading-none capitalize">
              {children}
            </div>
          </a>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
