import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../store/useAuth";

export default function useDelete() {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const { getNewAccessToken } = useRefreshToken();
  const { accessToken } = useAuth();
  const deleteData = async (endpoint) => {
    try {
      setError(false);
      setDeleting(true);
      const res = await axiosInstance.delete(`/api/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setData(res?.data);
      return res?.data;
    } catch (err) {
      setError(true);
      if (err.status === 401) {
        const gotNewToken = await getNewAccessToken();
        if(gotNewToken.success){
          console.log(gotNewToken)
        }
      }
      const message =
        err?.response?.data?.message;
      return { success: false, message };
    } finally {
      setDeleting(false);
    }
  };

  return {
    deleting,
    error,
    data,
    deleteData,
  };
}
