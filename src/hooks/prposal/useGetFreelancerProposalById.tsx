import { GetFreelancerProposalById } from "@/services/prposal/proposal";
import { useQuery } from "@tanstack/react-query";

const useGetFreelancerProposalById = (id: string) => {
  const { data: proposal, isLoading: isLoadingProposal } = useQuery({
    queryKey: ["freelancerproposalbyid", id],
    queryFn: () => GetFreelancerProposalById(id),
    enabled: Boolean(id),
  });

  return { proposal, isLoadingProposal };
};

export default useGetFreelancerProposalById;
