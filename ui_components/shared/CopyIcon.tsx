"use client";
import Image from "next/image";
import { FC } from "react";

import { useCopyToClipboard } from "@/utils/hooks/useCopyToClipboard";

import { ICopyIconProps } from "./types";

const CopyIcon: FC<ICopyIconProps> = ({ icon, className, text }) => {
  const [, copyToClipBoard] = useCopyToClipboard();
  return (
    <Image
      className={`cursor-pointer ${className ?? ""}`}
      src={icon}
      alt="copy"
      width={12}
      height={12}
      onClick={() => {
        copyToClipBoard(text);
      }}
    />
  );
};

export default CopyIcon;
