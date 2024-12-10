import { Authuser } from "@/types/Authuser";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie';
const BASE_URL = "http://localhost:8080";
const instanceAxios = axios.create({ baseURL: BASE_URL });
// Fonction pour authentifier un utilisateur en envoyant ses données à l'API.
const Authentification = async (data: Authuser) => {
  return await instanceAxios.post("auth/authentification", data);
}
// Hook personnalisé pour gérer l'authentification.
// Utilise useMutation pour effectuer la mutation et gérer les erreurs et succès.
export function useAuthentification() {
  return useMutation({
    mutationFn: (data: Authuser) => Authentification(data),
    onSuccess() { },
    onError(error) {
      throw error;
    }
  })
}
// Fonction pour créer un nouvel utilisateur en envoyant ses données à l'API.
const register = async (data: Authuser) => {
  return await instanceAxios.post("auth/createaccount", data);
}
// Hook personnalisé pour l'inscription d'un nouvel utilisateur.
// Utilise useMutation pour gérer la création de compte, ainsi que les actions de succès et d'erreur.
export function useRegister() {
  return useMutation({
    mutationFn: (data: Authuser) => register(data),
    onSuccess() { },
    onError(error) {
      throw error;
    }
  })
}
// Fonction pour récupérer les informations de l'utilisateur en utilisant un token d'authentification.
const getUserbytoken = async (navigate: any) => {
  // Récupère le token d'authentification dans les cookies
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
// Utilise useQuery pour gérer la récupération des données avec un cache et des stratégies de rafraîchissement.
export function useUserbytoken(navigate:any) {
  return useQuery({
    queryKey: ["userbytoken", Cookies.get('auth_token')], // La clé de la requête, basée sur le token d'authentification
    queryFn: () => getUserbytoken(navigate),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}