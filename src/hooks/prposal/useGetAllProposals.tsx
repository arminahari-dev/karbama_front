import { GetAllProposals } from "@/services/prposal/proposal";
import { useQuery } from "@tanstack/react-query";

const useGetAllProposals = () => {
  const { data: proposals, isLoading: isLoadingPropsals } = useQuery({
    queryKey: ["freelancerproposals"],
    queryFn: GetAllProposals,
  });

  return { proposals, isLoadingPropsals };
};

export default useGetAllProposals;
