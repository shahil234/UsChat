import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const postData = async (endpoint, data) => {
    try {
      setError(false);
      setLoading(true);
      const res = await axiosInstance.post(`/api/${endpoint}`, data);
      setData(res?.data);
      return res?.data;
    } catch (err) {
      setError(true);
      const message =
        err?.response?.data?.message || "Registration unsuccessfull";
      return ({ success: false, message });
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
