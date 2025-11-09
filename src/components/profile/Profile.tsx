"use client";

import { useEffect, useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import toast from "react-hot-toast";
import useGetUserProfile from "@/hooks/user/useGetUserProfile";
import useUserProfileMutations from "@/hooks/user/useUserProfileMutations";
import UserInfoCard from "@/components/ui/card/UserInfoCard";
import UserAvatarCard from "@/components/ui/card/UserAvatarCard";
import ResumeUploader from "@/components/resume/ResumeUploader";
import EditModal from "../ui/modal/EditModal ";
import Skeleton from "@/components/ui/skeleton/Skeleton ";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

type ModalType = "biography" | "phoneNumber" | "email" | null;

const Profile: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [biographyValue, setBiographyValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [resumeUploading, setResumeUploading] = useState(false);

  const { userprofile, isLoadingUser } = useGetUserProfile();
  const { setNotification } = useNotification();

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
    if (userprofile?.role === "FREELANCER" && !userprofile?.resume) {
      const banner = (
        <div className="flex justify-center items-center gap-2 bg-[#1e2a49] !p-4">
          <InformationCircleIcon className="size-6 text-text" />
          <span className="text-text">همین حالا رزومه خود را اپلود کنید</span> 
        </div>
      );
      setNotification(banner);
    }
    return () => {
      setNotification(null);
    };
  }, [userprofile, setNotification]);

  const handleSubmit = () => {
    switch (activeModal) {
      case "biography":
        if (biographyValue === "" || biographyValue.length < 30) {
          return toast.error(
            "بایوگرافی نمی تواند خالی یا کمتر از 30 کاراکتر باشد"
          );
        }
        updateUserBiography({ biography: biographyValue });
        break;

      case "phoneNumber":
        const phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(phoneNumberValue)) {
          return toast.error("شماره موبایل وارد شده معتبر نیست");
        }
        updateUserPhoneNumber({ phoneNumber: phoneNumberValue });
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
          return toast.error("ایمیل وارد شده معتبر نیست");
        }
        updateUserEmail({ email: emailValue });
        break;

      default:
        break;
    }
    setActiveModal(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return toast.error("لطفاً فقط فایل عکس انتخاب کنید.");
      }
      const picture = new FormData();
      picture.append("avatar", file);
      updateUserProfilePicture(picture);
    }
    e.target.value = "";
  };

  const handleResumeUpload = async (formData: FormData) => {
    setResumeUploading(true);
    try {
      await uloadUserResume(formData);
    } finally {
      setResumeUploading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 text-text">
        <h1 className="font-bold text-2xl">پروفایل کاربری</h1>
        <div className="flex flex-col gap-4 overflow-auto">
          <div className="gap-4 grid grid-cols-[2fr_1fr] max-tablet:grid-cols-none max-tablet:grid-rows-[1fr_1fr] max-tablet:h-full">
            <UserInfoCard
              user={userprofile}
              isLoading={isLoadingUser}
              onEdit={setActiveModal}
            />
            <UserAvatarCard
              user={userprofile}
              isLoading={isLoadingUser}
              onAvatarChange={handleAvatarChange}
            />
          </div>
          {isLoadingUser && userprofile?.role === "FREELANCER" ? (
            <Skeleton width="100%" height="8rem" />
          ) : (
            userprofile?.role === "FREELANCER" && (
              <ResumeUploader
                resume={userprofile?.resume}
                uploading={resumeUploading}
                onUpload={handleResumeUpload}
              />
            )
          )}
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
                activeModal === "biography" ? "h-45" : "h-10"
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
              maxLength={activeModal === "biography" ? 200 : 30}
            />
          }
        />
      )}
    </>
  );
};

export default Profile;
