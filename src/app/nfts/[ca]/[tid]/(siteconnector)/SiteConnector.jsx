"use client";
import { ChakraProvider } from "@chakra-ui/react";

import SiteConnectorBody from "./components/index";
import theme from "./theme";
import { SafeInjectProvider } from "./utils/SafeInjectContext";
function SiteConnector(props) {
  return (
    <ChakraProvider theme={theme}>
      <SafeInjectProvider>
        <div className="px-20 pt-10" >
          <h1 className="text-xl font-bold" >Dapp Connect</h1>
          {props?.tokenboundAccount &&  <SiteConnectorBody tokenboundAccount={props.tokenboundAccount}/>}
        </div>
      </SafeInjectProvider>
    </ChakraProvider>
  );
}

export default SiteConnector;
