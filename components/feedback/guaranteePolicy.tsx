"use client";
import React, { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface GuaranteePolicyProps {}

const GuaranteePolicy: React.FC<GuaranteePolicyProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" my-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex items-center justify-between space-x-4">
          <h4 className="text-sm font-semibold">
            Politicas de garantia, cambios y causales para devolucion.
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}

              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-4 text-sm">
          <ol className=" list-decimal pl-4">
            <li>
              PEDIDO INCOMPLETO: Que solicites mas de una unidad y te llegue
              solo una.
            </li>
            <li>
              MALFUNCIONAMIENTO: Que no cumpla con tus expectativas con respecto
              a lo que se te ofrece o que el mismo tenga algún defecto mas no
              por mal uso.
            </li>
            <li>
              PRODUCTO ROTO: Que el producto te llegue roto ya sea por mal
              embalaje o mal trato de la transportadora
            </li>
            <li>
              PRODUCTO EQUIVOCADO: Que enviemos algo diferente a lo que nos
              solicitas.
            </li>
          </ol>

          <p>
            Tienes un plazo máximo para reportar el causal de garantía de los
            numeros 1, 3 y 4 de 5 días.
          </p>
          <p className=" font-bold">
            Tener en cuenta que a la hora de tener alguna garantía se debe
            enviar una buena evidencia como fotos y videos mostrando claramente
            cuál es el daño o inconformidad con el producto y a la hora de
            devolver el producto se debe enviar con todas sus piezas y un buen
            embalaje.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default GuaranteePolicy;
