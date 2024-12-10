import { useState } from "react";
import { useAuth } from "../store/useAuth";
import axiosInstance from "../api/axiosInstance";

export default function useSendRequest() {
  const [sendingRequest, setSendingRequest] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { accessToken } = useAuth();
  const sendRequest = async (receiverId) => {
    try {
      setError(null);
      setSendingRequest(true);

      const res = await axiosInstance.post(
        "/api/requests",
        {
          receiverId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(res?.data);
      return res?.data;
    } catch (error) {
      setError(true);
      return {success: false, message: error?.response?.data?.message || "Cannot send request"}
    } finally {
      setSendingRequest(false);
    }
  };

  return {
    sendRequest,
    data,
    sendingRequest,
    error,
  };
}
