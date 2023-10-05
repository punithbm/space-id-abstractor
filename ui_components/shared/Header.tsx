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
        className={`fixed left-0 top-0 z-10 w-full h-[92px] bg-white/0 px-8 py-6 flex items-center justify-end border-b border-indigo-600 ${scrollY ? "backdrop-blur-[12px]" : ""
          }`}
      >
        <div className="absolute left-1/2 -translate-x-1/2">
          <p>Wallet for your ERC-6551 Accounts</p>
        </div>
        <RainbowKitConnectButton />

      </header>
    </>
  );
};

export default Header;
