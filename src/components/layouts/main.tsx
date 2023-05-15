import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import MetaData, { MetaProps } from "./meta_data";

export default function MainLayout({
  children,
  metadata,
}: {
  children: React.ReactNode;
  metadata: MetaProps;
}) {
  return (
    <>
      <MetaData
        title={metadata.title}
        description={metadata.description}
        image={metadata.image}
        twitterCard={metadata.twitterCard}
      />
      <Navbar />
      <div className="bg-base-300 min-h-[70vh] text-primary-content">
        {children}
      </div>
      <Footer />
    </>
  );
}
