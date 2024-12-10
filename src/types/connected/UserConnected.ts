import { useUserbytoken } from "@/api/auth/Api";
import { useNavigate } from "react-router-dom";
// La classe UserConnected est utilisée pour gérer les informations de l'utilisateur connecté.
class UserConnected{
  private _email: any;
  constructor(email: any='') {
    this._email = email;
  }
    get getEmail(): any{
    return this._email;
  }
  set setemail(email: any) {
    this._email = email;
  }
}
// Fonction UserInstance qui utilise un hook personnalisé pour récupérer les informations de l'utilisateur connecté.
export function UserInstance(): UserConnected {
  const navigate = useNavigate();
  const user_connected = useUserbytoken(navigate);  // Hook personnalisé pour récupérer les données de l'utilisateur via le token.
  const user = new UserConnected();
  if (user_connected.isLoading) {
  } else if (user_connected.isError) {
    console.error("Error loading user:", user_connected.error);
    user.setemail = "not found";
  } else if (user_connected.isSuccess) {
    user.setemail = user_connected.data?.email || "not found"; // Remplacez "username" par la bonne clé
  }
  return user;
}
