import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import ProgressCircle from "../progres/ProgressCircle";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface CheckOtpCardProps {
  title: string;
  btnTitle: string;
  phoneNumber: string;
  otp: string;
  setOtp: (otp: string) => void;
  disabled?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setStep: (step: number) => void;
  isPending: boolean;
  sendOtp: () => void;
}

const CheckOtpCard: React.FC<CheckOtpCardProps> = ({
  title,
  btnTitle,
  phoneNumber,
  otp,
  setOtp,
  disabled,
  onSubmit,
  setStep,
  isPending,
  sendOtp,
}) => {
  const [counter, setCounter] = useState(90);

  function handleEditPhoneNumber() {
    setStep(1);
  }

  const handleSendOtp = () => {
    sendOtp();
    setCounter(90);
  };

  useEffect(() => {
    if (counter === 0) return;
    const intervalId = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <div className="flex justify-center items-center max-tablet:!p-8 h-full">
      <form
        onSubmit={onSubmit}
        className="w-[34rem] card"
        style={{ direction: "ltr" }}
      >
        <div className="flex justify-center items-center">
          <ProgressCircle
            duration={90}
            color="#00C896"
            size={140}
            strokeWidth={8}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-primary text-xl text-center">
            {title}
          </h1>

          <p className="font-semibold text-secondary text-lg text-center">
            کد تایید به شماره موبایل <span>{phoneNumber}</span> ارسال شد
          </p>
        </div>
        <OTPInput
          containerStyle={"!flex !justify-between !w-full"}
          inputStyle={
            "input !w-[3rem] !h-[3rem] max-[440px]:!w-[2.5rem] max-[440px]:!h-[2.5rem] max-[375px]:!w-[2rem] max-[375px]:!h-[2rem] text-center"
          }
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="text-text"></span>}
          renderInput={(props) => <input {...props} />}
        />
        <button disabled={disabled}>
          {isPending ? (
            <div className="flex justify-center items-center">
              <ArrowPathIcon className="size-6 text-text animate-spin" />
            </div>
          ) : (
            `${btnTitle}`
          )}
        </button>
        {counter === 0 && (
          <div className="flex flex-row-reverse max-mobile:flex-col justify-between max-mobile:items-center max-mobile:gap-4">
            <a onClick={handleSendOtp}>ارسال مجدد کد</a>
            <a onClick={handleEditPhoneNumber}>ویرایش شماره موبایل</a>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckOtpCard;
