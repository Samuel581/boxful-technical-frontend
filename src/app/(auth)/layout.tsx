import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-center bg-gray-50">
        <div className="w-full space-y-8">{children}</div>
      </div>
      <div className="w-1/2 min-h-screen bg-gray-300" />
    </div>
  );
}
