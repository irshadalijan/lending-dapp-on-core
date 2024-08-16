// pages/Lending.js
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../Web3Context';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  HStack,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';

export const Lending = () => {
  const { depositBTC, withdrawBTC, contract, account, ethers, loading, Error } = useWeb3();
  const [amount, setAmount] = useState('');
  const [userStaked, setUserStaked] = useState(0);
  const [apy, setApy] = useState(0);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (contract && account) {
      const fetchUserData = async () => {
        const staked = await contract.getUserStaked(account.toString());
        setUserStaked(ethers.formatUnits(staked, 18));
        // Assuming there's a method to get APY from the contract
        const currentApy = await contract.getCurrentApy();
        setApy(Number(currentApy.toString()));
      };
      fetchUserData();
      // Set up an interval to fetch data every 30 seconds
      const interval = setInterval(fetchUserData, 30000);
      return () => clearInterval(interval);
    }
  }, [contract, account]);

  const handleDeposit = async () => {
    try {
      await depositBTC(amount);
      if (!loading && !Error) {
      toast({
        title: "Deposit successful",
        description: `You have successfully staked ${amount} BTC`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setAmount('');
    }
    } catch (error) {
      toast({
        title: "Deposit failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawBTC(amount);
      if (!loading && !Error) {
        toast({
        title: "Withdrawal successful",
        description: `You have successfully withdrawn ${amount} BTC`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setAmount('');
    }
    } catch (error) {
      toast({
        title: "Withdrawal failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} align="stretch">
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Stat
            bg={bgColor}
            borderRadius="lg"
            boxShadow="md"
            p={5}
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="lg">Your Staked BTC</StatLabel>
            <StatNumber fontSize="3xl">{userStaked.toLocaleString()} BTC</StatNumber>
            <StatHelpText>Available for withdrawal</StatHelpText>
          </Stat>
          
          <Stat
            bg={bgColor}
            borderRadius="lg"
            boxShadow="md"
            p={5}
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="lg">Current APY</StatLabel>
            <StatNumber fontSize="3xl">{apy}%</StatNumber>
            <StatHelpText>Annual Percentage Yield</StatHelpText>
          </Stat>
        </SimpleGrid>

        <Box
          bg={bgColor}
          borderRadius="lg"
          boxShadow="md"
          p={6}
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={4}>
            <Text fontSize="xl" fontWeight="bold">
              Stake or Withdraw BTC
            </Text>
            <InputGroup size="lg">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in BTC"
              />
              <InputRightAddon children="BTC" />
            </InputGroup>
            <HStack width="100%">
              <Button colorScheme="blue" onClick={handleDeposit} flex={1}>
                Stake
              </Button>
              <Button colorScheme="red" onClick={handleWithdraw} flex={1}>
                Withdraw
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};