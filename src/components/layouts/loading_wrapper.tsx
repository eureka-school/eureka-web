import React from "react";
interface Props {
  children: React.ReactNode;
  huge?: boolean;
}
export default function LoadingWrapper({ children, huge = false }: Props) {
  return (
    <div
      className={
        huge
          ? "flex min-h-[70vh] justify-center items-center"
          : "flex py-10 justify-center items-center"
      }
    >
      {children}
    </div>
  );
}
