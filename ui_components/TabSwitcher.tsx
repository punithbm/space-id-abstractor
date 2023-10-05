"use client";
import React, { FC } from "react";



import { Tooltip } from ".";

interface ITab {
  id: number;
  name: string;
  defaultIcon: string;
  activeIcon: string;
  tooltipMessage: string;
}

export interface ITabSwitcherProps {
  className?: string;
  sliderClassName?: string;
  iconClassName?: string;
  tabs: ITab[];
  onClick: () => void;
  activeTab: string;
}

const TabSwitcher: FC<ITabSwitcherProps> = ({
  tabs,
  className,
  iconClassName,
  onClick,
  activeTab,
}: ITabSwitcherProps) => {
  return (
    <div
      role="presentation"
      className={`relative inline-flex min-h-[40px] min-w-[75px] cursor-pointer items-center gap-x-1 rounded-full border border-gray-300 bg-white p-1 ${
        className ?? ""
      }`}
      onClick={onClick}
    >
      <div
        className={`absolute z-[9] h-8 w-8 -translate-x-1/2 rounded-full bg-[#1D1D1D] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 ease-in-out ${
          activeTab === "human_mode"
            ? "left-5 right-1/2 flex"
            : "left-[52px] right-1/2 flex"
        }`}
      />

      {tabs.length > 1 &&
        tabs?.map((tab) => (
          <div
            key={tab.id}
            role="presentation"
            className={`relative z-10 flex h-full w-full cursor-pointer items-center justify-center duration-500 `}
          >
            <Tooltip delay={[1000,0]} message={tab.tooltipMessage}>
              <img
                className={`h-6 w-6 cursor-pointer p-[3px] transition-all duration-500 ease-in-out ${
                  iconClassName ?? ""
                }`}
                src={activeTab === tab.name ? tab.activeIcon : tab.defaultIcon}
                alt={`${tab.name}`}
              />
            </Tooltip>
          </div>
        ))}
    </div>
  );
};

export default TabSwitcher;
