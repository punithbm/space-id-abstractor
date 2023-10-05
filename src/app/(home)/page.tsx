
import React from "react";
import { Metadata } from "next";


import { LandingPage } from "@/ui_components/home";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};
function Root() {
  return (
   <LandingPage />
  );
}

export default Root;
