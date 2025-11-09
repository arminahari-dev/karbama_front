"use client";

import React, { useState } from "react";
import useGetAllUsers from "@/hooks/admin/useGetAllUsers";
import DateFormater from "@/utils/DateFormater";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import EditModal from "../../modal/EditModal ";
import useVerifyUser from "@/hooks/admin/useVerifyUser";

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

const UsersTable: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const [status, setStatus] = useState<string>("");

  const { users, isLoadingUsers } = useGetAllUsers();

  const { verifyUser, isPendingVerifyUser } = useVerifyUser();

  const usersList = users?.filter((user: User) => user?.role !== "ADMIN");

  function handleOpenModal(id: string) {
    setSelectedUserId(id);
    setShowModal(true);
  }

  function handleConfirm() {
    verifyUser({
      userid: selectedUserId,
      status: status,
    });
    setShowModal(false);
  }

  if (isLoadingUsers) {
    return (
      <div className="flex justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">در حال بارگذاری...</h1>
        <ArrowPathIcon className="size-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!usersList || usersList.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">کاربری ای وجود ندارد</h1>
      </div>
    );
  }

  return (
    <>
      <div className="h-max overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>نام</th>
              <th>ایمیل</th>
              <th>شماره تلفن</th>
              <th>نقش</th>
              <th>وضعیت</th>
              <th>تایید شماره</th>
              <th>تاریخ ثبت نام</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user: User) => (
              <tr key={user?._id}>
                <td>{user.name}</td>
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>
                <td>
                  {user?.role === "OWNER"
                    ? "کارفرما"
                    : user?.role === "ّFREELANCER" && "فریلنسر"}
                </td>
                <td>
                  {user?.status == "1"
                    ? "در انتظار تایید"
                    : user?.status == "0"
                    ? "رد شده"
                    : "تایید شده"}
                </td>
                <td>
                  <div className="flex justify-center">
                    {user?.isVerifiedPhoneNumber && "تایید شده"}
                  </div>
                </td>
                <td>{DateFormater(user?.createdAt)}</td>
                <td>
                  <button
                    onClick={() => {
                      handleOpenModal(user?._id);
                    }}
                    disabled={user?.status == "2"}
                  >
                    {isPendingVerifyUser ? (
                      <ArrowPathIcon className="size-6 text-text animate-spin" />
                    ) : (
                      "تغییر وضعیت"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showModal && (
        <EditModal
          content="وضعیت کاربر را انتخاب کنید"
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
          InputElement={
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-background !px-4 !py-2 border-none rounded-lg outline-none"
            >
              <option>-</option>
              <option className="rounded-lg" value="2">
                تایید شده
              </option>
              <option className="rounded-lg" value="0">
                رد شده
              </option>
            </select>
          }
        />
      )}
    </>
  );
};

export default UsersTable;
