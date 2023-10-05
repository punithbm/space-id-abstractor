"use client";
import { FC } from "react";

export type TAvatarPlaceholderProps = {
  symbol: string;
  className?: string;
  symbolClassName?: string;
};

const AvatarPlaceholder: FC<TAvatarPlaceholderProps> = (props) => {
  const { symbol, className, symbolClassName } = props;
  return (
    <span
      className={
        className
          ? className
          : `inline-flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full bg-grey-300  `
      }
    >
      <span
        className={
          symbolClassName
            ? symbolClassName
            : `supportText_regular leading-none `
        }
      >
        {symbol?.slice(0, 1).toUpperCase()}
      </span>
    </span>
  );
};

export default AvatarPlaceholder;
