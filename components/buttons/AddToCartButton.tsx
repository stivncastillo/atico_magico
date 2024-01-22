"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Loader2Icon, ShoppingBagIcon } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { addItem } from "../cart/actions";
import { products } from "@prisma/client";
import { useToast } from "../ui/use-toast";

type Size = "sm" | "default" | "lg" | "xl";

interface AddToCartButtonProps {
  product: products;
  size?: Size;
}

const SubmitButton: React.FC<{ size: Size }> = ({ size }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="group w-full"
      size={size}
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      disabled={pending}
    >
      {pending ? (
        <Loader2Icon className="animate-spin h-4 w-4 mr-2" />
      ) : (
        <ShoppingBagIcon className="h-4 w-4 mr-2 group-hover:animate-bounce" />
      )}
      Agregar al Carrito
    </Button>
  );
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  size = "default",
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
      <SubmitButton size={size} />
    </form>
  );
};

export default AddToCartButton;
