import Banner from "@/components/orders/Banner";
import NavBar from "@/components/orders/NavBar";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

const COOKIE_NAME = process.env.JWT_COOKIE_NAME || "access_token";

export default async function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    // Simple redirect; optionally add ?next= if you later capture the path
    redirect("/login");
  }
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
