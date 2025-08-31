import Banner from "@/components/orders/Banner";
import NavBar from "@/components/orders/NavBar";
import React from "react";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/6 flex bg-gray-300 border-r border-gray-200">
        <NavBar/>
      </div>
      <div className="w-5/6 flex flex-col">
        <Banner/>
        <div className="flex-1 bg-gray-50 p-6">{children}</div>
      </div>
    </div>
  );
}
