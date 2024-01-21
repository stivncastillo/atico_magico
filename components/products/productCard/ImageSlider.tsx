/* eslint-disable @next/next/no-img-element */
"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";

interface ImageSliderProps {
  images: string[];
  productName: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, productName }) => {
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
      <div className="w-full h-64">
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
    className="absolute top-1/2 left-0 hover:scale-125 duration-100 rounded-full p-1 transform active:scale-100 transition-transform"
    onClick={onClick}
  >
    <ChevronLeftIcon className="h-8 w-8" />
  </button>
);

const ButtonRigth = ({ onClick }: { onClick: (event: any) => void }) => (
  <button
    className="absolute top-1/2 right-0 hover:scale-125 duration-100 rounded-full p-1 transform active:scale-100 transition-transform"
    onClick={onClick}
  >
    <ChevronRightIcon className="h-8 w-8" />
  </button>
);
