import React, { useState } from "react";
import Wrapper from "../ui/common/Wrapper";
import AccountInfo from "../ui/components/AccountInfo";
import useFetch from "../hooks/useFetch";
import PostList from "../ui/components/PostList";
import { ProfileContext } from "../lib/helper";



const MyProfile = () => {
  const [refetchPost, setRefetchPost] = useState(false);
  const { data } = useFetch({
    endpoint: "post",
    dep: [refetchPost],
  });

  return (
    <Wrapper>
      <ProfileContext.Provider value={{setRefetchPost}}>
        <AccountInfo />
        <PostList setRefetchPost={setRefetchPost} posts={data?.data} />
      </ProfileContext.Provider>
    </Wrapper>
  );
};

export default MyProfile;
