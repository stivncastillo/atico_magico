"use client";

import React from "react";

import { cartDetails } from "@prisma/client";
import { Loader2Icon, MinusIcon, PlusIcon } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

import { updateItemQuantity } from "./actions";

interface EditQtyButtonProps {
  type: "minus" | "plus";
  detail: cartDetails;
}

const EditQtyButton: React.FC<EditQtyButtonProps> = ({ type, detail }) => {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    detailId: detail.id,
    quantity: type === "plus" ? detail.quantity + 1 : detail.quantity - 1,
  };

  const actionUpdate = formAction.bind(null, payload);

  return (
    <form action={actionUpdate}>
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
};

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      id="decrement-button"
      data-input-counter-decrement="quantity-input"
      className="px-2 flex items-center"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
    >
      {pending ? (
        <Loader2Icon className="text-gray-900 dark:text-white h-4 w-4 animate-spin" />
      ) : type === "minus" ? (
        <MinusIcon className={`text-gray-900 dark:text-white h-4 w-4`} />
      ) : (
        <PlusIcon className={`text-gray-900 dark:text-white h-4 w-4`} />
      )}
    </button>
  );
}

export default EditQtyButton;
