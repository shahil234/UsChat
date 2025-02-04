import React, { useEffect } from "react";
import { usePhotos } from "../../store/usePhotos";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PhotoList = () => {
  const { currentPhotos } = usePhotos();
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="bg-green-500 w-full grow px-4">
      <div className="flex flex-col items-center justify-center h-full  gap-1">
        {currentPhotos.length > 1 ? (
          <Carousel>
            <CarouselNext />
            <CarouselPrevious />
            <CarouselContent className="max-w-full">
              {currentPhotos?.map((pic, index) => (
                <CarouselItem
                  className="flex items-center bg-red-900 justify-center"
                  key={index}
                >
                  <img
                    src={"http://localhost:4001/" + pic}
                    className=" max-w-md  object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="bg-gray-200 w-full flex justify-center items-center">
            <img
              src={"http://localhost:4001/" + currentPhotos[0]}
              className="w-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoList;
