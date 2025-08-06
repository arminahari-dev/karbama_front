import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen text-center">
      <h1 className="font-bold text-text text-xl"> صفحه مورد نظر پیدا نشد</h1>
      <Link className="font-bold" href="/">
        برگشت به صفحه اصلی
      </Link>
    </div>
  );
}

export default page;
