"use client";
import "@/styles/globals.css";

import * as React from "react";

import { Header } from "@/ui_components/shared";
import { WagmiWrapper } from "@/utils/wagmi/WagmiContext";

export default function RootLayout(props: {
  children: React.ReactNode;
  widget: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full bg-[#191927]">
        <WagmiWrapper>
          <Header />
          <main className={`pt-[92px]`}>
            <div className="container mx-auto">
              {props.children}
              {props.widget}
            </div>
          </main>
        </WagmiWrapper>
      </body>
    </html>
  );
}
