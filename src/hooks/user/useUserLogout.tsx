import { UserLogOut } from "@/services/user/user";
import { useMutation } from "@tanstack/react-query";

const useUserLogout = () => {
  const { mutateAsync: logoutuser } = useMutation({
    mutationFn: UserLogOut,
  });

  return { logoutuser };
};

export default useUserLogout;
