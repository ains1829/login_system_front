import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { UserInstance } from "@/types/connected/UserConnected";

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Supprimer le cookie 'auth_token'
    Cookies.remove('auth_token');
    // Rediriger vers la page de connexion
    navigate('/'); 
  };
  const user_conneced = UserInstance();
  return (
    <>
      <div className="flex flex-col bg-primary">
        <div className='head flex justify-end items-center p-2 gap-2'>
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="border-none bg-transparent shadow-none p-0 w-[150px]">
              <Button className="text-red-500" onClick={handleLogout} >
                <LogOut /> Deconnexion
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center text-center justify-center">
          <span className="text-8xl">
            Hello {user_conneced.getEmail}
          </span>
        </div>
      </div>
    </>
  );
}

export default Home;
