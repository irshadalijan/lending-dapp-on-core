// pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../Web3Context';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export const Home = () => {
  const { contract, ethers, Error } = useWeb3();
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalBorrowed, setTotalBorrowed] = useState(0);
  const [stakedChange, setStakedChange] = useState(0);
  const [borrowedChange, setBorrowedChange] = useState(0);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (contract) {
      const fetchTotals = async () => {
        try {
          const newTotalStaked = ethers.formatUnits(await contract.getTotalStaked(), 18);
          const newTotalBorrowed = ethers.formatUnits(await contract.getTotalBorrowed(), 18);

          setStakedChange(((newTotalStaked - totalStaked) / totalStaked).toFixed(2) * 100);
          setBorrowedChange(((newTotalBorrowed - totalBorrowed) / totalBorrowed).toFixed(2) * 100);
          
          setTotalStaked(newTotalStaked);
          setTotalBorrowed(newTotalBorrowed);

          } catch (error) {
          if (error.code === 'CALL_EXCEPTION') {
            console.log('Transaction reverted without a reason');
          } else {
            console.error('Error:', error);
          }
        }
      };
      fetchTotals();
      // Set up an interval to fetch data every 30 seconds
      const interval = setInterval(fetchTotals, 30000);
      return () => clearInterval(interval);
    }
  }, [contract]);

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} align="stretch">
        <Heading as="h2" size="xl" textAlign="center">
          Overview
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Stat
            bg={bgColor}
            borderRadius="lg"
            boxShadow="md"
            p={5}
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="lg">Total Staked</StatLabel>
            <StatNumber fontSize="3xl">{totalStaked.toLocaleString()} BTC</StatNumber>
            <StatHelpText>
              <StatArrow type={stakedChange >= 0 ? 'increase' : 'decrease'} />
              {Math.abs(stakedChange).toFixed(2)}%
            </StatHelpText>
          </Stat>
          
          <Stat
            bg={bgColor}
            borderRadius="lg"
            boxShadow="md"
            p={5}
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="lg">Total Borrowed</StatLabel>
            <StatNumber fontSize="3xl">{totalBorrowed.toLocaleString()} BTC</StatNumber>
            <StatHelpText>
              <StatArrow type={borrowedChange >= 0 ? 'increase' : 'decrease'} />
              {Math.abs(borrowedChange).toFixed(2)}%
            </StatHelpText>
          </Stat>
        </SimpleGrid>

        <Box textAlign="center">
          <Text fontSize="xl" mb={4}>
            Ready to get started? Choose an option below:
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Link to="/lending" style={{ textDecoration: 'none' }}>
              <Button
                colorScheme="blue"
                size="lg"
                width="100%"
                rightIcon={<ArrowForwardIcon />}
              >
                Start Lending
              </Button>
            </Link>
            <Link to="/borrowing" style={{ textDecoration: 'none' }}>
              <Button
                colorScheme="green"
                size="lg"
                width="100%"
                rightIcon={<ArrowForwardIcon />}
              >
                Start Borrowing
              </Button>
            </Link>
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};