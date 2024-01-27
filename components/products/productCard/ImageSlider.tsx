/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  productName: string;
  size?: "sm" | "lg";
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  productName,
  size = "sm",
}) => {
  const [current, setCurrent] = useState(0);

  const handleLeft = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrent((current - 1 + images.length) % images.length);
  };

  const handleRight = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrent((current + 1) % images.length);
  };

  return (
    <div className="relative">
      <div
        className={`w-full ${
          size === "sm" ? "h-32 md:h-64" : "h-64 md:h-[450px]"
        }`}
      >
        <img
          src={images[current]}
          className="w-full h-full object-cover aspect-square hover:scale-110 duration-150"
          alt={productName}
        />
      </div>
      <ButtonLeft onClick={handleLeft} />
      <ButtonRigth onClick={handleRight} />
    </div>
  );
};

export default ImageSlider;

const ButtonLeft = ({ onClick }: { onClick: (event: any) => void }) => (
  <button
    className="absolute top-1/2 left-0 hover:scale-125 duration-100 rounded-full p-1 transform active:scale-100 transition-transform text-primary-500"
    onClick={onClick}
  >
    <ChevronLeftIcon className="h-8 w-8" />
  </button>
);

const ButtonRigth = ({ onClick }: { onClick: (event: any) => void }) => (
  <button
    className="absolute top-1/2 right-0 hover:scale-125 duration-100 rounded-full p-1 transform active:scale-100 transition-transform text-primary-500"
    onClick={onClick}
  >
    <ChevronRightIcon className="h-8 w-8" />
  </button>
);
