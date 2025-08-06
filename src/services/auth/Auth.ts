import upfetch from "../api/Api";

export const SendOtp = async ({ phoneNumber }: { phoneNumber: string }) => {
  const res = await upfetch("/user/get-otp", {
    method: "POST",
    body: { phoneNumber },
  });

  return { message: res.data.message };
};

export const CheckOtp = async ({
  phoneNumber,
  otp,
}: {
  phoneNumber: string;
  otp: string;
}) => {
  try {
    const res = await upfetch("/user/check-otp", {
      method: "POST",
      body: { phoneNumber, otp },
    });

    return { user: res.data.user, message: res.data.message };
  } catch {
    const message = "کد اشتباه است"

    throw new Error(message);
  }
};

export const CompleteProfile = async ({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: string;
}) => {
  const res = await upfetch("/user/complete-profile", {
    method: "POST",
    body: { name, email, role },
  });

  return { user: res.data.user, message: res.data.message };
};
