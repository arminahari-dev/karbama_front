import { authFetch } from "@/utils/authFetch";

export const GetAllUsers = async () => {
  const res = await authFetch("/admin/user/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data?.users;
};

export const VerifyUser = async (userid: string, status: string) => {
  const res = await authFetch(`/admin/user/verify/${userid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return res.data?.message;
};
