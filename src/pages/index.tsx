import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/components/layouts/main";
import Hero from "@/components/views/hero";
import Dropzone from "@/components/common/dropzone";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      {/* <Dropzone
        uploadHandler={(data: any) => {
          console.log("home", data);
        }}
      /> */}
    </MainLayout>
  );
}
