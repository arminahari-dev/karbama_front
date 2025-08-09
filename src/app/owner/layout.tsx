import NavBar from "@/components/ui/navbar/NavBar";
import SideBarLinks from "@/components/ui/sidebar/link/SideBarLinks";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="grid max-tablet:grid-cols-none tablet:grid-cols-[auto_1fr] max-tablet:grid-rows-[90%_10%] w-full h-full">
      <div className="bottom-0 tablet:static max-tablet:fixed max-tablet:w-full max-tablet:h-[10%]">
        <SideBarLinks />
      </div>
      <div className="grid grid-rows-[10%_90%] !p-4 overflow-hidden">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
