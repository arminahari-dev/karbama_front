import { CompleteProfile } from "@/services/auth/Auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCompleteProfile = () => {
  const { mutateAsync: completeProfile } = useMutation({
    mutationFn: ({
      name,
      email,
      role,
    }: {
      name: string;
      email: string;
      role: string;
    }) => CompleteProfile({ name, email, role }),
    onSuccess: ({message}) => {
      toast.success(message);
    },
  });

  return completeProfile;
};

export default useCompleteProfile;
