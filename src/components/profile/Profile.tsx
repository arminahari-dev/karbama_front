"use client";

import EditModal from "@/components/ui/modal/EditModal ";
import Skeleton from "@/components/ui/skeleton/Skeleton ";
import useGetUserProfile from "@/hooks/user/useGetUserProfile";
import useUserProfileMutations from "@/hooks/user/useUserProfileMutations";
import DateFormater from "@/utils/DateFormater";
import {
  CheckBadgeIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ModalType = "biography" | "phoneNumber" | "email" | null;

const Profile: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const { userprofile, isLoadingUser } = useGetUserProfile();

  const [biographyValue, setBiographyValue] = useState("");

  const [phoneNumberValue, setPhoneNumberValue] = useState("");

  const [emailValue, setEmailValue] = useState("");

  const {
    updateUserEmail,
    updateUserBiography,
    updateUserPhoneNumber,
    updateUserProfilePicture,
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

  return (
    <>
      <div className="flex flex-col gap-6 px-6 py-8 whitespace-nowrap">
        <h1 className="mb-6 font-bold text-text text-2xl">پروفایل کاربری</h1>
        <div className="gap-6 grid grid-cols-[2fr_1fr] max-tablet:grid-cols-none max-tablet:grid-rows-[2fr_1fr] max-tablet:h-full overflow-auto">
          <div className="flex flex-col items-start gap-4 order-1 max-tablet:order-2 !p-6 border border-border rounded-lg text-text">
            <h2 className="font-bold text-2xl">اطلاعات</h2>
            {isLoadingUser ? (
              <Skeleton width="15rem" height="2rem" />
            ) : (
              <div className="group flex items-center">
                <span>بایوگرافی :</span>&nbsp;
                <span className="w-64 max-mobile:w-30 font-bold text-xl truncate">
                  {userprofile?.biography || "-"}
                </span>
                &nbsp;
                <PencilIcon
                  onClick={() => setActiveModal("biography")}
                  className="opacity-0 group-hover:opacity-100 size-4 transition-opacity duration-200 cursor-pointer"
                />
              </div>
            )}
            {isLoadingUser ? (
              <Skeleton width="13rem" height="2rem" />
            ) : (
              <div className="group flex items-center">
                <span>موبایل :</span>&nbsp;
                <span className="font-bold text-xl">
                  {userprofile?.phoneNumber}
                </span>
                &nbsp;
                <PencilIcon
                  onClick={() => setActiveModal("phoneNumber")}
                  className="opacity-0 group-hover:opacity-100 size-4 transition-opacity duration-200 cursor-pointer"
                />
              </div>
            )}
            {isLoadingUser ? (
              <Skeleton width="11rem" height="2rem" />
            ) : (
              <div className="group flex items-center">
                <span>ایمیل :</span>&nbsp;
                <span className="w-max max-mobile-m:w-40 font-bold text-xl truncate">
                  {userprofile?.email}
                </span>
                &nbsp;
                <PencilIcon
                  onClick={() => setActiveModal("email")}
                  className="opacity-0 group-hover:opacity-100 size-4 transition-opacity duration-200 cursor-pointer"
                />
              </div>
            )}
            {isLoadingUser ? (
              <Skeleton width="9rem" height="2rem" />
            ) : (
              <div className="flex items-center">
                <span>تاریخ عضویت :</span>&nbsp;
                <span className="text-xl">
                  {DateFormater(userprofile?.createdAt)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-4 order-2 max-tablet:order-1 !p-6 border border-border rounded-lg text-text">
            {isLoadingUser ? (
              <Skeleton width="15rem" height="2rem" />
            ) : (
              <h2 className="font-bold text-xl">{userprofile?.name}</h2>
            )}

            {isLoadingUser ? (
              <Skeleton width="13rem" height="2rem" />
            ) : (
              <span className="flex items-center text-xl">
                {userprofile?.status === 2 && "کابر تایید شده"}
                &nbsp;
                <CheckBadgeIcon className="size-5" />
              </span>
            )}

            {isLoadingUser ? (
              <Skeleton
                width="7.5rem"
                height="7.5rem"
                classname="rounded-full"
              />
            ) : (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profile-pic-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const picture = new FormData();
                      picture.append("avatar", file);
                      updateUserProfilePicture(picture);
                    }
                  }}
                />
                <label
                  htmlFor="profile-pic-upload"
                  className="top-19 right-19 absolute bg-foreground !p-2 border border-border rounded-full cursor-pointer"
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
