import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="bg-base-300 min-h-[70vh] text-primary-content">{children}</div>
      <Footer />
    </div>
  );
}
