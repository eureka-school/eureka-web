import MainLayout from "@/components/layouts/main";
import Hero from "@/components/views/hero";
import defaultConfig from "@/lib/config.json";

export default function Home() {
  const metadata = {
    description: defaultConfig.description,
    image: defaultConfig.hero.backgroundImage,
    title: defaultConfig.appName,
    twitterCard: defaultConfig.hero.backgroundImage,
  };
  return (
    <MainLayout metadata={metadata}>
      <Hero />
    </MainLayout>
  );
}
