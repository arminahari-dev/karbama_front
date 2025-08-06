import { GetAllProjects } from "@/services/project/project";
import { useQuery } from "@tanstack/react-query";

const useGetAllProjects = () => {
  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ["allprojects"],
    queryFn: GetAllProjects,
  });

  return { projects, isLoadingProjects };
};

export default useGetAllProjects;
