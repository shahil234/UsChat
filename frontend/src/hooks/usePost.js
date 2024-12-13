import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../store/useAuth";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const { getNewAccessToken } = useRefreshToken();
  const { accessToken } = useAuth();
  const postData = async (endpoint, data, headers = {}) => {
    try {
      setError(false);
      setLoading(true);
      const res = await axiosInstance.post(`/api/${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...headers
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
        err?.response?.data?.message || "Registration unsuccessfull";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    postData,
  };
}
