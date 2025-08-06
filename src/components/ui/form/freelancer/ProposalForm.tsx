"use client";

import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import useGetFreelancerProposalById from "@/hooks/prposal/useGetFreelancerProposalById";
import Skeleton from "../../skeleton/Skeleton ";

import useEditFreelancerProposal from "@/hooks/prposal/useEditFreelancerProposal";
import { useEffect } from "react";
import useAddNewFreelancerProposal from "@/hooks/prposal/useAddnewFreelancerProposal";

type Inputs = {
  description: string;
  price: string;
  duration: string;
};

const ProposalForm: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").filter(Boolean)[2];
  const path = pathname.split("/").filter(Boolean)[3];

  const isEditMode = path === "edit" && Boolean(id);

  const { proposal, isLoadingProposal } = useGetFreelancerProposalById(
    isEditMode ? id : ""
  );

  const { createNewPropsal } = useAddNewFreelancerProposal();

  const { updateProposal } = useEditFreelancerProposal();

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
    !watchAll.description || !watchAll.price || !watchAll.duration;

  useEffect(() => {
    if (isEditMode && proposal) {
      setValue("description", proposal.description);
      setValue(
        "price",
        Number(
          String(proposal.price)?.replace(/,/g, "").replace(/\D/g, "")
        ).toLocaleString()
      );
      setValue("duration", proposal.duration);
    }
  }, [isEditMode, proposal, setValue]);

  const onSubmit = async (data: Inputs) => {
    const newProposalpayload = {
      ...data,
      price: data.price.replace(/,/g, ""),
      projectId: id,
    };

    const editProposalpayload = {
      ...data,
      price: data.price.replace(/,/g, ""),
    };

    if (isEditMode) {
      await updateProposal({ id, proposalData: editProposalpayload });
    } else {
      await createNewPropsal(newProposalpayload);
    }

    router.push("/freelancer/proposals");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-foreground shadow-lg !p-4 rounded-lg h-full"
    >
      <div className="grid grid-rows-[10%_90%] h-full">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-text text-2xl text-center">
            {isEditMode ? (
              <div className="flex justify-center items-center gap-4">
                <span>ویرایش درخواست</span>
              </div>
            ) : (
              <span className="font-bold">ایجاد درخواست جدید</span>
            )}
          </h1>
        </div>

        <div className="flex flex-col gap-4 h-full overflow-y-auto">
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold text-text">
              توضیحات :
            </label>
            {isLoadingProposal ? (
              <Skeleton width="100%" height="20rem" />
            ) : (
              <textarea
                id="description"
                className="!h-[20rem] input"
                placeholder="توضیحات خود را وارد کنید"
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
            <label htmlFor="price" className="font-semibold text-text">
              مبلغ پیشنهادی (تومان) :
            </label>
            {isLoadingProposal ? (
              <Skeleton width="100%" height="2.5rem" />
            ) : (
              <input
                id="price"
                className="input"
                placeholder="مبلغ مورد نظر خود را وارد کنید"
                {...register("price", {
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
                  setValue("price", formatted);
                }}
              />
            )}
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="duration" className="font-semibold text-text">
              مدت زمان انجام پروژه (روز) :
            </label>
            {isLoadingProposal ? (
              <Skeleton width="100%" height="2.5rem" />
            ) : (
              <input
                id="duration"
                className="input"
                placeholder="مدت زمان انجام پروژه را وارد کنید"
                {...register("duration", {
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
                  setValue("duration", formatted);
                }}
              />
            )}
          </div>

          <button type="submit" className="button" disabled={isDisabled}>
            {isEditMode ? "ذخیره تغییرات" : "ایجاد درخواست"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProposalForm;
