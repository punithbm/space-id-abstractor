import { Center, Container, useColorMode, useToast } from "@chakra-ui/react";
import { Core } from "@walletconnect/core";
import { ProposalTypes, SessionTypes } from "@walletconnect/types";
import { getSdkError, parseUri } from "@walletconnect/utils";
import { IWeb3Wallet, Web3Wallet } from "@walletconnect/web3wallet";
import { SingleValue } from "chakra-react-select";
import { ethers } from "ethers";
import networksList from "evm-rpcs-list";
import { useEffect, useState } from "react";

import { useSafeInject } from "../utils/SafeInjectContext";
import { SelectedNetworkOption, TxnDataType } from "../utils/types";
import IFrameConnectTab from "./IFrameConnectTab";
import TabsSelect from "./TabsSelect";
import WalletConnectTab from "./WalletConnectTab";
import { useNetwork } from "wagmi";

const WCMetadata = {
  name: "Interstellar",
  description: "Making your space id to rock",
  url: "",
  icons: [""],
};

const core = new Core({
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
});

const primaryNetworkIds = [
  1, // ETH Mainnet
  42161, // Arbitrum One
  56, // BSC
  5, // Goerli Testnet
];

const primaryNetworkOptions = primaryNetworkIds.map((id) => {
  return { chainId: id, ...networksList[id.toString()] };
});
const secondaryNetworkOptions = Object.entries(networksList)
  .filter((id) => !primaryNetworkIds.includes(parseInt(id[0])))
  .map((arr) => {
    return {
      chainId: parseInt(arr[0]),
      name: arr[1].name,
      rpcs: arr[1].rpcs,
    };
  });
const allNetworksOptions = [
  ...primaryNetworkOptions,
  ...secondaryNetworkOptions,
];

