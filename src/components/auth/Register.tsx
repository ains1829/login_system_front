import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { authUserSchema } from "@/types/schema/AuthuserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Authuser } from "@/types/Authuser";
import { useRegister } from "@/api/auth/Api";
import { useCustomToast } from "../my_ui/showToast";
function Register() {
  const showToast = useCustomToast();
  const new_account = useRegister();
  const {register,handleSubmit,formState: { errors },reset} = useForm<Authuser>({resolver: zodResolver(authUserSchema),});
  const handleRegister : SubmitHandler<Authuser> = async(data) => {
    const reponse = await new_account.mutateAsync(data);
    if (reponse.data.status === 200) {
      showToast("Succes !", "Votre compte a été créé avec succès", true);
      reset();
    } else {
      showToast("Erreur !", reponse.data.data, false);
    }
  };
  return (
    <>
      <div className="flex h-dvh justify-center items-center bg-primary">
        <form onSubmit={handleSubmit(handleRegister)} className="grid flex-col gap-y-4 w-[480px] p-10 rounded-lg bg-white" >
        <h1 className="font-black text-3xl">Register.</h1>
          <span className="text-xs mb-3">Welcome ! please enter your details.</span>
          <div className="flex flex-col space-y-1">
            <span className="text-xs">Email</span>
            <Input type="email" placeholder="email" className="text-xs" {...register("email")} />         {errors.email && (
            <span className="text-red-600 font-bold text-xs">
              {errors.email.message}
            </span>
          )}
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs">Password</span>
            <Input type="password" placeholder="password" className="text-xs" {...register("password")} />
            {errors.password && (
              <span className="text-red-600 font-bold text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs">Confirm Password</span>
            <Input type="password" placeholder="confirm password" {...register("confirm_password")} />
            {errors.confirm_password && (
              <span className="text-red-600 font-bold text-xs">
                {errors.confirm_password.message}
              </span>
            )}
          </div>
          <Input type="submit" value="Connexion" className="bg-secondary cursor-pointer" />
          <div className="content-form text-center">
            <span className="text-xs">Vous avez un compte ? <Link  to="/" className="font-bold text-secondary">Connectez-vous</Link></span>
          </div>
        </form>
      </div>
    </>
  )
}
export default Register;