import Head from "next/head";
import defaultConfig from "@/lib/config.json";

export interface MetaProps {
  description?: string;
  image?: string;
  title?: string;
  twitterCard?: string;
}
export default function MetaData({
  description = defaultConfig.description,
  image = defaultConfig.hero.backgroundImage,
  title = defaultConfig.appName,
  twitterCard = defaultConfig.hero.backgroundImage,
}: MetaProps) {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="og:title" content={title} />
      <meta name="twitter:card" content={twitterCard} />
    </Head>
  );
}
