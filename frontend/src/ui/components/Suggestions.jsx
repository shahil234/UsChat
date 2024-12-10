import React from "react";
import UserCard from "./UserCard";
import Wrapper from "../common/Wrapper";

const Suggestions = ({ users, setReFetchUsers }) => {
  return (
    <Wrapper className={'bg-blue-400 min-h-screen py-8'}>
      <div className="grid grid-cols-12 gap-4 w-full">
        {users?.map((user) => (
          <UserCard
            key={user._id}
            username={user?.username}
            userId={user._id}
            avatar={user?.avatar}
            isFriend={user?.isFriend}
            isSentRequest={user?.isSentRequest}
            isReceivedRequest={user?.isRequestReceived}
            setReFetchUsers={setReFetchUsers}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default Suggestions;
