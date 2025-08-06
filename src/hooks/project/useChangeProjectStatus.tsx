import { ChangeProjectStatus } from "@/services/project/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useChangeProjectStatus = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: changeProjectStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: object }) =>
      ChangeProjectStatus(id, status),

    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["ownerprojects"] });
    },
  });

  return { changeProjectStatus };
};

export default useChangeProjectStatus;
