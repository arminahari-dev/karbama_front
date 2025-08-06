import { VerifyUser } from "@/services/admin/AdminServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useVerifyUser = () => {
  const queryClient = useQueryClient();

  const { isPending: isPendingVerifyUser, mutateAsync: verifyUser } =
    useMutation({
      mutationFn: ({ userid, status }: { userid: string; status: string }) =>
        VerifyUser(userid, status),

      onSuccess: (message) => {
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ["userslist"] });
      },
    });

  return { verifyUser, isPendingVerifyUser };
};

export default useVerifyUser;
