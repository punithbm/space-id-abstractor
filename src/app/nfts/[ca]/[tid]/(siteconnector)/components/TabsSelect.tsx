import {  HStack } from "@chakra-ui/react";

import Tab from "./Tab";

const tabs = [ "iFrame","WalletConnect"];

interface TabsSelectParams {
  selectedTabIndex: number;
  setSelectedTabIndex: (value: number) => void;
}

function TabsSelect({
  selectedTabIndex,
  setSelectedTabIndex,
}: TabsSelectParams) {
  return (
    <div className="w-[260px]">
      <HStack
        mt="1rem"
        minH="3rem"
        px="1.5rem"
        spacing={"8"}
        background="gray.700"
        borderRadius="xl"
        backgroundColor={"#00cbc6"}
        textColor={"black"}
      >
        {tabs.map((t, i) => (
          <Tab
            key={i}
            tabIndex={i}
            selectedTabIndex={selectedTabIndex}
            setSelectedTabIndex={setSelectedTabIndex}
          >
            {t}
          </Tab>
        ))}
      </HStack>
    </div>
  );
}

export default TabsSelect;
