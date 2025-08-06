"use client";

import useGetAllCategories from "@/hooks/category/useGetAllCategories";
import DateFormater from "@/utils/DateFormater";
import {
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useState } from "react";
import ConfirmModal from "../../modal/ConfirmModal";
import useDeleteCategory from "@/hooks/category/useDeleteCategory";
import { useRouter } from "next/navigation";

interface category {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const CategoriesTable: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [selectedCategoryId, setselectedCategoryId] = useState<string>("");

  const [selectedCategoryTitel, setselectedCategoryTitel] =
    useState<string>("");

  const { deletecategory } = useDeleteCategory();

  const { categories, isLoadngCategories } = useGetAllCategories();

  const router = useRouter();

  function handleConfirm() {
    deletecategory(selectedCategoryId);
    setShowModal(false);
  }

  if (isLoadngCategories) {
    return (
      <div className="flex justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">در حال بارگذاری...</h1>
        <ArrowPathIcon className="size-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-full">
        <h1 className="font-bold text-primary text-xl">
          دسته بندی ای وجود ندارد
        </h1>
        <button
          onClick={() => {
            router.push("/admin/categories/new");
          }}
        >
          ساخت اولین دسته بندی
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="gap-4 grid grid-rows-[auto_1fr]">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>عنوان</th>
                <th>توضیحات</th>
                <th>تاریخ ایجاد</th>
                <th>تاریخ آخرین تغییر</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: category) => (
                <tr key={category?._id}>
                  <td>{category.title}</td>
                  <td>{category?.description}</td>
                  <td>{DateFormater(category?.createdAt)}</td>
                  <td>{DateFormater(category?.updatedAt)}</td>
                  <td>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/categories/${category?._id}/edit`)
                        }
                        className="text-blue-500"
                      >
                        <PencilIcon className="size-4" />
                      </button>
                      <button
                        onClick={() => {
                          setselectedCategoryId(category?._id);
                          setselectedCategoryTitel(category?.title);
                          setShowModal(true);
                        }}
                        className="text-red-500"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-max">
          <Link
            className="text-blue-500 underline"
            href="/admin/categories/new"
          >
            ایجاد دسته بندی جدید
          </Link>
        </div>
      </div>

      {showModal && (
        <ConfirmModal
          content={`آیا از حذف دسته بندی ${selectedCategoryTitel} مطمعن هستید ؟`}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default CategoriesTable;
