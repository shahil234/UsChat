import React, { useEffect } from "react";
import { usePhotos } from "../../store/usePhotos";

const PhotoList = () => {
  const { currentPhotos } = usePhotos();
  useEffect(() => {
    window.scrollTo(0,0);
  })
  return (
    <div className="flex flex-col gap-2">
      {currentPhotos?.map((pic, index) => (
        <img
          key={index}
          src={"http://localhost:4001/" + pic}
          className="w-full object-contain"
        />
      ))}
    </div>
  );
};

export default PhotoList;