function SiteConnectorBody({tokenboundAccount}:{tokenboundAccount:string}) {
  const {chain} = useNetwork()
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };

  const urlFromURL = new URLSearchParams(window.location.search).get("url");
  const urlFromCache = localStorage.getItem("appUrl");
  const chainFromURL = chain?.id;
  let networkIdViaURL = 1;
  if (chainFromURL) {
    for (let i = 0; i < allNetworksOptions.length; i++) {
      if (
        allNetworksOptions[i].chainId === chainFromURL
      ) {
        networkIdViaURL = allNetworksOptions[i].chainId;
        break;
      }
    }
  }
  const toast = useToast();

  const {
    setAddress: setIFrameAddress,
    appUrl,
    setAppUrl,
    setRpcUrl,
    iframeRef,
    latestTransaction,
  } = useSafeInject();

  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>();
  const [showAddress, setShowAddress] = useState(tokenboundAccount ?? ""); // gets displayed in input. ENS name remains as it is
  const [address, setAddress] = useState(tokenboundAccount ?? ""); // internal resolved address
  const [uri, setUri] = useState("");
  const [networkId, setNetworkId] = useState(networkIdViaURL);
  const [selectedNetworkOption, setSelectedNetworkOption] = useState<
    SingleValue<SelectedNetworkOption>
  >({
    label: networksList[networkIdViaURL].name,
    value: networkIdViaURL,
  });
  // WC v2
  const [web3wallet, setWeb3Wallet] = useState<IWeb3Wallet>();
  const [web3WalletSession, setWeb3WalletSession] =
    useState<SessionTypes.Struct>();
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedTabIndex, setSelectedTabIndex] = useState(urlFromURL ? 1 : 0);
  const [isIFrameLoading, setIsIFrameLoading] = useState(false);

  const [inputAppUrl, setInputAppUrl] = useState<string | undefined>(
    urlFromURL ?? urlFromCache ?? undefined
  );
  const [iframeKey, setIframeKey] = useState(0); // hacky way to reload iframe when key changes

  const [sendTxnData, setSendTxnData] = useState<TxnDataType[]>([]);

  useEffect(() => {
    // only use cached address if no address from url provided
    if (!tokenboundAccount) {
      // getCachedSession
      const _showAddress = localStorage.getItem("showAddress") ?? undefined;
      // WC V2
      initWeb3Wallet(true, _showAddress);
    }

    setProvider(
      new ethers.providers.JsonRpcProvider(
        `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
      )
    );
  }, []);

  useEffect(() => {
    updateNetwork((selectedNetworkOption as SelectedNetworkOption).value);
    // eslint-disable-next-line
  }, [selectedNetworkOption]);

  useEffect(() => {
    if (provider && tokenboundAccount && urlFromURL) {
      initIFrame();
    }
    // eslint-disable-next-line
  }, [provider]);

  useEffect(() => {
    if (web3wallet) {
      subscribeToEvents();
    }
    // eslint-disable-next-line
  }, [web3wallet]);

  useEffect(() => {
    localStorage.setItem("showAddress", showAddress);
  }, [showAddress]);

  useEffect(() => {
    if (inputAppUrl) {
      localStorage.setItem("appUrl", inputAppUrl);
    }
  }, [inputAppUrl]);

  useEffect(() => {
    setIFrameAddress(address);
    // eslint-disable-next-line
  }, [address]);

  useEffect(() => {
    // TODO: use random rpc if this one is slow/down?
    setRpcUrl(networksList[networkId].rpcs[0]);
    // eslint-disable-next-line
  }, [networkId]);

  useEffect(() => {
    if (latestTransaction) {
      const newTxn = {
        from: address,
        ...latestTransaction,
      };

      setSendTxnData((data) => {
        if (data.some((d) => d.id === newTxn.id)) {
          return data;
        } else {
          return [
            { ...newTxn, value: parseInt(newTxn.value, 16).toString() },
            ...data,
          ];
        }
      });
    }
  }, [latestTransaction]);

  const initWeb3Wallet = async (
    onlyIfActiveSessions?: boolean,
    _showAddress?: string
  ) => {
    const _web3wallet = await Web3Wallet.init({
      core,
      metadata: WCMetadata,
    });

    if (onlyIfActiveSessions) {
      const sessions = _web3wallet.getActiveSessions();
      const sessionsArray = Object.values(sessions);
      if (sessionsArray.length > 0) {
        const _address =
          sessionsArray[0].namespaces["eip155"].accounts[0].split(":")[2];
    
        setWeb3WalletSession(sessionsArray[0]);
        setShowAddress(
          _showAddress && _showAddress.length > 0 ? _showAddress : _address
        );
        if (!(_showAddress && _showAddress.length > 0)) {
          localStorage.setItem("showAddress", _address);
        }
        setAddress(_address);
        setUri(
          `wc:${sessionsArray[0].pairingTopic}@2?relay-protocol=irn&symKey=xxxxxx`
        );
        setWeb3Wallet(_web3wallet);
        setIsConnected(true);
      }
    } else {
      setWeb3Wallet(_web3wallet);
      if (_showAddress) {
        setShowAddress(_showAddress);
        setAddress(_showAddress);
      }
    }

    // for debugging
    (window as any).w3 = _web3wallet;
  };

  const resolveAndValidateAddress = async () => {
    let isValid;
    let _address = address;
    if (!address) {
      isValid = false;
    } else {
      // Resolve ENS
      const resolvedAddress = await provider!.resolveName(address);
      if (resolvedAddress) {
        setAddress(resolvedAddress);
        _address = resolvedAddress;
        isValid = true;
      } else if (ethers.utils.isAddress(address)) {
        isValid = true;
      } else {
        isValid = false;
      }
    }


    if (!isValid) {
      toast({
        title: "Invalid Address",
        description: "Address is not an ENS or Ethereum address",
        status: "error",
        isClosable: true,
        duration: 4000,
      });
    }

    return { isValid, _address: _address };
  };

  const initWalletConnect = async () => {
    setLoading(true);
    const { isValid } = await resolveAndValidateAddress();

    if (isValid) {
      const { version } = parseUri(uri);

      try {
        if (version === 1) {
          toast({
            title: "Couldn't Connect",
            description:
              "The dapp is still using the deprecated WalletConnect V1",
            status: "error",
            isClosable: true,
            duration: 8000,
          });
          setLoading(false);

          // let _legacySignClient = new LegacySignClient({ uri });

          // if (!_legacySignClient.connected) {
          //   await _legacySignClient.createSession();
          // }

          // setLegacySignClient(_legacySignClient);
          // setUri(_legacySignClient.uri);
        } else {
          await initWeb3Wallet();
        }
      } catch (err) {
        console.error(err);
        toast({
          title: "Couldn't Connect",
          description: "Refresh dApp and Connect again",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const initIFrame = async (_inputAppUrl = inputAppUrl) => {
    setIsIFrameLoading(true);
    if (_inputAppUrl === appUrl) {
      setIsIFrameLoading(false);
      return;
    }

    const { isValid } = await resolveAndValidateAddress();
    if (!isValid) {
      setIsIFrameLoading(false);
      return;
    }

    setAppUrl(_inputAppUrl);
  };

  const subscribeToEvents = async () => {

    if (web3wallet) {
      web3wallet.on("session_proposal", async (proposal) => {
        if (loading) {
          setLoading(false);
        }
       

        const { requiredNamespaces, optionalNamespaces } = proposal.params;
        const namespaceKey = "eip155";
        const requiredNamespace = requiredNamespaces[namespaceKey] as
          | ProposalTypes.BaseRequiredNamespace
          | undefined;
        const optionalNamespace = optionalNamespaces
          ? optionalNamespaces[namespaceKey]
          : undefined;

        let chains: string[] | undefined =
          requiredNamespace === undefined
            ? undefined
            : requiredNamespace.chains;
        if (optionalNamespace && optionalNamespace.chains) {
          if (chains) {
            // merge chains from requiredNamespace & optionalNamespace, while avoiding duplicates
            chains = Array.from(
              new Set(chains.concat(optionalNamespace.chains))
            );
          } else {
            chains = optionalNamespace.chains;
          }
        }

        const accounts: string[] = [];
        chains?.map((chain) => {
          accounts.push(`${chain}:${address}`);
          return null;
        });
        const namespace: SessionTypes.Namespace = {
          accounts,
          chains: chains,
          methods:
            requiredNamespace === undefined ? [] : requiredNamespace.methods,
          events:
            requiredNamespace === undefined ? [] : requiredNamespace.events,
        };

        if (requiredNamespace && requiredNamespace.chains) {
          const _chainId = parseInt(requiredNamespace.chains[0].split(":")[1]);
          setSelectedNetworkOption({
            label: networksList[_chainId].name,
            value: _chainId,
          });
        }

        const session = await web3wallet.approveSession({
          id: proposal.id,
          namespaces: {
            [namespaceKey]: namespace,
          },
        });
        setWeb3WalletSession(session);
        setIsConnected(true);
      });
      try {
        await web3wallet.core.pairing.pair({ uri });
      } catch (e) {
        console.error(e);
      }

      web3wallet.on("session_request", async (event) => {
        const { topic, params, id } = event;
        const { request } = params;


        if (request.method === "eth_sendTransaction") {
          await handleSendTransaction(id, request.params, topic);
        } else {
          await web3wallet.respondSessionRequest({
            topic,
            response: {
              jsonrpc: "2.0",
              id: id,
              error: {
                code: 0,
                message: "Method not supported by Impersonator",
              },
            },
          });
        }
      });

      web3wallet.on("session_delete", () => {

        reset();
      });
    }
  };

  const handleSendTransaction = async (
    id: number,
    params: any[],
    topic?: string
  ) => {
    setSendTxnData((data) => {
      const newTxn = {
        id: id,
        from: params[0].from,
        to: params[0].to,
        data: params[0].data,
        value: params[0].value ? parseInt(params[0].value, 16).toString() : "0",
      };

      if (data.some((d) => d.id === newTxn.id)) {
        return data;
      } else {
        return [newTxn, ...data];
      }
    });

    if (web3wallet && topic) {
      await web3wallet.respondSessionRequest({
        topic,
        response: {
          jsonrpc: "2.0",
          id: id,
          error: { code: 0, message: "Method not supported by Impersonator" },
        },
      });
    }
  };

  const updateSession = async ({
    newChainId,
    newAddress,
  }: {
    newChainId?: number;
    newAddress?: string;
  }) => {
    const _chainId = newChainId || networkId;
    const _address = newAddress || address;

    if (web3wallet && web3WalletSession) {
      await web3wallet.emitSessionEvent({
        topic: web3WalletSession.topic,
        event: {
          name: _chainId !== networkId ? "chainChanged" : "accountsChanged",
          data: [_address],
        },
        chainId: `eip155:${_chainId}`,
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };



  const updateNetwork = (_networkId: number) => {
    setNetworkId(_networkId);

    if (selectedTabIndex === 0) {
      updateSession({
        newChainId: _networkId,
      });
    } else {
      setIframeKey((key) => key + 1);
    }
  };

  const killSession = async () => {

    if (web3wallet && web3WalletSession) {
      try {
        await web3wallet.disconnectSession({
          topic: web3WalletSession.topic,
          reason: getSdkError("USER_DISCONNECTED"),
        });
      } catch (e) {
        console.error("killSession", e);
      }
      setWeb3WalletSession(undefined);
      setUri("");
      setIsConnected(false);
    }
  };

  const reset = (persistUri?: boolean) => {
    setWeb3WalletSession(undefined);
    setIsConnected(false);
    if (!persistUri) {
      setUri("");
    }
    localStorage.removeItem("walletconnect");
  };

  return (
    <div>
        <TabsSelect
          selectedTabIndex={selectedTabIndex}
          setSelectedTabIndex={setSelectedTabIndex}
        />
        {(() => {
          switch (selectedTabIndex) { 
            case 1:
              return (
                <WalletConnectTab
                  uri={uri}
                  setUri={setUri}
                  bg={bgColor[colorMode]}
                  isConnected={isConnected}
                  initWalletConnect={initWalletConnect}
                  loading={loading}
                  setLoading={setLoading}
                  reset={reset}
                  killSession={killSession}
                  web3WalletSession={web3WalletSession}
                />
              );
            case 0:
              return (
                <IFrameConnectTab
                  networkId={networkId}
                  initIFrame={initIFrame}
                  setInputAppUrl={setInputAppUrl}
                  inputAppUrl={inputAppUrl}
                  bg={bgColor[colorMode]}
                  isIFrameLoading={isIFrameLoading}
                  appUrl={appUrl}
                  iframeKey={iframeKey}
                  iframeRef={iframeRef}
                  setIsIFrameLoading={setIsIFrameLoading}
                  showAddress={showAddress}
                />
              );
          }
        })()}
       
      </div>
  );
}

export default SiteConnectorBody;
