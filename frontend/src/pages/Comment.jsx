import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Wrapper from "../ui/common/Wrapper";
import { dummyProfile } from "../lib/helper";
import { Send, Ellipsis, Trash2, Pen } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import usePost from "../hooks/usePost";
import useDelete from "../hooks/useDelete";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Comment = () => {
  const { id } = useParams();

  const [refetchComment, setRefetchComment] = useState(false);

  const { data } = useFetch({
    endpoint: `comment/${id}`,
    dep: [refetchComment],
  });

  return (
    <Wrapper className={"flex justify-center bg-black h-screen"}>
      <div className="max-w-xl md:px-2 w-full bg-white">
        <CommentList setRefetchComment={setRefetchComment} comments={data?.data} />
        <AddComment setRefetchComment={setRefetchComment} postId={id} />
      </div>
    </Wrapper>
  );
};

const CommentList = ({ comments, setRefetchComment }) => {
  if (comments?.length === 0) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-xl">
        No coments yet
      </div>
    );
  }
  return (
    <div className="h-[80vh] flex flex-col gap-4 py-4">
      {comments?.map((item) => (
        <CommentCard setRefetchComment={setRefetchComment} item={item} key={item?._id} />
      ))}
    </div>
  );
};

const CommentCard = ({ item, setRefetchComment }) => {
  const navigate = useNavigate();

  const { deleteData, deleting } = useDelete();
  const handleDeleteComment = async () => {
    const res = await deleteData(`comment?commentId=${item?._id}`);
    if(res?.success){
      toast.success("Deleted comment");
      setRefetchComment(state => !state)
    } else{
      toast.error("Unable to delete the post")
    }
  };

  console.log(item)

  return (
    <div className="flex gap-2 items-center cursor-pointer" key={item._id}>
      <div>
        <img
          onClick={() => navigate(`/profile/${item?.commentAuthor?._id}`)}
          src={
            item?.commentAuthor?.avatar
              ? "http://localhost:4001/" + item?.commentAuthor?.avatar
              : dummyProfile
          }
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 rounded-md px-2 py-1 max-w-56 bg-gray-200">
        <div className="flex items-center justify-between gap-4">
          <span
            onClick={() => navigate(`/profile/${item?.commentAuthor?._id}`)}
            className="text-base font-medium cursor-pointer"
          >
            {item?.commentAuthor?.username}
          </span>
          {item?.isEditable && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white ">
                <DropdownMenuItem onClick={handleDeleteComment} className="flex items-center gap-1 justify-between cursor-pointer">
                  <span>Delete</span> <Trash2 />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <span className="leading-5">{item?.commentContent}</span>
      </div>
    </div>
  );
};
const AddComment = ({ postId, setRefetchComment }) => {
  const { postData: addNewComment, loading: addingComment } = usePost();

  const [comment, setComment] = useState("");

  const handleInput = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (comment === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    const res = await addNewComment("comment", {
      postId,
      comment,
    });

    if (res?.success) {
      toast.success("Added a comment");
      setRefetchComment((state) => !state);
    } else {
      toast.error("Unable to add comment. Try again!");
    }
  };

  return (
    <form className="bg-gray-100 flex items-center gap-2">
      <div className="grow">
        <Input
          onChange={handleInput}
          value={comment}
          type="text"
          placeholder="Add a comment"
        />
      </div>
      <Button onClick={handleAddComment} variant="secondary">
        <Send />
      </Button>
    </form>
  );
};
export default Comment;
