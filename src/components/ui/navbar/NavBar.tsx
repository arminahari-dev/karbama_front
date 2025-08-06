"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  CogIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import useUserLogout from "@/hooks/user/useUserLogout";
import { useRouter } from "next/navigation";
import useGetUserProfile from "@/hooks/user/useGetUserProfile";
import Link from "next/link";
import Image from "next/image";

const NavBar: React.FC = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileCardRef = useRef<HTMLDivElement>(null);

  const handleUserClick = () => {
    setShowProfileCard(!showProfileCard);
  };

  const { userprofile } = useGetUserProfile();
  const { logoutuser } = useUserLogout();

  const router = useRouter();

  function handleLogout() {
    logoutuser();
    setTimeout(() => {
      router.push("/auth");
    }, 2000);
  }

  function handleGoToProfilePage() {
    router.push(`/${userprofile?.role?.toLowerCase()}/profile`);
    handleUserClick();
  }

  useEffect(() => {
    if (!showProfileCard) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target as Node)
      ) {
        setShowProfileCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileCard]);

  return (
    <>
      <nav className="flex justify-between items-center text-text">
        <div className="flex gap-4">
          <Link className="!text-text" href="#">
            راهنمایی
          </Link>
          <Link className="!text-text" href="#">
            پشتیبانی
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <BellIcon className="size-9 cursor-pointer" />
          {userprofile?.avatarUrl ? (
            <Image
              onClick={handleUserClick}
              alt="profile pic"
              width={36}
              height={36}
              loading="lazy"
              className="border border-border rounded-full size-9 cursor-pointer"
              src={userprofile?.avatarUrl}
            />
          ) : (
            <UserCircleIcon
              onClick={handleUserClick}
              className="border border-border rounded-full size-9 cursor-pointer"
            />
          )}
        </div>
      </nav>
      {showProfileCard && (
        <div
          ref={profileCardRef}
          className="top-20 left-4 z-10 absolute bg-foreground shadow-lg !p-4 border border-border rounded-lg min-w-48"
        >
          <ul className="flex flex-col gap-2">
            <li
              onClick={handleGoToProfilePage}
              className="flex !justify-between !items-center !px-4 !py-2 hover:bg-border rounded-lg text-text transition-colors duration-200 cursor-pointer"
            >
              <span>پروفایل</span>
              <UserCircleIcon className="size-5" />
            </li>
            <li className="flex !justify-between !items-center !px-4 !py-2 hover:bg-border rounded-lg text-text transition-colors duration-200 cursor-pointer">
              <span>تنظیمات</span>
              <CogIcon className="size-5" />
            </li>
            <li
              onClick={handleLogout}
              className="flex !justify-between !items-center !px-4 !py-2 hover:bg-border rounded-lg text-text transition-colors duration-200 cursor-pointer"
            >
              <span>خروج</span>
              <ArrowRightStartOnRectangleIcon className="size-5" />
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;
