import { SendOtp } from "@/services/auth/Auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useSendOtp = () => {
  const {
    isPending: isPendingSendOtp,
    mutateAsync: sendOtp,
    isSuccess: isSuccessSendOtp,
  } = useMutation({
    mutationFn: (phoneNumber: string) => SendOtp({ phoneNumber }),
    onSuccess: ({ message }) => {
      toast.success(message, {
        duration: 4000,
      });
    },
  });

  return { isPendingSendOtp, sendOtp, isSuccessSendOtp };
};

export default useSendOtp;
