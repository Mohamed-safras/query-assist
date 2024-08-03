import Header from "@/src/components/custom/Header";
import { ClerkLoaded } from "@clerk/nextjs";
import React from "react";

const DashboardLayouts = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <div className="flex-1 flex flex-col h-screen">
        <Header />
        {children}
      </div>
    </ClerkLoaded>
  );
};

export default DashboardLayouts;
