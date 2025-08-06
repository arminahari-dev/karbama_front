import { DeleteProject } from "@/services/project/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteProject } = useMutation({
    mutationFn: (id: string | null) => {
      if (id === null) throw new Error("Project ID cannot be null");
      return DeleteProject(id);
    },
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["ownerprojects"] });
    },
  });

  return { deleteProject };
};

export default useDeleteProject;
