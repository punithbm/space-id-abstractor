"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";

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
        className={`fixed left-0 top-0 z-10  h-[92px] w-full  border-b border-[#00cbc6] bg-white/0 px-8 py-6 ${
          scrollY ? "backdrop-blur-[12px]" : ""
        }`}
      >
          <div className="flex items-center justify-between">
          <Link className="text-center text-[36px]" href="/">
            🪐 Interstellar
          </Link>

          <RainbowKitConnectButton />
          </div>
       
      </header>
    </>
  );
};

export default Header;
