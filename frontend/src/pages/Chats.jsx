import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../store/useAuth";
import { useLocation } from "react-router-dom";
import { socket as socketInstance } from "../lib/socket";
import Wrapper from "../ui/common/Wrapper";
import { dummyProfile } from "../lib/helper";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { User2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import useFetch from "../hooks/useFetch";

const Chats = () => {
  const room = useRef(null);
  const messageRef = useRef(null);
  const location = useLocation();
  const socket = useMemo(() => socketInstance, [socketInstance]);
  const myUserId = useAuth((state) => state.userId);
  const [chatMessages, setChatMessages] = useState([]);

  const { data } = useFetch({
    endpoint: `message/${location?.state?.user?.userId}`,
  });

  useEffect(() => {
    setChatMessages(data?.data);
  }, [data]);
  useEffect(() => {
    socket.emit("join-room", {
      user1: myUserId,
      user2: location?.state?.user?.userId,
    });
    socket.on("joined-room", (data) => (room.current = data.roomId));
    socket.on("received-message", (data) => {
      console.log(data);
      setChatMessages((state) => [...state, data]);
    });

    return () => {
      socket.off("joined-room");
      socket.off("received-message");
      socket.emit("leave-room", { roomId: room.current });
    };
  });

  const handleSendMessage = () => {
    socket.emit("sent-message", {
      roomId: room.current,
      message: messageRef.current.value,
      senderId: myUserId,
      recipientId: location?.state?.user?.userId,
    });
    messageRef.current.value = "";
  };
  return (
    <div className="h-[90vh] pb-2 flex flex-col justify-between">
      <div className="flex items-center gap-3 bg-gray-200 py-2 px-3">
        <img
          className="w-12 h-12 object-cover rounded-full"
          src={
            location?.state?.user?.avatar
              ? "http://localhost:4001/" + location?.state?.user?.avatar
              : dummyProfile
          }
          alt=""
        />
        <span className="text-xl font-semibold">
          {location?.state?.user?.username}
        </span>
      </div>
      <ScrollArea
        style={{
          backgroundImage:
            "url(https://c4.wallpaperflare.com/wallpaper/885/849/215/bleach-zaraki-kenpachi-yachiru-kusajishi-2878x1774-anime-bleach-hd-art-wallpaper-preview.jpg)",
          backgroundSize: "cover",
        }}
        className="bg-blue-200 grow flex flex-col gap-2  bg-opacity-80 py-2 px-3"
      >
        {chatMessages?.map((item, index) => (
          <div
            className={` flex gap-2 my-1 ${
              item.senderId === myUserId ? "justify-end" : "justify-start"
            }`}
            key={index}
          >
            {item?.senderId !== myUserId && (
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={
                  location?.state?.user?.avatar
                    ? "http://localhost:4001/" + location?.state?.user?.avatar
                    : dummyProfile
                }
                alt=""
              />
            )}
            <div
              style={{
                overflowWrap: "break-word",
              }}
              className={`px-3 py-2 text-white max-w-[40%] rounded-lg ${
                item.senderId === myUserId ? "bg-blue-500" : "bg-purple-500"
              } font-medium `}
            >
              {item.message}
            </div>
          </div>
        ))}
      </ScrollArea>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-4 mt-2"
        action=""
      >
        <Input placeholder="Your message" type="text" ref={messageRef} />
        <Button onClick={handleSendMessage}>Send</Button>
      </form>
    </div>
  );
};

export default Chats;
