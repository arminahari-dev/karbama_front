import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Vazirmatn } from "next/font/google";
import QueryProvider from "@/components/services/queryprovider/QueryProvider";
import { Toaster } from "react-hot-toast";
import { NotificationProvider } from "@/contexts/NotificationContext";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "کارباما",
  description:
    "پلتفرم جامع فریلنسینگ کارباما - پروژه‌ها، فریلنسرها و فرصت‌های شغلی",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`flex justify-center items-center ${vazirmatn.className}`}
    >
      <body>
        <NotificationProvider>
          <Toaster />
          <QueryProvider>{children}</QueryProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
