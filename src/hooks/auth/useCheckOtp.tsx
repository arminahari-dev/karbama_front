import { CheckOtp } from "@/services/auth/Auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCheckOtp = () => {
  const { isPending: isPendingCheckOtp, mutateAsync: checkOtp } = useMutation({
    mutationFn: ({ phoneNumber, otp }: { phoneNumber: string; otp: string }) =>
      CheckOtp({ phoneNumber, otp }),
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: ({message}) => {
      toast.error(message);
    },
  });

  return { isPendingCheckOtp, checkOtp };
};

export default useCheckOtp;
