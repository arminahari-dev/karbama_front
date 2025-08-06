import { getAllCategories } from "@/services/category/Category";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllCategories() {
  const { data: categories, isLoading: isLoadngCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return { isLoadngCategories, categories };
}
