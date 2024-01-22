"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import { XIcon } from "lucide-react";

interface SearchInputProps {}

const SearchInput: React.FC<SearchInputProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams?.get("q");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams?.toString());

    if (search.value) {
      newParams.delete("page");
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
      newParams.delete("page");
    }

    router.push(createUrl("/search", newParams));
  };

  const resetSearch = () => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.delete("q");
    router.push(createUrl("/search", newParams));
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative">
        <Input
          type="text"
          key={searchValue ?? ""}
          name="search"
          placeholder="Buscar productos..."
          autoComplete="off"
          defaultValue={searchValue ?? ""}
          className="w-full"
        />
        {searchValue && (
          <button
            type="button"
            onClick={resetSearch}
            className="absolute right-3 top-3"
          >
            <XIcon className=" text-gray-400 h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchInput;
