"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useCompleteProfile from "@/hooks/auth/useCompleteProfile";

const CompleteProfile: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ name: string; email: string; role: string }>({
    mode: "onChange",
  });

  const completeProfile = useCompleteProfile();

  const name = watch("name");
  const email = watch("email");
  const role = watch("role");

  const isDisabled = !name || !email || !role;

  const router = useRouter();

  async function handlecCompleteProfile(data: {
    name: string;
    email: string;
    role: string;
  }) {
    const { user } = await completeProfile(data);
    if (user?.role === "ADMIN") {
      router.push(`/${user?.role.toLowerCase()}/dashboard`);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex justify-center items-center max-tablet:!p-8 h-full">
      <div className="w-[30rem] card">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-text text-2xl text-center">
            تکمیل اطلاعات
          </h1>
          <p className="font-semibold text-secondary text-lg text-center">
            لطفا اطلاعات زیر را برای تکمیل پروفایل خود وارد کنید:
          </p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) => {
            handlecCompleteProfile(data);
          })}
        >
          <div className="flex flex-col gap-4 w-full">
            <input
              className="input"
              type="text"
              placeholder="نام"
              {...register("name", {
                required: "نام الزامی است",
                minLength: {
                  value: 6,
                  message: "نام باید حداقل 6 کاراکتر باشد",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}

            <input
              className="input"
              type="email"
              placeholder="آدرس ایمیل"
              {...register("email", {
                required: "آدرس ایمیل الزامی است",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "آدرس ایمیل معتبر نیست",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4 text-secondary text-sm">
            <h1 className="font-bold text-text">نقش خود را انتخاب کنید</h1>
            <div className="flex gap-4">
              <input
                className="peer checked:bg-primary border border-border checked:border-transparent rounded-full focus:outline-none w-4 h-4 appearance-none cursor-pointer"
                value="OWNER"
                type="radio"
                {...register("role")}
              />
              <label className="peer-checked:text-text">کارفرما</label>
            </div>
            <div className="flex gap-4">
              <input
                className="peer checked:bg-primary border border-border checked:border-transparent rounded-full focus:outline-none w-4 h-4 appearance-none cursor-pointer"
                value="FREELANCER"
                type="radio"
                {...register("role")}
              />
              <label className="peer-checked:text-text">فریلنسر</label>
            </div>
            <div className="flex gap-4">
              <input
                className="peer checked:bg-primary border border-border checked:border-transparent rounded-full focus:outline-none w-4 h-4 appearance-none cursor-pointer"
                value="ADMIN"
                type="radio"
                {...register("role")}
              />
              <label className="peer-checked:text-text">ادمین</label>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <button disabled={isDisabled} type="submit">
              ثبت
            </button>
          </div>
        </form>
        <p className="text-secondary text-sm text-center whitespace-pre-line">
          با کلیک روی دکمه ثبت، شما با <a href="/terms">شرایط خدمات</a> و&nbsp;
          <a href="/privacy">سیاست حفظ حریم خصوصی </a> موافقت می‌کنید.
        </p>
      </div>
    </div>
  );
};

export default CompleteProfile;
