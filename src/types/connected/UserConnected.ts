import { useUserbytoken } from "@/api/auth/Api";
import { useNavigate } from "react-router-dom";

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
export function UserInstance(): UserConnected {
  const navigate = useNavigate();
  const user_connected = useUserbytoken(navigate);
  const user = new UserConnected();
  if (user_connected.isLoading) {
  } else if (user_connected.isError) {
    console.error("Error loading user:", user_connected.error);
    user.setemail = "not found";
  } else if (user_connected.isSuccess) {
    user.setemail = user_connected.data?.username || "not found"; // Remplacez "username" par la bonne clé
  }

  return user;
}
