import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AppUrlLabel from "./AppUrlLabel";

interface IFrameConnectTabParams {
  networkId: number;
  initIFrame: (_inputAppUrl?: string | undefined) => Promise<void>;
  inputAppUrl: string | undefined;
  setInputAppUrl: (value: string | undefined) => void;
  appUrl: string | undefined;
  bg: string;
  isIFrameLoading: boolean;
  setIsIFrameLoading: (value: boolean) => void;
  iframeKey: number;
  iframeRef: React.RefObject<HTMLIFrameElement> | null;
  showAddress: string;
}

function IFrameConnectTab({
  initIFrame,
  setInputAppUrl,
  inputAppUrl,
  bg,
  isIFrameLoading,
  appUrl,
  iframeKey,
  iframeRef,
  setIsIFrameLoading,
}: IFrameConnectTabParams) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <FormControl my={4}>
        <HStack>
          <AppUrlLabel />
          <Spacer />
        
        </HStack>
        <HStack mt="2">
          <InputGroup>
            <Input
              pr="3.5rem"
              placeholder="https://app.uniswap.org/"
              aria-label="dapp-url"
              autoComplete="off"
              value={inputAppUrl}
              onChange={(e) => setInputAppUrl(e.target.value)}
              bg={bg}
            />
            {inputAppUrl && (
              <InputRightElement px="1rem" mr="0.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => {
                    setInputAppUrl("");
                  }}
                >
                  <DeleteIcon />
                </Button>
              </InputRightElement>
            )}
          </InputGroup>
          {appUrl && (
            <>
              <Button onClick={onOpen}>
                <HStack>
                  <FontAwesomeIcon icon={faShareAlt} />
                  <Text>Share</Text>
                </HStack>
              </Button>
             
            </>
          )}
        </HStack>
      </FormControl>
      <Center>
        <Button onClick={() => initIFrame()} isLoading={isIFrameLoading}>
          Connect
        </Button>
      </Center>
      <Center
        mt="1rem"
        px={{ base: "10rem", lg: 0 }}
      >
        {appUrl && (
          <Box
            as="iframe"
            w={{
              base: "22rem",
              sm: "45rem",
              md: "55rem",
              lg: "1500rem",
            }}
            h={{ base: "33rem", md: "35rem", lg: "38rem" }}
            title="app"
            src={appUrl}
            key={iframeKey}
            borderWidth="1px"
            borderStyle={"solid"}
            borderColor="white"
            bg="white"
            ref={iframeRef}
            onLoad={() => setIsIFrameLoading(false)}
          />
        )}
      </Center>
    </>
  );
}

export default IFrameConnectTab;
