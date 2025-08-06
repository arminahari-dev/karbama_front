import { GetCategoryById } from "@/services/category/Category";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategoryById(id: string) {
  const { data: category, isLoading: isLoadngCategory } = useQuery({
    queryKey: ["category", id],
    queryFn: () => GetCategoryById(id),
    enabled: Boolean(id),
  });

  return { isLoadngCategory, category };
}
