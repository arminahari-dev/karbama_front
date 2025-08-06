import { GetAllUsers } from "@/services/admin/AdminServices";
import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = () => {
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["userslist"],
    queryFn: GetAllUsers,
  });

  return { users, isLoadingUsers };
};

export default useGetAllUsers;
