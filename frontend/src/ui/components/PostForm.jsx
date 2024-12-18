import React, { useRef, useState } from "react";
import { usePopUp } from "../../store/usePopUp";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "../../schema/postSchema";

import { toast } from "react-hot-toast";

import { Images, LoaderCircle } from "lucide-react";
import usePost from "../../hooks/usePost";

const PostForm = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const { clearPopUp } = usePopUp();

  const {
    postData: uploadNewPost,
    loading: uploading,
    data: uploadRes,
  } = usePost();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: {
      photos: [],
    },
  });
  const handleUploadPost = async (data) => {
    const postData = new FormData();

  
    postData.append("caption", data.caption);
  
    // Check if 'data.photos' is an array or has 'files' property, then append images
    if (data.photos && data.photos) {
      data.photos.forEach((image) => {
        postData.append("photos", image);
      });
    }
  
    try {
      const res = await uploadNewPost("post", postData , {
        "Content-Type": "multipart/form-data",
      });
  
      if (res.success) {
        reset();
        toast.success("New post uploaded successfully!!");
      } else {
        toast.error("Failed to upload a post!!");
      }

    } catch (error) {
      console.error(error);
      toast.error("Error uploading post, please try again.");
    } finally{
      clearPopUp();
    }
  };
  
  const fileInputRef = useRef(null);

  return (
    <form
      onSubmit={handleSubmit(handleUploadPost)}
      className="bg-white rounded-lg px-4 py-3 w-11/12 md:w-4/5 lg:w-8/12 max-w-xl space-y-4"
    >
      <div className="flex justify-end">
        <Button
          variant="destructive"
          onClick={clearPopUp}
          className="cursor-pointer"
        >
          Cancel{" "}
        </Button>
      </div>
      <div>
        <h6 className="text-center font-medium text-xl">Share a new Post.</h6>
      </div>
      <div className="space-y-4">
        <div>
          <Input {...register("caption")} placeholder="Add your caption" />
          {errors.caption && (
            <span className="text-center text-sm text-red-500">
              {errors.caption.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className=" font-medium">Add Photos to your post</span>
          <div className="border-2 py-6 border-gray-300 px-3 max-h-60 overflow-y-scroll  rounded-md flex flex-col gap-2 cursor-pointer items-center justify-center">
            <input
              onChange={(e) => {
                setSelectedImages(Object.values(e.target.files));
                setValue("photos", Object.values(e.target.files));
              }}
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              type="file"
            />
            {selectedImages?.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center gap-3"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="font-medium">Upload Pictures</span>
                <span>
                  <Images />
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {selectedImages?.map((image, index) => (
                  <img
                    className="object-contain w-full"
                    key={index}
                    src={URL.createObjectURL(image)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <Button disabled={uploading} type="submit" className="block mx-auto">
          {uploading ? (
            <span>
              <LoaderCircle /> Posting
            </span>
          ) : (
            <span>Post</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
