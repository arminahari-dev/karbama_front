"use client";

import Image from "next/image";
import LOGO from "../../assets/images/LOGO.png";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-background">
      <nav className="flex justify-between items-center bg-foreground !px-6 !py-4 !h-20">
        <div>
          <Image alt="logo" src={LOGO} width={40} height={40} />
        </div>
        <button onClick={() => router.push("/auth")}>ورود / ثبت نام</button>
      </nav>

      <section className="flex flex-col justify-center items-center gap-4 !px-6 !py-8 text-center">
        <h1 className="font-extrabold text-primary text-3xl">
          به پلتفرم کارباما خوش آمدید
        </h1>
        <p className="font-semibold text-md text-secondary">
          پلتفرمی امن و سریع برای همکاری حرفه‌ای بین فریلنسرها و کارفرماها
        </p>
        <p className="font-semibold text-md text-secondary">
          مسیر خود را به سمت پروژه‌های حرفه‌ای یا یافتن استعدادهای مناسب آغاز
          کنید.
        </p>
        <button onClick={() => router.push("/auth")}>همین حالا شروع کن</button>
      </section>

      <section className="flex flex-col gap-4 bg-foreground !px-6 !py-8">
        <h2 className="font-semibold text-text text-3xl text-center">
          مراحل ثبت‌ نام
        </h2>
        <div className="gap-4 grid min-tablet:grid-cols-[1fr_30px_1fr_30px_1fr] max-tablet:grid-rows-[1fr_30px_1fr_30px_1fr] h-full">
          <div className="text-center card">
            <div className="text-5xl">🔑</div>
            <h3 className="font-semibold text-text text-xl">
              ورود یا ثبت‌ نام
            </h3>
            <p className="text-secondary">
              برای شروع، کافیست با شماره موبایل خود ثبت‌ نام کنید یا اگر حساب
              دارید، وارد شوید.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <ChevronDoubleLeftIcon className="max-tablet:hidden min-tablet:block w-max size-6 text-text" />
            <ChevronDoubleDownIcon className="min-tablet:hidden max-tablet:block w-max size-6 text-text" />
          </div>
          <div className="text-center card">
            <div className="text-5xl">📝</div>
            <h3 className="font-semibold text-text text-xl">
              احراز هویت تکمیلی
            </h3>
            <p className="text-secondary">
              ما برای حفظ امنیت و اعتماد بین کاربران، از شما اطلاعات لازم برای
              احراز هویت درخواست می‌کنیم.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <ChevronDoubleLeftIcon className="max-tablet:hidden min-tablet:block w-max size-6 text-text" />
            <ChevronDoubleDownIcon className="min-tablet:hidden max-tablet:block w-max size-6 text-text" />
          </div>
          <div className="text-center card">
            <div className="text-5xl">📧</div>
            <h3 className="font-semibold text-text text-xl">فعال‌سازی حساب</h3>
            <p className="text-secondary">
              پس از تایید اطلاعات، حساب شما فعال شده و می‌توانید از تمامی
              امکانات به عنوان فریلنسر یا کارفرما استفاده کنید.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-foreground !py-4 border-t border-border text-secondary text-sm text-center">
        <div className="flex flex-col justify-between items-center gap-4">
          <div className="flex justify-center items-center gap-4">
            <Image alt="logo" src={LOGO} width={40} height={40} />
            <span className="font-semibold text-text">کارباما</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a href="#" className="hover:!text-primary transition-all">
              درباره ما
            </a>
            <a href="#" className="hover:!text-primary transition-all">
              تماس با ما
            </a>
            <a href="#" className="hover:!text-primary transition-all">
              قوانین و مقررات
            </a>
            <a href="#" className="hover:!text-primary transition-all">
              سوالات متداول
            </a>
          </div>
          <div className="flex flex-col gap-8">
            <span>ساخته شده با ❤️ برای حرفه ای ها </span>
            <span>© {new Date().getFullYear()} تمامی حقوق محفوظ است.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
