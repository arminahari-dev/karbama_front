import { GetOwnerProjects } from "@/services/project/project";
import { useQuery } from "@tanstack/react-query";

const useGetOwnerProjects = () => {
  const { data: projects, isLoading: isLoadingProjects, } = useQuery({
    queryKey: ["ownerprojects"],
    queryFn: GetOwnerProjects,
  });

  return { projects, isLoadingProjects };
};

export default useGetOwnerProjects;
