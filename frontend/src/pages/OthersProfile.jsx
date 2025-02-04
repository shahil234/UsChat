import React, { useState } from "react";
import { data, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Wrapper from "../ui/common/Wrapper";
import { ProfileContext } from "../lib/helper";
import AccountInfo from "../ui/components/AccountInfo";
import PostList from "../ui/components/PostList";

const OthersProfile = () => {
  const params = useParams();
  const [refetchPost, setRefetchPost] = useState(false);
  const { data: postData } = useFetch({
    endpoint: `post/${params.id}`,
    dep: [refetchPost],
  });
  
  if (postData?.data?.length === 0) {
    return (
      <div className="text-xl h-screen   flex items-center justify-center">
        This User have no Post
      </div>
    );
  }

  return (
    <Wrapper>
      <ProfileContext.Provider value={{ setRefetchPost }}>
        <AccountInfo />
        <PostList setRefetchPost={setRefetchPost} posts={postData?.data} />
      </ProfileContext.Provider>
    </Wrapper>
  );
};

export default OthersProfile;
