import Image from "next/image";
import React from "react";
import MainLayout from "./main";
import Sidebar from "@/components/layouts/sidebar";

const menu = [
  {
    icon: "https://www.svgrepo.com/show/449959/users.svg",
    href: "/admin/users",
    label: "Users",
  },
  {
    icon: "https://www.svgrepo.com/show/449960/user-shield.svg",
    href: "/admin/roles",
    label: "Roles",
  },
  {
    icon: "https://www.svgrepo.com/show/449684/cloud-upload.svg",
    href: "/admin/uploads",
    label: "Uploads",
  },
];
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
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
