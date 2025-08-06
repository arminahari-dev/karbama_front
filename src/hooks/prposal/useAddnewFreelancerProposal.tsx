import { AddnewFreelancerProposal } from "@/services/prposal/proposal";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddNewFreelancerProposal = () => {
  const { mutateAsync: createNewPropsal } = useMutation({
    mutationFn: (proposalData: {
      description: string;
      price: string;
      duration: string;
      projectId: string;
    }) => AddnewFreelancerProposal(proposalData),
    onSuccess: (message) => {
      toast.success(message);
    },
  });

  return { createNewPropsal };
};

export default useAddNewFreelancerProposal;
