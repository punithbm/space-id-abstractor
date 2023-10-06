"use client";
import "@/styles/globals.css";

import * as React from "react";

import { Header, ToastMessage } from "@/ui_components/shared";
import { WagmiWrapper } from "@/utils/wagmi/WagmiContext";
import { GlobalContextProvider } from "@/store";

export default function RootLayout(props: {
  children: React.ReactNode;
  widget: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full bg-[#191927]">
        <GlobalContextProvider>
          <WagmiWrapper>
            <Header />
            <ToastMessage />
            <main className={`pt-[92px]`}>
              <div className="container mx-auto">
                {props.children}
                {props.widget}
              </div>
            </main>
          </WagmiWrapper>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
