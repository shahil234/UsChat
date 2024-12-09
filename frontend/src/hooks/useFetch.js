import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useFetch({dep = [], endpoint}){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async() => {
            try {
                setError(false)
                setLoading(true)
                const response = await axiosInstance.get(`/api/${endpoint}`);
                setData(response?.data);
                return response?.data
            } catch (error) {
                setError(true);
                return {
                    success: false,
                    message: error?.response?.data?.message
                }
            }
            finally{
                setLoading(false);
            }
        }
        getData();
    },dep)

    return {data, loading, error};
}