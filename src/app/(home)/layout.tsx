import "@/styles/globals.css";

import { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Home",
  description: "home",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  widget: React.ReactNode;
}) {
  return (
    <div className="">
      {props.children}
    </div>
  );
}
