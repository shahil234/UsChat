import React from "react";
import Wrapper from "../ui/common/Wrapper";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import usePost from "../hooks/usePost";

const Home = () => {
  return (
    <Wrapper>
      {/* <ProfileUploader /> */}
      this is home
    </Wrapper>
  );
};

const ProfileUploader = () => {
  const { handleSubmit, register, reset } = useForm();

  const { postData } = usePost();

  const handleUpload = async (data) => {
    console.log(data, "hello");
    try {
      const uploadData = new FormData();

      uploadData.append("pfp", data.pfp[0]);

      // const res = axiosInstance.post("/api/user/pfp", uploadData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      const res = await postData("user/pfp", uploadData, {
        "Content-Type": "multipart/form-data",
      });
    } catch (error) {
      console.log(error, "failed to upload profile picture");
    }
  };
  return (
    <form onSubmit={handleSubmit(handleUpload)}>
      <div>
        <label htmlFor="pfp">Upload profile</label>
        <input
          {...register("pfp")}
          type="file"
          name="pfp"
          id="pfp"
          accept=".png .img .jpg .jpeg .gif"
        />
        <button type="submit">Upload</button>
      </div>
    </form>
  );
};

export default Home;
