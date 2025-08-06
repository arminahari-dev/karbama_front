import { deleteCategory } from "@/services/category/Category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutateAsync: deletecategory } = useMutation({
    mutationFn: (id: string) => deleteCategory(id),

    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { deletecategory };
}
