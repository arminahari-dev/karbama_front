import { EditCategory } from "@/services/category/Category";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useEditCategory = () => {
  const { mutateAsync: updateCategory } = useMutation({
    mutationFn: ({
      id,
      categorylData,
    }: {
      id: string;
      categorylData: {
        title: string;
        englishTitle: string;
        description: string;
        type: string;
        parent?: string;
      };
    }) => EditCategory(id, categorylData),
    onSuccess: (message) => {
      toast.success(message);
    },
  });

  return { updateCategory };
};

export default useEditCategory;
