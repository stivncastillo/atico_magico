import React from "react";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel as CarouselUI,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselProps {}

const Carousel: React.FC<CarouselProps> = () => {
  return (
    <CarouselUI className="w-full">
      <CarouselContent>
        {Array.from({ length: 2 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image
                src={`/banners/Banner1.png`}
                alt="carousel image"
                className="w-full h-full object-cover"
                width={1400}
                height={500}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselUI>
  );
};

export default Carousel;
