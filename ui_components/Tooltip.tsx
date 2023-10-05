"use client";
import "tippy.js/dist/tippy.css";

import Tippy from "@tippyjs/react";
import { FC } from "react";

export interface ITooltipProps {
  children?: React.ReactElement;
  message: string | React.ReactNode;
  className?: string;
  touch?: boolean;
  maxWidth?: string | number;
  arrow?: boolean | string | SVGElement | DocumentFragment;
  delay?: [number, number];
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
}
const Tooltip: FC<ITooltipProps> = ({
  children,
  className,
  message,
  placement,
  touch = false,
  maxWidth,
  arrow,
  delay,
}: ITooltipProps) => {
  return (
    <Tippy
      className={className ?? ""}
      content={message}
      placement={placement ?? "bottom"}
      touch={touch}
      maxWidth={maxWidth}
      arrow={arrow}
      delay={delay}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
