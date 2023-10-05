"use client";

import React, { FC } from "react";

import { icons } from "@/utils/images";

import { Card } from "..";
export interface IErrorStateProps {
  errMsg: string;
  onClick?: () => void;
}

const ErrorState: FC<IErrorStateProps> = ({ errMsg, onClick }) => {
  return (
    <Card className="bg-white h-full flex flex-col items-center justify-center">
      <h2 className="paragraph1_regular mb-2">{errMsg}</h2>
      <img
        src={icons.refreshBlackIcon}
        alt="refresh"
        onClick={onClick}
        role="presentation"
      />
    </Card>
  );
};
export default ErrorState;
