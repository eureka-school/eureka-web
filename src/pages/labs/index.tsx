import LabCard from "@/components/common/lab_card";
import MainLayout from "@/components/layouts/main";
import defaultConfig from "@/lib/config.json";

const labs = [
  {
    title: "Binary Lab",
    subtitle: "Learn how zero & one make words",
    href: "/labs/binary",
    src: "https://eureka-school.s3.us-east-005.backblazeb2.com/browser-binary-code.svg",
  },
  {
    title: "Binary Lab",
    subtitle: "Learn how zero & one make words",
    href: "/labs/binary",
    src: "https://eureka-school.s3.us-east-005.backblazeb2.com/browser-binary-code.svg",
  },
  {
    title: "Binary Lab",
    subtitle: "Learn how zero & one make words",
    href: "/labs/binary",
    src: "https://eureka-school.s3.us-east-005.backblazeb2.com/browser-binary-code.svg",
  },
  {
    title: "Binary Lab",
    subtitle: "Learn how zero & one make words",
    href: "/labs/binary",
    src: "https://eureka-school.s3.us-east-005.backblazeb2.com/browser-binary-code.svg",
  },
];
export default function Page() {
  const metadata = {
    description: defaultConfig.description,
    image: defaultConfig.hero.backgroundImage,
    title: "Labs",
    twitterCard: defaultConfig.hero.backgroundImage,
  };
  return (
    <MainLayout metadata={metadata}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center py-10">
        {labs.map(({ title, subtitle, href, src }, idx) => (
          <LabCard
            title={title}
            subtitle={subtitle}
            href={href}
            src={src}
            key={idx}
          />
        ))}
      </div>
    </MainLayout>
  );
}
