import { useToast } from "@/hooks/use-toast";

export const useCustomToast = () => {
  const { toast } = useToast();
  const showToast = (title: string, description: string, isSuccess: boolean) => {
    toast({
      title: title,
      description: description,
      className: isSuccess ? 'bg-green-600 border-none' : 'bg-red-500 border-none',
      duration:5000
    });
  };

  return showToast;
};
