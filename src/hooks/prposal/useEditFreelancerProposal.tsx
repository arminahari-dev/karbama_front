import { EditFreelancerProposal } from "@/services/prposal/proposal";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useEditFreelancerProposal = () => {
  const { mutateAsync: updateProposal } = useMutation({
    mutationFn: ({
      id,
      proposalData,
    }: {
      id: string;
      proposalData: {
        description: string;
        price: string;
        duration: string;
      };
    }) => EditFreelancerProposal(id, proposalData),
    onSuccess: (message) => {
      toast.success(message);
    },
  });

  return { updateProposal };
};

export default useEditFreelancerProposal;
