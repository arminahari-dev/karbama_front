import { GetOwnerProjectById } from "@/services/project/project";
import { useQuery } from "@tanstack/react-query";

const useGetOwnerProjectById = (id: string) => {
  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: ["ownerprojectbyid", id],
    queryFn: () => GetOwnerProjectById(id),
    enabled: Boolean(id),
  });

  return { project, isLoadingProject };
};

export default useGetOwnerProjectById;
