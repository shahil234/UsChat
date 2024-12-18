import React, { useEffect } from "react";
import PhotoList from "../ui/components/PhotoList";
import { useLocation, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { usePhotos } from "../store/usePhotos";
import { useSaveScroll } from "../store/useSaveScroll";

const Photos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { clearPhotos } = usePhotos();
  const { setPosition } = useSaveScroll();

  useEffect(() => {
    setPosition({y:location.state.scrollY, x: location.state.scrollX })
  },[]);

  return (
    <div className="bg-black justify-center items-center min-h-screen">
      <div>
        <MoveLeft
          className="text-white"
          onClick={() => {
            clearPhotos();
            navigate(-1);
          }}
        />
      </div>
      <PhotoList />
    </div>
  );
};

export default Photos;
