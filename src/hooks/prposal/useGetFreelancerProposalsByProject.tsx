import { GetFreelancerProposalsByProject } from "@/services/prposal/proposal";
import { useQuery } from "@tanstack/react-query";

const useGetFreelancerProposalsByProject = (id: string) => {
  const { data: proposals } = useQuery({
    queryKey: ["freelancerproposalbyproject"],
    queryFn: () => GetFreelancerProposalsByProject(id),
  });

  return { proposals };
};

export default useGetFreelancerProposalsByProject;
