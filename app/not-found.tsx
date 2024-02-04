import React from "react";

import { InfoIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <section className="bg-white dark:bg-gray-900 flex flex-col ">
      <div className="flex items-center px-6 mx-auto min-h-[calc(100vh_-_180px)]">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-primary-500 rounded-full bg-primary-50 dark:bg-gray-800">
            <InfoIcon className="h-6 w-6" />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Ups! No encontramos esta página.
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            La página que estás buscando no existe
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Link href="/">
              <Button variant="default">Ir al Inicio</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
