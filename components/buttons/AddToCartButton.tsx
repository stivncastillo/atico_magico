"use client";
import React, { useEffect } from "react";

import { products } from "@prisma/client";
import { Loader2Icon, ShoppingBagIcon } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

import { addItem } from "../cart/actions";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

type Size = "sm" | "default" | "lg" | "xl";

interface AddToCartButtonProps {
  product: products;
  size?: Size;
  disabled?: boolean;
}

const SubmitButton: React.FC<{ size: Size; disabled?: boolean }> = ({
  size,
  disabled,
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="group w-full"
      size={size}
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      disabled={pending || disabled}
    >
      {pending ? (
        <Loader2Icon className="animate-spin h-4 w-4 mr-2 hidden md:block" />
      ) : (
        <ShoppingBagIcon className="h-4 w-4 mr-2 group-hover:animate-bounce hidden md:block" />
      )}
      {disabled ? "Agotado" : "Agregar al Carrito"}
    </Button>
  );
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  size = "default",
  disabled,
}) => {
  const { toast } = useToast();
  const [state, formAction] = useFormState(addItem, null);
  const actionWithVariant = formAction.bind(null, product.id);

  useEffect(() => {
    if (state) {
      toast({
        title: state.message,
        variant: state.error ? "destructive" : "success",
      });
    }
  }, [toast, state]);

  return (
    <form action={actionWithVariant} className="w-full">
      <SubmitButton size={size} disabled={disabled} />
    </form>
  );
};

export default AddToCartButton;
