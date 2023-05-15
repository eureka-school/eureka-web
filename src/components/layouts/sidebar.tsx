import defaultConfig from "@/lib/config.json";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface TemplateProps {
  menu: { icon: string; label: string; href: string }[];
}

const Template = ({ menu }: TemplateProps) => (
  <ul className="menu bg-base-100 w-42 min-h-[70vh] p-3 rounded-box">
    {menu.map(({ icon, label, href }, idx) => (
      <li key={`menu-${idx}`}>
        <Link href={href} className="gap-4">
          <Image src={icon} alt={label} width={24} height={24} />
          <span className="mr-5">{label}</span>
        </Link>
      </li>
    ))}
  </ul>
);

export default function Sidebar() {
  const { data: configResponse, isLoading } = useSWR("/api/v2/configs/default");

  if (isLoading) {
    return <Template menu={defaultConfig.sidebarMenus} />;
  }
  const config = configResponse.data;
  return <Template menu={config.sidebarMenus} />;
}
