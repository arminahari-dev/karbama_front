"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import useCreateNewProject from "@/hooks/project/useCreateNewProject";
import useGetOwnerProjectById from "@/hooks/project/useGetOwnerProjectById";
import useGetAllCategories from "@/hooks/category/useGetAllCategories";
import Skeleton from "../../skeleton/Skeleton ";
import useUpdateProject from "@/hooks/project/useUpdateProject";

interface Inputs {
  title: string;
  description: string;
  category: string;
  budget: string;
}

const ProjectForm: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").filter(Boolean)[2];
  const path = pathname.split("/").filter(Boolean)[3];

  const isEditMode = path === "edit" && Boolean(id);

  const { project, isLoadingProject } = useGetOwnerProjectById(
    isEditMode ? id : ""
  );

  const { categories } = useGetAllCategories();
  const { createNewProject } = useCreateNewProject();
  const { updateProject } = useUpdateProject();

  const [date, setDate] = useState<Date | null>(new Date());

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
    !watchAll.description ||
    !watchAll.budget ||
    !watchAll.category;

  useEffect(() => {
    if (isEditMode && project) {
      setValue("title", project.title);
      setValue("description", project.description);
      setValue(
        "budget",
        Number(
          String(project.budget)?.replace(/,/g, "").replace(/\D/g, "")
        ).toLocaleString()
      );
      setValue("category", project.category?._id);
      setDate(new Date(project.deadline));
    }
  }, [isEditMode, project, setValue]);

  const onSubmit = async (data: Inputs) => {
    const payload = {
      ...data,
      budget: data.budget.replace(/,/g, ""),
      deadline: date?.toISOString() || new Date().toISOString(),
    };

    if (isEditMode) {
      await updateProject({ id, projectData: payload });
    } else {
      await createNewProject(payload);
    }

    router.push("/owner/projects");
  };

  return (
    <form
      className="flex flex-col bg-foreground shadow-lg !pt-0 !pr-4 !pb-4 !pl-4 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-rows-[10%_90%] h-full">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-text text-2xl text-center">
            {isEditMode ? (
              <div className="flex justify-center items-center gap-4">
                <span>ویرایش پروژه</span>
                {isLoadingProject ? (
                  <Skeleton width="10rem" height="2rem" />
                ) : (
                  <span className="font-bold">{project?.title}</span>
                )}
              </div>
            ) : (
              <span className="font-bold">ایجاد پروژه جدید</span>
            )}
          </h1>
        </div>

        <div className="flex flex-col gap-4 h-full overflow-y-auto">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold text-text">
              عنوان :
            </label>
            {isLoadingProject ? (
              <Skeleton width="100%" height="2.5rem" />
            ) : (
              <input
                id="title"
                className="input"
                placeholder="عنوان پروژه را وارد کنید"
                {...register("title", {
                  required: "این فیلد الزامی است",
                  minLength: { value: 10, message: "حداقل 10 کاراکتر" },
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
            <label htmlFor="description" className="font-semibold text-text">
              توضیحات :
            </label>
            {isLoadingProject ? (
              <Skeleton width="100%" height="20rem" />
            ) : (
              <textarea
                id="description"
                className="!h-[20rem] input"
                placeholder="توضیحات پروژه را وارد کنید"
                {...register("description", {
                  required: "این فیلد الزامی است",
                  minLength: { value: 15, message: "حداقل 15 کاراکتر" },
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
            <label htmlFor="budget" className="font-semibold text-text">
              بودجه (تومان) :
            </label>
            {isLoadingProject ? (
              <Skeleton width="100%" height="2.5rem" />
            ) : (
              <input
                id="budget"
                className="input"
                placeholder="بودجه پروژه را وارد کنید"
                {...register("budget", {
                  required: "این فیلد الزامی است",
                  validate: (value) =>
                    /^\d{1,3}(,\d{3})*$/.test(value) ||
                    "فقط عدد وارد کنید (مثال: 1,000,000)",
                })}
                onChange={(e) => {
                  const raw = e.target.value
                    .replace(/,/g, "")
                    .replace(/\D/g, "");
                  const formatted = Number(raw).toLocaleString();
                  setValue("budget", formatted);
                }}
              />
            )}
            {errors.budget && (
              <span className="text-red-500 text-sm">
                {errors.budget.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-semibold text-text">
              دسته بندی :
            </label>
            {isLoadingProject ? (
              <Skeleton width="100%" height="2.5rem" />
            ) : (
              <select
                id="category"
                className="input"
                {...register("category", { required: "این فیلد الزامی است" })}
              >
                <option value="" disabled>
                  دسته بندی را انتخاب کنید
                </option>
                {categories?.map((c: { _id: string; title: string }) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-text">دد لاین :</label>
            {isLoadingProject ? (
              <Skeleton width="100%" height="2.5rem" />
            ) : (
              <DatePicker
                value={date}
                onChange={(d) => setDate(d?.toDate() || new Date())}
                inputClass="datepicker"
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
              />
            )}
          </div>

          <button type="submit" className="button" disabled={isDisabled}>
            {isEditMode ? "ذخیره تغییرات" : "ایجاد پروژه"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
