import React from "react";
import Wrapper from "../ui/common/Wrapper";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import usePost from "../hooks/usePost";
import PostUploader from "../ui/components/PostUploader";

const Home = () => {
  return (
    <Wrapper className={"py-4"}>
      {/* <ProfileUploader /> */}
      <PostUploader />
    </Wrapper>
  );
};


export default Home;
