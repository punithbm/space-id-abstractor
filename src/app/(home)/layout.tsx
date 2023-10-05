"use client";
import "@/styles/globals.css";

import * as React from "react";

export default function RootLayout(props: {
  children: React.ReactNode;
  widget: React.ReactNode;
}) {
  return <div className="">{props.children}</div>;
}
