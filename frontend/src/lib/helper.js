import { createContext } from "react";
import PostForm from "../ui/components/PostForm";
import PictureShowcase from "../ui/components/PictureShowcase";
import dummyProfile from "../../public/user.png";
import messageIcon from "../../public/message.png"

export const PopUps = {
    postUploadPopUp: PostForm ,
    GalleryPopUp: PictureShowcase
}

export const ProfileContext = createContext(null);
export {dummyProfile , messageIcon};
