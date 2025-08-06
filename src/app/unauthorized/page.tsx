"use client";

import Image from "next/image";
import image from "../../../assets/images/403.png";
import { useRouter } from "next/navigation";

const Unauthorized: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center bg-background !p-4 h-full">
      <Image alt="403" src={image} width={600} height={600} />
      <button onClick={() => router.push("/")}>بازگشت به صفحه اصلی</button>
    </div>
  );
}

export default Unauthorized;
