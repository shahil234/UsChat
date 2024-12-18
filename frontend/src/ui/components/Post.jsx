import React, { useContext, useEffect, useRef, useState } from "react";
import DummyProfile from "../../../public/user.png";
import { MessageCircle, Share } from "lucide-react";
import {
  PiHeartStraightFill as Heart2,
  PiHeartStraightBold as Heart,
} from "react-icons/pi";
import usePost from "../../hooks/usePost";
import useDelete from "../../hooks/useDelete";
import toast from "react-hot-toast";
import { ProfileContext } from "../../lib/helper";
import { usePopUp } from "../../store/usePopUp";
import { usePhotos } from "../../store/usePhotos";
import { useLocation, useNavigate } from "react-router-dom";
import { useSaveScroll } from "../../store/useSaveScroll";

const Post = ({ data }) => {
  return (
    <div className="bg-gray-100 w-full max-w-lg">
      <div className="flex items-center px-4 py-2 gap-3">
        <img
          src={data?.author?.avatar || DummyProfile}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="-space-y-1">
          <span className="font-medium block">
            {data?.author?.username || "User"}
          </span>
          <span className="font-light block">1d</span>
        </div>
      </div>
      <div className="px-4">
        <p>{data?.caption}</p>
      </div>
      <Gallery pictures={data?.pictures} />
      <Interaction
        postId={data?._id}
        comments={data?.comments}
        commentCount={data?.commentCount}
        likedBy={data?.likedBy}
        heartCount={data?.hearts}
        isLiked={data?.isLiked}
      />
    </div>
  );
};

const Gallery = ({ pictures }) => {
  const { setCurrentPhotos } = usePhotos();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [scrollXPosition, setScrollXPosition] = useState(0);

  const { position, setPosition } = useSaveScroll();


  const handleNavigate = () => {
    navigate("/photos", { state: { scrollY: scrollYPosition, scrollX: scrollXPosition }});
    setCurrentPhotos(pictures);
  };


  // console.log(yPosition, "outside effect")

  useEffect(() => {
    // console.log(yPosition, "inside effect")
    if(position.x !== null && position.y !==null){
      window.scrollTo(position.x, position.y);
      setPosition({x: null, y: null});
    }
  },[position]);
  
  useEffect(() => {
    const handleScrollChange = () => {
      setScrollYPosition(window.scrollY);
      setScrollXPosition(window.scrollX);
    };

    window.addEventListener("scroll", handleScrollChange);

    return () => {
      window.removeEventListener("scroll", handleScrollChange);
    };
  }, []);

  return (
    <div onClick={handleNavigate} className="px-4 mt-2">
      {pictures?.length === 1 &&
        pictures.map((pic, index) => (
          <img
            src={"http://localhost:4001/" + pic}
            key={index}
            className="w-full object-cover"
          />
        ))}
      {pictures?.length === 2 && (
        <div className="flex">
          {pictures.map((pic, index) => (
            <img
              key={index}
              className="w-1/2"
              src={"http://localhost:4001/" + pic}
            />
          ))}
        </div>
      )}
      {pictures?.length === 3 && (
        <div className="flex flex-wrap gap-1">
          {pictures.map((pic, index) => (
            <img
              key={index}
              className={`${index === 0 ? "w-full" : "w-[49%]"}`}
              src={"http://localhost:4001/" + pic}
            />
          ))}
        </div>
      )}
      {pictures?.length > 3 && (
        <div className="flex flex-wrap gap-1">
          {pictures.slice(0, 3).map((pic, index) => (
            <div
              key={index}
              className={`${index === 0 ? "w-full" : "w-[49%]"} relative`}
            >
              <img
                className="w-full h-full object-cover"
                src={"http://localhost:4001/" + pic}
              />
              {index === 2 && (
                <div className="absolute bg-black bg-opacity-70 inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-medium">
                    + {pictures.length - 3}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Interaction = ({
  postId,
  comments,
  likedBy,
  isLiked,
  heartCount,
  commentCount,
}) => {
  const [isPostLiked, setPostLiked] = useState(isLiked);
  const { postData: likePost } = usePost();
  const { deleteData: unlikePost } = useDelete();

  const { setRefetchPost } = useContext(ProfileContext);

  const likeThePost = async () => {
    const res = await likePost("post/heart", { postId });
    if (res.success) {
      toast.success("Liked the post");
    } else {
      toast.error("Unable to like the post");
    }

    setRefetchPost((state) => !state);
  };

  const unLikeThePost = async () => {
    const res = await unlikePost(`post/unheart?postId=${postId}`);
    if (res.success) {
      toast.success("Unliked the post");
      setRefetchPost((state) => !state);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex gap-2 items-center cursor-pointer w-fit select-none">
        <div>
          {isPostLiked ? (
            <Heart2
              onClick={() => {
                setPostLiked(false);
                unLikeThePost();
              }}
              className="text-orange-500"
              size={25}
            />
          ) : (
            <Heart
              onClick={() => {
                setPostLiked(true);
                likeThePost();
              }}
              size={25}
            />
          )}
        </div>
        <span>{heartCount}</span>
      </div>
      <div className="flex gap-2 items-center cursor-pointer w-fit select-none">
        <MessageCircle />
        <span>{commentCount} Comment</span>
      </div>
      <div className="flex gap-2 items-center cursor-pointer w-fit select-none">
        <Share />
        <span>Share</span>
      </div>
    </div>
  );
};

export default Post;
