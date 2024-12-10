import React from "react";
import UserCard from "./UserCard";
import Wrapper from "../common/Wrapper";

const Suggestions = ({ users }) => {
  const addFriend = async () => {};

  const unfriend = async () => {};
  return (
    <Wrapper className={'bg-blue-400 h-screen'}>
      <div className="grid grid-cols-12 gap-4 ">
        {users?.map((user) => (
          <UserCard
            key={user._id}
            username={user?.username}
            avatar={user?.avatar}
            isFriend={user?.isFriend}
            isSentRequest={user?.isSentRequest}
            isReceivedRequest={user?.isReceivedRequest}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default Suggestions;
