"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../../../assets/images/LOGO.png";
import {
  ChartPieIcon,
  CreditCardIcon,
  PresentationChartBarIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const SideBarLinks: React.FC = () => {
  const pathname = usePathname();

  const sideBarlink = {
    admin: [
      {
        name: "داشبورد",
        path: "/admin/dashboard",
        icon: <ChartPieIcon className="size-6" />,
      },
      {
        name: "کاربران",
        path: "/admin/users",
        icon: <UserIcon className="size-6" />,
      },
      {
        name: "دسته بندی",
        path: "/admin/categories",
        icon: <TagIcon className="size-6" />,
      },
    ],
    owner: [
      {
        name: "آمار",
        path: "/owner/dashboard",
        icon: <ChartPieIcon className="size-6" />,
      },
      {
        name: "پروژه ها",
        path: "/owner/projects",
        icon: <PresentationChartBarIcon className="size-6" />,
      },
      {
        name: "پرداخت‌",
        path: "/owner/payments",
        icon: <CreditCardIcon className="size-6" />,
      },
    ],
    freelancer: [
      {
        name: "داشبورد",
        path: "/freelancer/dashboard",
        icon: <ChartPieIcon className="size-6" />,
      },
      {
        name: "پروژه ها",
        path: "/freelancer/available-projects",
        icon: <PresentationChartBarIcon className="size-6" />,
      },
      {
        name: "درخواست ها",
        path: "/freelancer/proposals",
        icon: <PresentationChartBarIcon className="size-6" />,
      },
    ],
  };

  const getRole = () => {
    if (pathname.startsWith("/admin")) return "admin";
    if (pathname.startsWith("/owner")) return "owner";
    if (pathname.startsWith("/freelancer")) return "freelancer";
    return null;
  };

  const role = getRole();

  const links = role ? sideBarlink[role] : [];

  return (
    <div className="flex flex-row tablet:flex-col max-tablet:justify-between items-center max-tablet:items-center tablet:gap-8 bg-foreground tablet:!p-8 max-tablet:!px-8 max-tablet:border-t max-tablet:border-t-border min-tablet:border-l min-tablet:border-l-border h-full whitespace-nowrap">
      <Image className="max-tablet:hidden" src={logo} alt="logo" />
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.path}
          className={`${
            pathname === link.path
              ? "!text-text font-bold"
              : "!text-secondary font-normal"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            {link.icon}
            <span className="text-sm">{link.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideBarLinks;
