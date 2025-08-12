import {
  UpdateUserProfilePicture,
  UpdateUserBiography,
  UpdateUserPhoneNumber,
  UpdateUserEMail,
  UploadUserResume,
} from "@/services/user/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUserProfileMutations = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateUserProfilePicture } = useMutation({
    mutationFn: (file: FormData) => UpdateUserProfilePicture(file),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
    },
  });

  const { mutateAsync: updateUserBiography } = useMutation({
    mutationFn: ({ biography }: { biography: string }) =>
      UpdateUserBiography(biography),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
    },
  });

  const { mutateAsync: updateUserPhoneNumber } = useMutation({
    mutationFn: ({ phoneNumber }: { phoneNumber: string }) =>
      UpdateUserPhoneNumber(phoneNumber),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
    },
  });

  const { mutateAsync: updateUserEmail } = useMutation({
    mutationFn: ({ email }: { email: string }) => UpdateUserEMail(email),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
    },
  });

  const { mutateAsync: uloadUserResume } = useMutation({
    mutationFn: (file: FormData) => UploadUserResume(file),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
    },
  });

  return {
    updateUserProfilePicture,
    updateUserBiography,
    updateUserPhoneNumber,
    updateUserEmail,
    uloadUserResume,
  };
};

export default useUserProfileMutations;
