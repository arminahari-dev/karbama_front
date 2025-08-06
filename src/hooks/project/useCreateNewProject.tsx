import { CreateNewProject } from "@/services/project/project";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCreateNewProject = () => {
  const { mutateAsync: createNewProject } = useMutation({
    mutationFn: (projectData: {
      title: string;
      description: string;
      budget: string;
      category: string;
      deadline: string;
    }) => CreateNewProject(projectData),
    onSuccess: (message) => {
      toast.success(message);
    },
  });

  return { createNewProject };
};

export default useCreateNewProject;
