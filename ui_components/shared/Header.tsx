"use client";

import { FC, useEffect, useState } from "react";

import { Button } from "..";
import { RainbowKitConnectButton } from ".";
const Header: FC = () => {
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.scrollY;
      if (scrollOffset > 20) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-10 flex h-[92px] w-full items-center justify-end border-b border-[#00cbc6] bg-white/0 px-8 py-6 ${
          scrollY ? "backdrop-blur-[12px]" : ""
        }`}
      >
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-[36px] text-center">🪐 Interstellar</h1>
        </div>
        <RainbowKitConnectButton />
      </header>
    </>
  );
};

export default Header;
