"use client";

import { removeItem } from "@/components/cart/actions";
import { useToast } from "@/components/ui/use-toast";
import { cartDetails } from "@prisma/client";
import { Loader2Icon, XIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface DeleteProductCartButtonProps {
  detail: cartDetails;
}

const DeleteProductCartButton: React.FC<DeleteProductCartButtonProps> = ({
  detail,
}) => {
  const { toast } = useToast();
  const [state, formAction] = useFormState(removeItem, null);
  const detailId = detail.id;
  const actionRemove = formAction.bind(null, detailId);

  useEffect(() => {
    if (state) {
      toast({
        title: state.message,
        variant: state.error ? "destructive" : "success",
      });
    }
  }, [toast, state]);

  return (
    <form action={actionRemove}>
      <SubmitButton />
    </form>
  );
};

export default DeleteProductCartButton;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Remove cart item"
      aria-disabled={pending}
      className="absolute hidden items-center justify-center -top-2 -right-2 h-5 w-5 bg-error-500 text-white rounded-full group-hover:flex"
    >
      {pending ? (
        <Loader2Icon className="animate-spin h-4 w-4" />
      ) : (
        <XIcon className="h-4 w-4" />
      )}
    </button>
  );
}
