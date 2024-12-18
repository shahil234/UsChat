import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import dummyProfile from "../../../public/user.png";
import { Button } from "../../components/ui/button";
import useDelete from "../../hooks/useDelete";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FriendList = () => {
  const [refetchFriendList, setRefetchFriendList] = useState(false);
  const { data: friendListData } = useFetch({
    endpoint: "friends",
    dep: [refetchFriendList],
  });

  if (friendListData?.data?.length === 0 || !friendListData?.data) {
    return (
      <div className="h-screen flex items-center justify-center text-center text-xl">
        You have no friends yet
      </div>
    );
  }
  return (
    <div className="grid grid-cols-12 gap-4 py-6">
      {friendListData?.data?.map((item) => (
        <FriendCard
          setRefetchFriendList={setRefetchFriendList}
          key={item?.userId}
          userId={item?.userId}
          username={item?.username}
          avatar={item?.avatar}
        />
      ))}
    </div>
  );
};

const FriendCard = ({ username, userId, avatar, setRefetchFriendList }) => {
  const navigate = useNavigate();
  const { data, deleteData, deleting } = useDelete();
  console.log(userId)
  const unFriendUser = async () => {
    const res = await deleteData(`friends?friendUserId=${userId}`);
    console.log(res);
    if (res?.success) {
      toast.success(`Unfriended ${username}`);
      setRefetchFriendList((state) => !state);
    } else {
      toast.error(`Unable to unfriend ${username}`);
    }
  };
  return (
    <div
      className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 flex items-center gap-4"
    >
      <div>
        <img
          className="h-32 w-32 rounded-full object-fit"
          src={avatar || dummyProfile}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium block text-center">{username}</span>
        <div className="space-x-2">
          <Button
            onClick={unFriendUser}
            disabled={deleting}
            variant="destructive"
          >
            Remove
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              navigate(`/profile/${userId}`);
            }}
          >
            See Profile
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FriendList;
