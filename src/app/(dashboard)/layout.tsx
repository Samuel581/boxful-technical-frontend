import React from "react";

export default function OrdersLayout({
    children,
}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen flex">
            <div className="w-1/6 flex items-center bg-gray-300">
            </div>
            <div className="w-5/6 min-h-screen">{children}</div>
        </div>
    )
}