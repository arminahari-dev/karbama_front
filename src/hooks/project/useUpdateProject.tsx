import { UpdateProject } from "@/services/project/project";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateProject = () => {
  const { mutateAsync: updateProject } = useMutation({
    mutationFn: ({
      id,
      projectData,
    }: {
      id: string;
      projectData: {
        title: string;
        description: string;
        budget: string;
        category: string;
        deadline: string;
      };
    }) => UpdateProject(id, projectData),
    onSuccess: (message) => {
      toast.success(message);
    },
  });

  return { updateProject };
};

export default useUpdateProject;
