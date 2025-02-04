import React, { useEffect } from "react";
import PhotoList from "../ui/components/PhotoList";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, MoveLeft } from "lucide-react";
import { usePhotos } from "../store/usePhotos";
import { useSaveScroll } from "../store/useSaveScroll";
import Wrapper from "../ui/common/Wrapper";

const Photos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { clearPhotos } = usePhotos();
  const { setPosition } = useSaveScroll();

  useEffect(() => {
    setPosition({y:location.state.scrollY, x: location.state.scrollX })
  },[]);

  return (
    <Wrapper className="bg-black flex flex-col justify-center items-center h-[90vh]">
      <div className=" py-3 flex items-center">
        <ChevronLeft
          className="text-white cursor-pointer"
          size={35}
          onClick={() => {
            clearPhotos();
            navigate(-1);
          }}
        />
      </div>
      <PhotoList />
    </Wrapper>
  );
};

export default Photos;
