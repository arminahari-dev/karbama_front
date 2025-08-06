import { SendOtp } from "@/services/auth/Auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useSendOtp = () => {
  const { isPending: isPendingSendOtp, mutateAsync: sendOtp } = useMutation({
    mutationFn: (phoneNumber: string) => SendOtp({ phoneNumber }),
    onSuccess: ({message}) => {
      toast.success(message);
    },
  });

  return { isPendingSendOtp, sendOtp };
};

export default useSendOtp;
