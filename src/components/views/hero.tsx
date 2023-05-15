import defaultConfig from "@/lib/config.json";
import Link from "next/link";
import useSWR from "swr";

interface TemplateProps {
  config: any;
}

const Template = ({ config }: TemplateProps) => (
  <div
    className="hero min-h-[70vh]"
    style={{
      backgroundImage: `url(${config.hero.backgroundImage})`,
    }}
  >
    <div className="hero-overlay bg-opacity-40"></div>
    <div className="hero-content text-center text-neutral-100">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">{config.hero.title}</h1>
        <p className="mb-5"></p>
        <div className="flex justify-center gap-5">
          {defaultConfig.hero.buttons.map(({ label, href }, idx) => (
            <Link
              href={href}
              className="btn btn-primary"
              key={`hero-btn-${idx}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function Hero() {
  const { data: configResponse, isLoading } = useSWR("/api/v2/configs/default");

  if (isLoading) {
    return <Template config={defaultConfig} />;
  }
  const config = configResponse.data;
  return <Template config={config} />;
}
