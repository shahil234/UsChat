import { createContext } from "react";
import PostForm from "../ui/components/PostForm";
import PictureShowcase from "../ui/components/PictureShowcase";

export const PopUps = {
    postUploadPopUp: PostForm ,
    GalleryPopUp: PictureShowcase
}

export const ProfileContext = createContext(null);
