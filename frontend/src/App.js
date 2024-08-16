import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Lending } from "./pages/Lending";
import { Borrowing } from "./pages/Borrowing";
import { useWeb3 } from "./Web3Context";
import {
  ChakraProvider,
  Flex,
  Box,
  Heading,
  Button,
  Text,
  Container,
  Link as ChakraLink,
  VStack,
  HStack,
  useColorModeValue,
  IconButton,
  useColorMode,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaFaucet } from "react-icons/fa";

const App = () => {
  const {
    isConnected,
    account,
    connectToMetaMask,
    disconnectFromMetaMask,
    tBTC,
    tUSDT,
    ethers,
  } = useWeb3();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const toast = useToast();

  const handleFaucet = async () => {
    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet first.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await tBTC.mint(account.toString(), ethers.parseUnits("10", "ether"));
      await tUSDT.mint(account.toString(), ethers.parseUnits("100", "ether"));
      toast({
        title: "Faucet successful",
        description: "You have received 100 USD and 10 BTC.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Faucet failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box minHeight="100vh" bg={bgColor} color={textColor}>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8}>
            <Flex width="100%" justify="space-between" align="center">
              <Heading as="h1" size="xl">
                BTCfi
              </Heading>
              <HStack>
                <Tooltip label="Get test tokens">
                  <IconButton
                    icon={<FaFaucet />}
                    onClick={handleFaucet}
                    aria-label="Faucet"
                    colorScheme="teal"
                  />
                </Tooltip>
                <IconButton
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                  aria-label="Toggle color mode"
                />
                {isConnected ? (
                  <HStack>
                    <Text fontSize="sm">
                      Connected: {account.slice(0, 6)}...{account.slice(-4)}
                    </Text>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={disconnectFromMetaMask}
                    >
                      Disconnect
                    </Button>
                  </HStack>
                ) : (
                  <Button colorScheme="blue" onClick={connectToMetaMask}>
                    Connect Wallet
                  </Button>
                )}
              </HStack>
            </Flex>

            <HStack as="nav" spacing={8}>
              <Link as={ChakraLink} to="/" _hover={{ textDecoration: "none" }}>
                <Button variant="ghost">Home</Button>
              </Link>
              <Link
                as={ChakraLink}
                to="/lending"
                _hover={{ textDecoration: "none" }}
              >
                <Button variant="ghost">Lending</Button>
              </Link>
              <Link
                as={ChakraLink}
                to="/borrowing"
                _hover={{ textDecoration: "none" }}
              >
                <Button variant="ghost">Borrowing</Button>
              </Link>
            </HStack>

            <Box width="100%">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lending" element={<Lending />} />
                <Route path="/borrowing" element={<Borrowing />} />
              </Routes>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
