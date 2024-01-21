import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

interface NumberPickerProps {
  size?: "sm" | "lg";
}

const NumberPicker: React.FC<NumberPickerProps> = ({ size = "sm" }) => {
  const sizeIcon = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="relative flex items-center max-w-[8rem]">
      <button
        type="button"
        id="decrement-button"
        data-input-counter-decrement="quantity-input"
        className={`rounded-s-lg border border-r-0 ${
          size === "sm" ? "h-8" : "h-12"
        } px-2`}
      >
        <MinusIcon className={`${sizeIcon} text-gray-900 dark:text-white`} />
      </button>
      <input
        type="text"
        id="quantity-input"
        data-input-counter
        aria-describedby="helper-text-explanation"
        className={`border-y text-center text-gray-900 text-sm block w-full py-2.5 ${
          size === "sm" ? "h-8" : "h-12"
        }`}
        placeholder="999"
        required
        readOnly
      />
      <button
        type="button"
        id="increment-button"
        data-input-counter-increment="quantity-input"
        className={`rounded-e-lg border border-l-0 ${
          size === "sm" ? "h-8" : "h-12"
        } px-2`}
      >
        <PlusIcon className={`${sizeIcon} text-gray-900 dark:text-white`} />
      </button>
    </div>
  );
};

export default NumberPicker;
