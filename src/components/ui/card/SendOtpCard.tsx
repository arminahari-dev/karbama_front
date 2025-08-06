import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React, { InputHTMLAttributes } from "react";

interface SendOtpCardProps {
  title: string;
  input: InputHTMLAttributes<HTMLInputElement>;
  btnTitle: string;
  disabled?: boolean;
  isPending: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SendOtpCard: React.FC<SendOtpCardProps> = ({
  title,
  input,
  btnTitle,
  disabled,
  isPending,
  onSubmit,
}) => {
  return (
    <div className="flex justify-center items-center max-tablet:!p-8 h-full">
      <form onSubmit={onSubmit} className="w-[26rem] h-[16rem] card">
        <h1 className="font-bold text-primary text-xl text-center">{title}</h1>
        <input
          type="tel"
          pattern="(\+98|0)9\d{9}"
          maxLength={11}
          {...input}
          className="text-left placeholder:text-right input"
        />
        <button disabled={disabled}>
          {isPending ? (
            <ArrowPathIcon className="size-6 text-primary animate-spin" />
          ) : (
            `${btnTitle}`
          )}
        </button>
      </form>
    </div>
  );
};

export default SendOtpCard;
