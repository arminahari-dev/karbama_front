"use client";

import Skeleton from "@/components/ui/skeleton/Skeleton ";
import useGetAllUsers from "@/hooks/admin/useGetAllUsers";
import { CheckBadgeIcon, UsersIcon } from "@heroicons/react/24/solid";

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  biography: string;
  role: string;
  status: string;
  isVerifiedPhoneNumber: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard: React.FC = () => {
  const { users, isLoadingUsers } = useGetAllUsers();

  const numOfUsers = users?.filter(
    (user: User) => user?.role !== "ADMIN"
  ).length;

  const numOfVerifyUsers = users?.filter(
    (user: User) => user?.status == "2" && user?.role !== "ADMIN"
  ).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-2">
        <h1 className="font-bold text-text text-2xl">آمار کلی</h1>
        <p className="text-secondary text-right">
          اینجا می‌توانید اطلاعات و آمار مربوط به کاربر های خود را مشاهده کنید.
        </p>
      </div>
      <div className="gap-4 grid !grid-cols-2 max-tablet:!grid-cols-1">
        <div className="flex flex-row justify-between items-center bg-foreground !px-6 !py-4 border border-border rounded-lg text-text">
          <div className="flex flex-col items-center gap-2 text-2xl">
            <span>کاربرها</span>
            {isLoadingUsers ? (
              <Skeleton width="2rem" height="2rem" />
            ) : (
              <span className="font-bold">{numOfUsers ? numOfUsers : 0}</span>
            )}
          </div>
          <div>
            <UsersIcon className="size-18" />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center bg-foreground !px-6 !py-4 border border-border rounded-lg text-text">
          <div className="flex flex-col items-center gap-2 text-2xl">
            <span>کاربرهای تایید شده</span>
            {isLoadingUsers ? (
              <Skeleton width="2rem" height="2rem" />
            ) : (
              <span className="font-bold">
                {numOfVerifyUsers ? numOfVerifyUsers : 0}
              </span>
            )}
          </div>
          <div>
            <CheckBadgeIcon className="size-18" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
