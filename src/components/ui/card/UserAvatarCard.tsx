import { useRef } from "react";
import Image from "next/image";
import {
  CheckBadgeIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Skeleton from "../skeleton/Skeleton ";

interface UserAvatarCardProps {
  user?: {
    name?: string;
    status?: number;
    avatarUrl?: string;
  };
  isLoading: boolean;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserAvatarCard({
  user,
  isLoading,
  onAvatarChange,
}: UserAvatarCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col justify-center items-center gap-4 order-2 max-tablet:order-1 bg-foreground !p-4 border border-border rounded-lg h-full text-text">
      {isLoading ? (
        <Skeleton width="13rem" height="2rem" />
      ) : (
        <h2 className="font-bold text-xl">{user?.name}</h2>
      )}
      {isLoading ? (
        <Skeleton width="11rem" height="2rem" />
      ) : (
        <span className="flex items-center text-xl">
          <CheckBadgeIcon className="size-5" />
          &nbsp;
          {user?.status === 2 && "کاربر تایید شده"}
        </span>
      )}
      {isLoading ? (
        <Skeleton width="7.5rem" height="7.5rem" classname="rounded-full" />
      ) : (
        <div
          className="relative cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={onAvatarChange}
          />
          {user?.avatarUrl ? (
            <Image
              className="border border-border rounded-full size-28"
              src={user.avatarUrl}
              alt="profile pic"
              width={120}
              height={120}
            />
          ) : (
            <UserCircleIcon className="border border-border rounded-full size-28" />
          )}
          <div className="top-19 right-19 absolute bg-foreground p-2 border border-border rounded-full">
            <PencilIcon className="size-5 text-text" />
          </div>
        </div>
      )}
    </div>
  );
}
