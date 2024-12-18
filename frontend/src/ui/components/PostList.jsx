import React from "react";
import Post from "./Post";

const PostList = ({ posts }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {posts?.map((post, index) => (
        <Post data={post} key={index} />
      ))}
    </div>
  );
};

export default PostList;
