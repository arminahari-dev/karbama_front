import { UserLogOut } from "@/services/user/user";
import { useMutation } from "@tanstack/react-query";

const useUserLogout = () => {
  const { mutateAsync: logOutUser, isPending: isPendingLogOutUser } =
    useMutation({
      mutationFn: UserLogOut,
    });

  return { logOutUser, isPendingLogOutUser };
};

export default useUserLogout;
