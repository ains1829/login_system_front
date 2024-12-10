import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { useAuthentification } from "@/api/auth/Api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Authuser } from "@/types/Authuser";
import { useState } from "react";
import Cookies from 'js-cookie';
function Login() {
  const authentification = useAuthentification();
  const { control, handleSubmit, reset } = useForm<Authuser>();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // Fonction de gestion de l'authentification lors de la soumission du formulaire
  const handleAuth: SubmitHandler<Authuser> = async (data) => {
    const reponse = await authentification.mutateAsync(data);
    // Si l'authentification est réussie (status 200), enregistrement du token dans les cookies et redirection vers la page d'accueil
    if (reponse.data.status === 200) {
      Cookies.set('auth_token', reponse.data.data.token, { expires: 1, path: '/', secure:true }); 
      navigate("/home");
    } else {
      // En cas d'échec, affichage de l'erreur et réinitialisation du formulaire
      setError(true)
      reset()
    }
  }
  return (
    <>
      <div className="flex h-dvh justify-center items-center bg-primary">
        <form onSubmit={handleSubmit(handleAuth)} className="grid flex-col gap-y-4 w-[480px] p-10 rounded-lg bg-white" >
        <h1 className="font-black text-3xl">Se connecter.</h1>
          <span className="text-xs mb-3">Bienvenue à nouveau ! Veuillez saisir vos informations.</span>
          <div className="flex flex-col space-y-2">
            <span className="text-xs">Email</span>
            <Controller
              name="email" defaultValue="" control={control} render={({field}) => <Input {...field} type="email" placeholder="email" required />} />
            
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xs">Mot de passe</span>
            <Controller defaultValue="" control={control} name="password" render={({ field }) => 
              <Input {...field}  type="password" placeholder="mot de passe"  required />
            } />
          </div>
          <Input disabled={authentification.isPending} type="submit" value="Connexion" className="bg-secondary cursor-pointer" />
          {
            error && <span className="text-red-600 font-bold text-center text-xs">Mot de passe incorrect</span>
          }
          <div className="content-form text-center">
            <span className="text-xs">Vous n’avez pas de compte ?<Link  to="/register" className="font-bold text-secondary"> Inscrivez-vous</Link></span>
          </div>
        </form>
      </div>
    </>
  )
}
export default Login;