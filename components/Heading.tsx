import React from "react";

export default function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-zinc-800 text-lg font-medium font-['Inter']">
            {children}
        </h1>
    )
}
