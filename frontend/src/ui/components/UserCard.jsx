import React from "react";
import DummyAvatar from "../../../public/user.png";
import { toast } from "react-hot-toast";
import {CheckCheck} from "lucide-react"
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";
import useDelete from "../../hooks/useDelete";
import usePatch from "../../hooks/usePatch";
const UserCard = ({
  setReFetchUsers,
  userId,
  avatar,
  username,
  isFriend,
  isSentRequest,
  isReceivedRequest,
}) => {
  const navigate = useNavigate();

  const {
    data: requestRes,
    postData: sendRequest,
    loading: sendingReq,
  } = usePost();

  const {
    deleteData: cancelReq,
    data: cancelReqRes,
    deleting: cancelingReq,
  } = useDelete();


  const sendFriendRequest = async () => {
    const response = await sendRequest("requests", {
      receiverId: userId,
    });
    if (response?.success) {
      setReFetchUsers(state => !state)
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
  };

  const cancelFriendRequest = async () => {
    const res = await cancelReq(`requests/cancel?receiverId=${userId}`);
    if (res?.success) {
      toast.success(res?.message);
      setReFetchUsers(state => !state)
    } else {
      toast.error(res?.message);
    }
  };


  return (
    <div className="col-span-12  md:col-span-6 lg:col-span-3 px-4 py-3 bg-gray-300 rounded-md shadow-md flex flex-col items-center justify-between space-y-2">
      <div>
        <img
          className="w-32 h-32 rounded-full mx-auto "
          src={avatar ? `http://localhost:4001/${avatar}` : DummyAvatar}
          alt="profile"
        />
      </div>
      <div>
        <span className="font-medium block text-center">{username}</span>
      </div>
      <div className="flex justify-between gap-2">
        {(!isReceivedRequest &&
          !isSentRequest &&
          !isFriend 
        ) && (
          <Button disabled={sendingReq} onClick={sendFriendRequest}>
            Add Friend
          </Button>
        )}

        {isFriend && (
          <div className="flex items-center gap-6 justify-between">
            <Button className="flex items-center">
              <span>Friends</span> <CheckCheck />
            </Button>
            <Button variant="destructive">
              Remove
            </Button>
          </div>
        )}
        <Button onClick={() => {
          navigate(`/profile/${userId}`);
        }} className="" variant="secondary">See Profile</Button>
        {isReceivedRequest && <Button variant="secondary">Confirm Request</Button>}

        {isSentRequest  && (
          <Button
            onClick={cancelFriendRequest}
            disabled={cancelingReq}
            variant={"secondary"}
          >
            Cancel Request
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
