import React, { useState } from "react";
import dummyProfile from "../../../public/user.png";
import { Button } from "../../components/ui/button";
import usePost from "../../hooks/usePost";
import usePatch from "../../hooks/usePatch";
import useDelete from "../../hooks/useDelete";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

const FriendRequests = () => {
  const [refetchRequests, setReFetchRequests] = useState(false);
  const { data: friendRequests } = useFetch({
    endpoint: "requests",
    dep: [refetchRequests],
  });
  if (friendRequests?.data?.length === 0) {
    return (
      <div className="flex items-center justify-center text-xl h-screen">
        You not received any friend requests yet.
      </div>
    );
  }
  return (
    <div>
      <h2>Friend Requests</h2>
      <div className="">
        {friendRequests?.data?.map((item, index) => (
          <RequestCard
            setReFetchRequests={setReFetchRequests}
            key={item?._id}
            requestId={item?._id}
            userId={item?.sender?._id}
            username={item?.sender?.username}
            avatar={item?.sender?.avatar}
          />
        ))}
      </div>
    </div>
  );
};

const RequestCard = ({
  username,
  userId,
  requestId,
  avatar,
  setReFetchRequests,
}) => {
  const {
    updateData: acceptRequest,
    data: acceptReqRes,
    loading: acceptingRequest,
  } = usePatch();

  const {
    deleteData: rejectRequest,
    data: rejectReqRes,
    deleting: rejectingRequest,
  } = useDelete();

  const acceptFriendRequest = async () => {
    const res = await acceptRequest("requests", {
      requestId,
    });

    if (res?.success) {
      toast.success(`Accepted request from ${username}`);
      setReFetchRequests((state) => !state);
    } else {
      toast.error(`Failed to accept request from ${username}`);
    }
  };

  const rejectFriendRequest = async () => {
    const res = await rejectRequest(`requests?requestId=${requestId}`);

    if (res?.success) {
      toast.success(`Rejected request from ${username} `);
      setReFetchRequests((state) => !state);
    } else {
      toast.error(`Failed to reject request from ${username}`);
    }
  };

  return (
    <div className="flex items-center gap-6 shadow-md rounded-md px-3 py-4">
      <div>
        <img
          className="w-32 h-32 rounded-full object-cover"
          src={avatar ? `http://localhost:4001/${avatar}` : dummyProfile}
          alt="profile"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="text-xl font-medium">{username}</span>
        </div>
        <div className="space-x-3">
          <Button
            onClick={acceptFriendRequest}
            disabled={acceptingRequest}
            variant="secondary"
          >
            Confirm Request
          </Button>
          <Button
            onClick={rejectFriendRequest}
            disabled={rejectingRequest}
            variant="destructive"
          >
            Reject Request
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FriendRequests;
