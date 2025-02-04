import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Wrapper from "../ui/common/Wrapper";
import { dummyProfile } from "../lib/helper";
import { Outlet, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessageList = () => {
  const { data } = useFetch({
    endpoint: "friends",
    dep: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(data?.data?.length > 0){
      handleOnUserClick(data?.data[0])
    }
  },[data]);

  const handleOnUserClick = (user) => {
    navigate(`/messageList/chat`, { state: { user } });
  };

  return (
    <Wrapper className={`grid grid-cols-12 w-full grow`}>
      <div className="col-span-4 ">
        <h4 className="text-2xl font-medium">Chats</h4>
        <ScrollArea className="flex flex-col h-[88vh] gap-4">
          {data?.data?.map((item) => {
            return (
              <div
                key={item.userId}
                onClick={() => handleOnUserClick(item)}
                className="flex items-center gap-4  hover:bg-gray-100 cursor-pointer px-3 py-2"
              >
                <div>
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src={
                      item.avatar
                        ? "http://localhost:4001/" + item.avatar
                        : dummyProfile
                    }
                    alt=""
                  />
                </div>
                <div>
                  <span className="text-xl font-medium">{item.username}</span>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </div>
      <div className="col-span-8">
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default MessageList;
