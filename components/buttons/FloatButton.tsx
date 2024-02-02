import React from "react";

import { FaWhatsapp } from "react-icons/fa";

import { Button } from "../ui/button";

interface FloatButtonProps {}

const FloatButton: React.FC<FloatButtonProps> = () => {
  return (
    <div className="group fixed bottom-4 right-4 z-10">
      <Button
        size="icon"
        variant="success"
        className="relative h-14 w-14 rounded-full"
      >
        <span className="absolute hidden group-hover:block -left-32">
          ¿Necesitas ayuda?
        </span>
        <a
          href={`https:/wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
          target="_blank"
        >
          <FaWhatsapp className="h-6 w-6" />
        </a>
      </Button>
    </div>
  );
};

export default FloatButton;
