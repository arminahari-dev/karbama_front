"use client";

import NavBar from "@/components/ui/navbar/NavBar";
import SideBarLinks from "@/components/ui/sidebar/link/SideBarLinks";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid max-tablet:grid-cols-none tablet:grid-cols-[auto_1fr] max-tablet:grid-rows-[90%_10%] w-full h-dvh">
          <div className="bottom-0 tablet:static max-tablet:fixed max-tablet:w-full max-tablet:h-[10%]">
            <SideBarLinks />
          </div>
          <div className="grid grid-rows-[10%_90%] !pt-0 !pr-4 !pb-4 !pl-4 overflow-hidden">
            <NavBar />
            {children}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
