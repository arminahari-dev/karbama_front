import { ChangeFreelancerProposalStatus } from "@/services/prposal/proposal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useChangeFreelancerProposalStatus = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: changeProposalStatus } = useMutation({
    mutationFn: ({
      id,
      proposalStatus,
    }: {
      id: string;
      proposalStatus: number;
    }) => ChangeFreelancerProposalStatus(id, proposalStatus),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: ["freelancerproposalbyproject"],
      });
    },
  });

  return { changeProposalStatus };
};

export default useChangeFreelancerProposalStatus;
