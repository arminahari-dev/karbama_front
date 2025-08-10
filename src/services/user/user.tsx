import { authFetch } from "@/utils/authFetch";

export const GetUserProfile = async () => {
  const res = await authFetch("/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.user;
};

export const UpdateUserProfilePicture = async (file: FormData) => {
  const res = await authFetch("/upload/avatar", {
    method: "POST",
    body: file,
  });

  return res?.message;
};

export const UpdateUserBiography = async (biography: string) => {
  const res = await authFetch("/user/biography", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ biography }),
  });

  return res?.message;
};

export const UpdateUserPhoneNumber = async (phoneNumber: string) => {
  const res = await authFetch("/user/phone-number", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  });

  return res?.message;
};

export const UpdateUserEMail = async (email: string) => {
  const res = await authFetch("/user/email", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return res?.message;
};

export const UserLogOut = async () => {
  setTimeout(() => {
    authFetch("/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, 2000);
};
