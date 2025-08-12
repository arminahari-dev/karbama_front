"use client";

import EditModal from "@/components/ui/modal/EditModal ";
import Skeleton from "@/components/ui/skeleton/Skeleton ";
import useGetUserProfile from "@/hooks/user/useGetUserProfile";
import useUserProfileMutations from "@/hooks/user/useUserProfileMutations";
import DateFormater from "@/utils/DateFormater";
import {
  ArrowUpOnSquareStackIcon,
  CheckBadgeIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

type ModalType = "biography" | "phoneNumber" | "email" | null;

const Profile: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const { userprofile, isLoadingUser } = useGetUserProfile();

  const [biographyValue, setBiographyValue] = useState("");

  const [phoneNumberValue, setPhoneNumberValue] = useState("");

  const [emailValue, setEmailValue] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [resumeUploading, setResumeUploading] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const {
    updateUserEmail,
    updateUserBiography,
    updateUserPhoneNumber,
    updateUserProfilePicture,
    uloadUserResume,
  } = useUserProfileMutations();

  useEffect(() => {
    if (userprofile) {
      setBiographyValue(userprofile.biography || "");
      setPhoneNumberValue(userprofile.phoneNumber || "");
      setEmailValue(userprofile.email || "");
    }
  }, [userprofile]);

  const handleSubmit = () => {
    switch (activeModal) {
      case "biography":
        if (biographyValue === "" || biographyValue.length < 30) {
          toast.error("بایوگرافی نمی تواند خالی یا کمتر از 30 کاراکتر باشد");
          return;
        }
        updateUserBiography({ biography: biographyValue });
        break;

      case "phoneNumber":
        const phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(phoneNumberValue)) {
          toast.error("شماره موبایل وارد شده معتبر نیست");
          return;
        }
        updateUserPhoneNumber({ phoneNumber: phoneNumberValue });
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
          toast.error("ایمیل وارد شده معتبر نیست");
          return;
        }
        updateUserEmail({ email: emailValue });
        break;

      default:
        break;
    }

    setActiveModal(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("فقط فایل PDF مجاز است");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم فایل باید کمتر از 2 مگابایت باشد");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setResumeUploading(true);
    try {
      await uloadUserResume(formData);
    } finally {
      setResumeUploading(false);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // اعتبارسنجی فایل (دقیقا مثل بالا)
    if (file.type !== "application/pdf") {
      toast.error("فقط فایل PDF مجاز است");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم فایل باید کمتر از 2 مگابایت باشد");
      return;
    }

    // آپلود
    const formData = new FormData();
    formData.append("resume", file);

    setResumeUploading(true);
    try {
      await uloadUserResume(formData);
    } finally {
      setResumeUploading(false);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-text text-2xl">پروفایل کاربری</h1>
        <div className="flex flex-col gap-4 overflow-auto">
          <div className="gap-4 grid grid-cols-[2fr_1fr] max-tablet:grid-cols-none max-tablet:grid-rows-[1fr_1fr] max-tablet:h-full">
            <div className="flex flex-col justify-center items-start gap-4 order-1 max-tablet:order-2 bg-foreground !p-4 border border-border rounded-lg h-full text-text">
              <h2 className="font-bold text-2xl">اطلاعات</h2>
              {isLoadingUser ? (
                <Skeleton width="15rem" height="2rem" />
              ) : (
                <div className="flex items-center">
                  <span>بایوگرافی :</span>&nbsp;
                  <span
                    className={`${
                      userprofile?.biography && "w-64"
                    }  max-mobile:w-30 font-bold text-xl truncate`}
                  >
                    {userprofile?.biography || "-"}
                  </span>
                  &nbsp;
                  <PencilIcon
                    onClick={() => setActiveModal("biography")}
                    className="size-4 cursor-pointer"
                  />
                </div>
              )}
              {isLoadingUser ? (
                <Skeleton width="13rem" height="2rem" />
              ) : (
                <div className="flex items-center">
                  <span>موبایل :</span>&nbsp;
                  <span className="font-bold text-xl">
                    {userprofile?.phoneNumber}
                  </span>
                  &nbsp;
                  <PencilIcon
                    onClick={() => setActiveModal("phoneNumber")}
                    className="size-4 cursor-pointer"
                  />
                </div>
              )}
              {isLoadingUser ? (
                <Skeleton width="11rem" height="2rem" />
              ) : (
                <div className="flex items-center">
                  <span>ایمیل :</span>&nbsp;
                  <span className="w-max max-mobile-m:w-40 font-bold text-xl truncate">
                    {userprofile?.email}
                  </span>
                  &nbsp;
                  <PencilIcon
                    onClick={() => setActiveModal("email")}
                    className="size-4 cursor-pointer"
                  />
                </div>
              )}
              {isLoadingUser ? (
                <Skeleton width="9rem" height="2rem" />
              ) : (
                <div className="flex items-center">
                  <span>تاریخ عضویت :</span>&nbsp;
                  <span className="font-bold text-xl">
                    {DateFormater(userprofile?.createdAt)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center items-center gap-4 order-2 max-tablet:order-1 bg-foreground !p-4 border border-border rounded-lg h-full text-text">
              {isLoadingUser ? (
                <Skeleton width="13rem" height="2rem" />
              ) : (
                <h2 className="font-bold text-xl">{userprofile?.name}</h2>
              )}

              {isLoadingUser ? (
                <Skeleton width="11rem" height="2rem" />
              ) : (
                <span className="flex items-center text-xl">
                  <CheckBadgeIcon className="size-5" />
                  &nbsp;
                  {userprofile?.status === 2 && "کابر تایید شده"}
                </span>
              )}

              {isLoadingUser ? (
                <Skeleton
                  width="7.5rem"
                  height="7.5rem"
                  classname="rounded-full"
                />
              ) : (
                <div
                  className="relative cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profile-pic-upload"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (!file.type.startsWith("image/")) {
                        toast.error("فقط فایل‌های تصویری مجاز هستند");
                        return;
                      }

                      if (file.size > 2 * 1024 * 1024) {
                        toast.error("حجم فایل باید کمتر از 2 مگابایت باشد");
                        return;
                      }

                      const picture = new FormData();
                      picture.append("avatar", file);

                      await updateUserProfilePicture(picture);

                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  />
                  <label
                    htmlFor="profile-pic-upload"
                    className="top-19 right-19 absolute bg-foreground !p-2 border border-border rounded-full cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PencilIcon className="size-5 text-text" />
                  </label>

                  {userprofile?.avatarUrl ? (
                    <Image
                      className="border border-border rounded-full size-28"
                      src={userprofile.avatarUrl}
                      alt="profile pic"
                      width={120}
                      height={120}
                    />
                  ) : (
                    <UserCircleIcon className="border border-border rounded-full size-28" />
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => resumeInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col justify-center items-center gap-4 bg-foreground/25 !p-4 border-3 border-border border-dashed rounded-lg text-text text-center cursor-pointer ${
              isDragging && "!bg-muted !border-text"
            }`}
          >
            <ArrowUpOnSquareStackIcon className="size-8" />
            <h1 className="font-bold text-text text-xl">
              فایل رزومه‌تان را اینجا بکشید و رها کنید
            </h1>
            <span className="font-medium text-text text-base">
              یا برای انتخاب فایل کلیک کنید (فرمت PDF)
            </span>
            <input
              type="file"
              accept="application/pdf"
              ref={resumeInputRef}
              onChange={handleResumeChange}
              className="hidden"
              disabled={resumeUploading}
            />
          </div>
        </div>
      </div>

      {activeModal && (
        <EditModal
          content={
            activeModal === "biography"
              ? "ویرایش بایوگرافی"
              : activeModal === "phoneNumber"
              ? "ویرایش شماره موبایل"
              : "ویرایش ایمیل"
          }
          onConfirm={handleSubmit}
          onCancel={() => setActiveModal(null)}
          InputElement={
            <textarea
              className={`!p-2 outline-none border border-border rounded-lg ${
                activeModal === "biography"
                  ? "h-45"
                  : activeModal === "phoneNumber"
                  ? "h-10"
                  : "h-10"
              }`}
              value={
                activeModal === "biography"
                  ? biographyValue
                  : activeModal === "phoneNumber"
                  ? phoneNumberValue
                  : emailValue
              }
              onChange={(e) => {
                const value = e.target.value;
                if (activeModal === "biography") setBiographyValue(value);
                else if (activeModal === "phoneNumber")
                  setPhoneNumberValue(value);
                else if (activeModal === "email") setEmailValue(value);
              }}
              maxLength={
                activeModal === "biography"
                  ? 200
                  : activeModal === "phoneNumber"
                  ? 30
                  : 30
              }
            />
          }
        />
      )}
    </>
  );
};

export default Profile;
