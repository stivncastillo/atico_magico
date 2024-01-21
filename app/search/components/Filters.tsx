"use client";
import React from "react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

interface FiltersProps {
  categories?: Array<Prisma.categoriesGetPayload<{}>>;
}

const Filters: React.FC<FiltersProps> = ({ categories }) => {
  const selectedLayoutSegment = useSelectedLayoutSegment();

  return (
    <ul className="">
      <li>
        <Item name="Todos" href={`/search`} isActive={!selectedLayoutSegment} />
      </li>
      {categories?.map((category) => (
        <li key={category.id}>
          <Item
            name={category.name.toLowerCase()}
            href={`/search/${category.slug}`}
            isActive={selectedLayoutSegment === category.slug}
          />
        </li>
      ))}
    </ul>
  );
};

export default Filters;

const Item = ({
  href,
  isActive,
  name,
}: {
  href: string;
  isActive: boolean;
  name: string;
}) => (
  <Link
    href={href}
    className={`flex flex-row justify-between items-center w-full text-left capitalize py-1 px-2 hover:bg-primary-100 rounded ${
      isActive ? "text-primary-700 font-bold" : ""
    }`}
  >
    {name}
    {isActive && <ChevronRightIcon className="h-4 w-4 text-primary-700" />}
  </Link>
);
