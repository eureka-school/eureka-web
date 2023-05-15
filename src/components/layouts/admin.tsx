import React from "react";
import MainLayout from "./main";
import Sidebar from "@/components/layouts/sidebar";

import defaultConfig from "@/lib/config.json";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metadata = {
    description: defaultConfig.description,
    image: defaultConfig.hero.backgroundImage,
    title: "Admin Portal",
    twitterCard: defaultConfig.hero.backgroundImage,
  };
  return (
    <MainLayout metadata={metadata}>
      <div className="p-10 bg-base-200 text-primary-content">
        <div className="flex flex-row gap-5">
          <div className="flex flex-col">
            <Sidebar />
          </div>
          <div className="flex flex-1">{children}</div>
        </div>
      </div>
    </MainLayout>
  );
}
