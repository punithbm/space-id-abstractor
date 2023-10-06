import { Badge, Box, HStack } from "@chakra-ui/react";

const Tab = ({
  children,
  tabIndex,
  selectedTabIndex,
  setSelectedTabIndex,
  isNew = false,
}: {
  children: React.ReactNode;
  tabIndex: number;
  selectedTabIndex: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSelectedTabIndex: Function;
  isNew?: boolean;
}) => {
  return (
    <HStack
      fontWeight={"semibold"}
      color={tabIndex === selectedTabIndex ? "white" : "whiteAlpha.700"}
      role="group"
      _hover={{
        color: "whiteAlpha.900",
      }}
      cursor="pointer"
    
      onClick={() => setSelectedTabIndex(tabIndex)}
    >
      <Box textColor={tabIndex === selectedTabIndex ? "black" : "blackAlpha.500"} >{children}</Box>
    </HStack>
  );
};

export default Tab;
