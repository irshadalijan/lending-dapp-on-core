// pages/Borrowing.js
import React, { useState, useEffect } from "react";
import { useWeb3 } from "../Web3Context";
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
  Progress,
} from "@chakra-ui/react";

export const Borrowing = () => {
  const {
    contract,
    depositCollateral,
    withdrawCollateral,
    borrowBTC,
    repayLoan,
    account,
    ethers,
    loading,
    Error,
  } = useWeb3();
  const [collateral, setCollateral] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [userCollateral, setUserCollateral] = useState(0);
  const [availableToBorrow, setAvailableToBorrow] = useState(0);
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [borrowedAmount, setBorrowedAmount] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const fetchUserData = async () => {
    if (contract && account) {
      const collateral = ethers.formatUnits(
        (await contract.getUserCollateral(account)).toString(),
        18
      );
      console.log("Collateral", collateral);
      setUserCollateral(Number(collateral).toFixed(2));
      const limit = (Number(collateral) * 0.8).toFixed(2);
      setBorrowLimit(limit);
      const borrowed = ethers.formatUnits(
        (await contract.getUserBorrowed(account)).toString(),
        18
      );
      console.log(borrowed);
      setBorrowedAmount(Number(borrowed).toFixed(2));
      const interest = await contract.calculateInterest(account.toString());
      console.log("Interest", ethers.formatUnits(interest.toString(), 18));
      setInterestAmount(ethers.formatUnits(interest.toString(), 18));
      setAvailableToBorrow((limit - Number(borrowed)).toFixed(2));
    }
  };

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(fetchUserData, 30000);
    return () => clearInterval(interval);
  }, [contract, account]);

  const handleDepositCollateral = async () => {
    try {
      await depositCollateral(collateral);
      console.log("Deposit", collateral);
      if (!loading && !Error) {
        toast({
          title: "Collateral deposited",
          description: `You have successfully deposited ${collateral} USD as collateral`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCollateral("");
        fetchUserData();
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

  const handleWithdrawCollateral = async () => {
    try {
      await withdrawCollateral(collateral);
      console.log("Withdrew", collateral);
      if (!loading && !Error) {
        toast({
          title: "Collateral withdrew",
          description: `You have successfully Withdrew ${collateral} USD as collateral`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCollateral("");
        fetchUserData();
      }
    } catch (error) {
      toast({
        title: "Withdrew failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleBorrow = async () => {
    try {
      await borrowBTC(loanAmount);
      console.log(loanAmount);
      if (!loading && !Error) {
        toast({
          title: "Borrow successful",
          description: `You have successfully borrowed ${loanAmount} BTC`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setLoanAmount("");
        fetchUserData();
      }
    } catch (error) {
      toast({
        title: "Borrow failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRepay = async () => {
    try {
      await repayLoan(
        account.toString(),
        Number(interestAmount) + Number(borrowedAmount)
      );
      if (!loading && !Error) {
        toast({
          title: "Repayment successful",
          description: `You have successfully repaid ${borrowedAmount} BTC`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchUserData();
      }
    } catch (error) {
      toast({
        title: "Repayment failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const borrowPercentage =
    borrowLimit > 0 ? ((borrowedAmount / borrowLimit) * 100).toFixed(2) : 0;

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} align="stretch">
        <Heading as="h2" size="xl" textAlign="center">
          Borrowing Dashboard
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Stat
            bg={bgColor}
            borderRadius="lg"
            boxShadow="md"
            p={5}
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="lg">Your Collateral</StatLabel>
            <StatNumber fontSize="3xl">{userCollateral} USD</StatNumber>
            <StatHelpText>Total deposited</StatHelpText>
          </Stat>

          <Stat
            bg={bgColor}
            borderRadius="lg"
            boxShadow="md"
            p={5}
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="lg">Borrow Limit</StatLabel>
            <StatNumber fontSize="3xl">{borrowLimit} BTC</StatNumber>
            <StatHelpText>80% of collateral</StatHelpText>
          </Stat>

          <Stat
            bg={bgColor}
            borderRadius="lg"
            boxShadow="md"
            p={5}
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="lg">Available to Borrow</StatLabel>
            <StatNumber fontSize="3xl">{availableToBorrow} BTC</StatNumber>
            <StatHelpText>Remaining borrow limit</StatHelpText>
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
          <VStack spacing={4} align="stretch">
            <Text fontSize="xl" fontWeight="bold">
              Your Borrowed Amount
            </Text>
            <HStack justify="space-between">
              <VStack align="start">
                <Text>Borrowed: {borrowedAmount} BTC</Text>
                <Text>Interest: {interestAmount} BTC</Text>
                <Text fontWeight="bold">
                  Total to Repay:{" "}
                  {(Number(borrowedAmount) + Number(interestAmount)).toFixed(2)}{" "}
                  BTC
                </Text>
              </VStack>
              <Button colorScheme="red" onClick={handleRepay}>
                Repay Loan
              </Button>
            </HStack>
            <Text mb={2}>Borrow Utilization</Text>
            <Progress
              value={borrowPercentage}
              colorScheme="blue"
              height="32px"
              borderRadius="md"
            />
            <Text textAlign="right">{borrowPercentage}%</Text>
          </VStack>
        </Box>

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
              Stake or Withdraw Collateral
            </Text>
            <InputGroup size="lg">
              <Input
                type="number"
                value={collateral}
                onChange={(e) => setCollateral(e.target.value)}
                placeholder="Amount in USD"
              />
              <InputRightAddon children="USD" />
            </InputGroup>
            <HStack width="100%">
              <Button
                colorScheme="blue"
                onClick={handleDepositCollateral}
                flex={1}
              >
                Stake
              </Button>
              <Button
                colorScheme="red"
                onClick={handleWithdrawCollateral}
                flex={1}
              >
                Withdraw
              </Button>
            </HStack>
          </VStack>
        </Box>

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
              Borrow BTC
            </Text>
            <InputGroup size="lg">
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Amount in BTC"
              />
              <InputRightAddon children="BTC" />
            </InputGroup>
            <Button colorScheme="blue" onClick={handleBorrow} width="100%">
              Borrow BTC
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
