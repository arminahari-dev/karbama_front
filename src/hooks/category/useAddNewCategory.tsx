import { AddNewCategory } from "@/services/category/Category";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddNewCategory = () => {
  const { mutateAsync: createNewCategory } = useMutation({
    mutationFn: (CategorylData: {
      title: string;
      englishTitle: string;
      description: string;
      type: string;
      parent?: string;
    }) => AddNewCategory(CategorylData),
    onSuccess: (message) => {
      toast.success(message);
    },
  });

  return { createNewCategory };
};

export default useAddNewCategory;
