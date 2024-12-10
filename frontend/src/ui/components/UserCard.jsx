import React from "react";
import DummyAvatar from "../../../public/user.png";

import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
const UserCard = ({ avatar, username, isFriend, onClick }) => {
  const navigate = useNavigate();

  return (
    <div className="col-span-12 sm:col-span-11 md:col-span-6 lg:col-span-2 px-4 py-3 bg-gray-300 rounded-md shadow-md flex flex-col items-center justify-between space-y-2">
      <div>
        <img
          className="w-4/5 mx-auto"
          src={avatar || DummyAvatar}
          alt="profile"
        />
      </div>
      <div>
        <span className="text-xl font-medium">{username}</span>
      </div>
      <div>
        {/* {isFriend ?<Button>Unfriend</Button> : <Button>Add Friend</Button>} */}
        <Button onClick={onClick}>
          {isFriend ? "Unfriend" : "Add friend"}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
