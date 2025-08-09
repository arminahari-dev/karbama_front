"use client";

import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import useGetCategoryById from "@/hooks/category/useGetCategoryById";
import Skeleton from "../../skeleton/Skeleton ";
import useAddNewCategory from "@/hooks/category/useAddNewCategory";
import useEditCategory from "@/hooks/category/useEditCategory";
import { useEffect } from "react";
import useGetAllCategories from "@/hooks/category/useGetAllCategories";

type Inputs = {
  title: string;
  englishTitle: string;
  description: string;
  type: string;
  parent?: string;
};

interface category {
  _id: string;
  title: string;
}

const CategoryForm: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").filter(Boolean)[2];
  const path = pathname.split("/").filter(Boolean)[3];

  const isEditMode = path === "edit" && Boolean(id);

  const { categories } = useGetAllCategories();

  const { category, isLoadngCategory } = useGetCategoryById(
    isEditMode ? id : ""
  );

  const { createNewCategory } = useAddNewCategory();

  const { updateCategory } = useEditCategory();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const watchAll = watch();

  const isDisabled =
    !watchAll.title ||
    !watchAll.englishTitle ||
    !watchAll.description ||
    !watchAll.type;

  useEffect(() => {
    if (isEditMode && category) {
      setValue("title", category.title);
      setValue("englishTitle", category.englishTitle);
      setValue("description", category.description);
      setValue("type", category.type);
      setValue("parent", category.parent);
    }
  }, [isEditMode, category, setValue]);

  const onSubmit = async (data: Inputs) => {
    if (isEditMode) {
      await updateCategory({ id, categorylData: data });
    } else {
      await createNewCategory(data);
    }

    router.push("/admin/categories");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-foreground shadow-lg !p-4 rounded-lg h-dvh"
    >
      <div className="grid grid-rows-[10%_90%] h-full">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-text text-2xl text-center">
            {isEditMode ? (
              <div className="flex justify-center items-center gap-4">
                <span>ویرایش دسته بندی</span>
              </div>
            ) : (
              <span className="font-bold">ایجاد دسته بندی جدید</span>
            )}
          </h1>
        </div>

        <div className="flex flex-col gap-4 h-full overflow-y-auto">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold text-text">
              عنوان :
            </label>
            {isLoadngCategory ? (
              <Skeleton width="100%" height="20rem" />
            ) : (
              <input
                id="title"
                className="input"
                placeholder="عنوان را وارد کنید"
                {...register("title", {
                  required: "این فیلد الزامی است",
                  minLength: { value: 15, message: "حداقل 15 کاراکتر" },
                })}
              />
            )}
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="englishTitle" className="font-semibold text-text">
              عنوان انگلیسی :
            </label>
            {isLoadngCategory ? (
              <Skeleton width="100%" height="20rem" />
            ) : (
              <input
                id="englishTitle"
                className="input"
                placeholder="عنوان را وارد کنید"
                {...register("englishTitle", {
                  required: "این فیلد الزامی است",
                  minLength: { value: 15, message: "حداقل 15 کاراکتر" },
                })}
              />
            )}
            {errors.englishTitle && (
              <span className="text-red-500 text-sm">
                {errors.englishTitle.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold text-text">
              توضیحات (به انگلیسی) :
            </label>
            {isLoadngCategory ? (
              <Skeleton width="100%" height="20rem" />
            ) : (
              <textarea
                id="description"
                className="!h-[20rem] input"
                placeholder="توضیحات را وارد کنید(به انگلیسی)"
                {...register("description", {
                  required: "این فیلد الزامی است",
                  minLength: { value: 15, message: "حداقل 15 کاراکتر" },
                  validate: (value) =>
                    /^[\x00-\x7F\s.,!?'"()\-@#:;]+$/.test(value),
                })}
              />
            )}
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="font-semibold text-text">
              نوع دسته‌بندی :
            </label>
            <select
              id="type"
              className="input"
              {...register("type", { required: "این فیلد الزامی است" })}
            >
              <option value="">انتخاب کنید</option>
              <option value="project">پروژه</option>
              <option value="post">پست</option>
              <option value="comment">کامنت</option>
              <option value="ticket">تیکت</option>
            </select>
            {errors.type && (
              <span className="text-red-500 text-sm">
                {errors.type.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="parent" className="font-semibold text-text">
              دسته‌بندی والد :
            </label>
            <select id="parent" className="input" {...register("parent")}>
              <option>-</option>
              <option value="">بدون والد (دسته‌بندی اصلی)</option>
              {categories?.map((cat: category) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="button" disabled={isDisabled}>
            {isEditMode ? "ذخیره تغییرات" : "ایجاد درخواست"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
