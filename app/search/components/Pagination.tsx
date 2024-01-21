"use client";
import React from "react";
import { createUrl } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  path: string;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, path }) => {
  console.log("👻 ~ path:", path);
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center mt-8">
      <Button
        disabled={page === 1}
        className=""
        variant="outline"
        size="icon"
        onClick={() => {
          const newParams = new URLSearchParams(searchParams?.toString());
          newParams.set("page", String(page - 1));
          router.push(createUrl(path, newParams));
        }}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        disabled={page === totalPages}
        className=""
        variant="outline"
        size="icon"
        onClick={() => {
          const newParams = new URLSearchParams(searchParams?.toString());
          newParams.set("page", String(page + 1));
          router.push(createUrl(path, newParams));
        }}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
