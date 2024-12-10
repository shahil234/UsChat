import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../store/useAuth";

export default function useFetch({ dep = [], endpoint }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { getNewAccessToken } = useRefreshToken();
  const { accessToken } = useAuth();

  const fetchData = async (retry = true) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axiosInstance.get(`/api/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response?.data);
    } catch (error) {
      if (error?.response?.status === 401 && retry) {
        const gotNewToken = await getNewAccessToken();
        if (gotNewToken.success) {
          return fetchData(false);
        }
      }
      setError(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, ...dep]);

  return { data, loading, error };
}
