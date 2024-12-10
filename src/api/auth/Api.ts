import { Authuser } from "@/types/Authuser";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie';
const BASE_URL = "http://localhost:8080";
const instanceAxios = axios.create({ baseURL: BASE_URL });
const Authentification = async (data: Authuser) => {
  return await instanceAxios.post("auth/authentification", data);
}
export function useAuthentification() {
  return useMutation({
    mutationFn: (data: Authuser) => Authentification(data),
    onSuccess() { },
    onError(error) {
      throw error;
    }
  })
}
const register = async (data: Authuser) => {
  return await instanceAxios.post("auth/createaccount", data);
}
export function useRegister() {
  return useMutation({
    mutationFn: (data: Authuser) => register(data),
    onSuccess() { },
    onError(error) {
      throw error;
    }
  })
}
const getUserbytoken = async (navigate: any) => {
  const authToken = Cookies.get("auth_token");
  if (!authToken) {
    console.warn("No auth token found, redirecting...");
    navigate("/");
    return null;
  }
  try {
    const response = await instanceAxios.get(`private_acces/userbytoken`, {
      headers: {
        "Authorization": `Bearer ${Cookies.get("auth_token")}`
      },
    });
    return response.data;
  } catch (error) {
    navigate("/");
    throw error;
  }
};

export function useUserbytoken(navigate:any) {
  return useQuery({
    queryKey: ["userbytoken", Cookies.get('auth_token')],
    queryFn: () => getUserbytoken(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}