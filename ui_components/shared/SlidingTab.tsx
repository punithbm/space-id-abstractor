"use client";
import { FC, useEffect, useRef, useState } from "react";

import { TContractNestedTabs } from "../contract-details/types";

export interface ISlidingTabProps {
  tabData?: any;
  activeTab: TContractNestedTabs;
  handleTabClick: (val: TContractNestedTabs) => void;
}
const SlidingTab: FC<ISlidingTabProps> = ({
  tabData,
  activeTab,
  handleTabClick,
}) => {
  const [tabWidth, setTabWidth] = useState(0);
  const [tabLeftPos, setTabLeftPos] = useState(0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const activeTabIndex = tabData.findIndex(
      (tab: any) => tab.id === activeTab
    );
    const currentTab = tabsRef.current[activeTabIndex];
    if (currentTab) {
      setTabLeftPos(currentTab.offsetLeft);
      setTabWidth(currentTab.clientWidth);
    }
  }, [activeTab, tabData]);

  return (
    <div
      className={`relative z-0 inline-block rounded-5xl border border-grey-300 bg-white p-1`}
    >
      <ul className="relative flex gap-2">
        {tabData.map((tab: any, index: number) => {
          return (
            <li
              role="presentation"
              key={tab.id}
              ref={(el) => (tabsRef.current[index] = el)}
              className={`paragraph2_regular relative z-10 cursor-pointer px-4 py-2 ${
                activeTab === tab.id ? "text-white" : "text-text-500"
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </li>
          );
        })}
        <li
          className={`absolute bottom-0 h-full w-full rounded-3xl bg-text-800 transition-all duration-300 `}
          style={{ left: tabLeftPos, width: tabWidth }}
        />
      </ul>
    </div>
  );
};
export default SlidingTab;
