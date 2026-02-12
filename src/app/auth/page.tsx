"use client";

import React, { FormEvent, useEffect, useState } from "react";

const SendOtpCard = React.lazy(
  () => import("@/components/ui/card/SendOtpCard"),
);
import useSendOtp from "@/hooks/auth/useSendOtp";

const CheckOtpCard = React.lazy(
  () => import("@/components/ui/card/CheckOtpCard"),
);
import useCheckOtp from "@/hooks/auth/useCheckOtp";

import { useRouter } from "next/navigation";

const Auth: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const { sendOtp, isPendingSendOtp, isSuccessSendOtp } = useSendOtp();
  const { checkOtp, isPendingCheckOtp } = useCheckOtp();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPhoneNumber(value);
    const pattern = /^(\+98|0)9\d{9}$/;
    setDisabled(!pattern.test(value));
  }

  const handleSendOtp = (e: FormEvent) => {
    e.preventDefault();
    sendOtp(phoneNumber);
  };

  const handleCheckOtp = async (e: FormEvent) => {
    e.preventDefault();
    const { user } = await checkOtp({ phoneNumber, otp });

    if (!user?.isActive) {
      router.push("/completeprofile");
    }

    if (user?.isActive && user?.status === 1) {
      router.push("/");
    }

    if (user?.isActive && user?.status === 2) {
      window.location.href = `/${user?.role.toLowerCase()}/dashboard`;
    }
  };

  useEffect(() => {
    if (isSuccessSendOtp) {
      setStep(2);
    }
  }, [isSuccessSendOtp]);

  return step === 1 ? (
    <SendOtpCard
      title="ورود | ثبت نام"
      input={{
        type: "text",
        placeholder: "شماره تلفن",
        value: phoneNumber,
        onChange: handleChange,
      }}
      btnTitle={"تایید"}
      disabled={disabled}
      isPending={isPendingSendOtp}
      onSubmit={(e) => handleSendOtp(e)}
    />
  ) : (
    <CheckOtpCard
      title="کد تایید را وارد کنید"
      btnTitle="تایید"
      phoneNumber={phoneNumber}
      otp={otp}
      setOtp={setOtp}
      disabled={otp.length !== 6}
      onSubmit={(e) => handleCheckOtp(e)}
      setStep={setStep}
      isPending={isPendingCheckOtp}
      sendOtp={() => {
        sendOtp(phoneNumber);
      }}
    />
  );
};

export default Auth;
