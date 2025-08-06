import { GetUserProfile } from "@/services/user/user";
import { useQuery } from "@tanstack/react-query";

const useGetUserProfile = () => {
  const { data: userprofile, isLoading: isLoadingUser } = useQuery({
    queryKey: ["userprofile"],
    queryFn: GetUserProfile,
  });

  return { userprofile, isLoadingUser };
};

export default useGetUserProfile;
