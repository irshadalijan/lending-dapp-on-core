// Web3Context.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import LoanPlatformABI from './ABI/CoreLoanPlatform.json';
import BitcoinABI from './ABI/Bitcoin.json';
import USDABI from './ABI/Bitcoin.json';
import {useToast} from '@chakra-ui/react';

const Web3Context = createContext();

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [tUSDT, setUSDT] = useState(null);
  const [tBTC, setBTC] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const toast = useToast();

  const contractAddress = process.env.REACT_APP_DAPP_ADDRESS;
  const usdtAddress = process.env.REACT_APP_USD_ADDRESS;
  const BTCAddress = process.env.REACT_APP_BTC_ADDRESS;

  useEffect(() => {
    if (window.ethereum) {
      const providerInstance = new ethers.BrowserProvider(window.ethereum);
      setProvider(providerInstance);
    }
  }, []);

  const connectToMetaMask = async () => {
    try {
      setError(false);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signerInstance = await provider.getSigner();
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const chainID = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainID != "0x45b") {
        alert('Please Connect to Core Testnet')
      }
      const instance = new ethers.Contract(contractAddress, LoanPlatformABI.abi, signerInstance);
      const usdtInstance = new ethers.Contract(usdtAddress, USDABI.abi, signerInstance);
      const BTCInstance = new ethers.Contract(BTCAddress, BitcoinABI.abi, signerInstance);
      setUSDT(usdtInstance);
      setBTC(BTCInstance);
      setSigner(signerInstance);
      setContract(instance);
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error(error);
      setError(true);
      toast({
        title: "Connecting to Metamask failed",
        description: error.reason,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const disconnectFromMetaMask = () => {
    setAccount('');
    setIsConnected(false);
  };

  const depositCollateral = async (amount) => {
    try {
      setError(false);
      setLoading(true);
      await tUSDT.approve(contractAddress, ethers.parseUnits(amount.toString(), "ether"));
      const tx = await contract.depositCollateral(ethers.parseUnits(amount.toString(), "ether"));
      await tx.wait()
      console.log(`Deposit Collateral: https://scan.test.btcs.network/tx/${tx.hash}`);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      toast({
        title: "Depositing collateral failed",
        description: error.reason,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const withdrawCollateral = async (amount) => {
    try {
      setError(false);
      setLoading(true);
      const tx = await contract.withdrawCollateral(ethers.parseUnits(amount.toString(), "ether"));
      await tx.wait()
      console.log(`Withdraw Collateral: https://scan.test.btcs.network/tx/${tx.hash}`);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      toast({
        title: "Withdrawing collateral failed",
        description: error.reason,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const borrowBTC = async (amount) => {
    try {
      setError(false);
      setLoading(true);
      const tx = await contract.borrowBTC(ethers.parseUnits(amount.toString(), "ether"));
      await tx.wait()
      console.log(`Borrowed BTC: https://scan.test.btcs.network/tx/${tx.hash}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      toast({
        title: "Borrowing BTC failed",
        description: error.reason,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const repayLoan = async (user, amount) => {
    try {
      setError(false);
      setLoading(true);
      await tBTC.approve(contractAddress, ethers.parseUnits(amount.toString(), "ether"))
      const tx = await contract.repayLoan(user);
      await tx.wait()
      console.log(`Loan Repayed: https://scan.test.btcs.network/tx/${tx.hash}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      toast({
        title: "Repaying loan failed",
        description: error.reason,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const depositBTC = async (amount) => {
    try {
      setError(false);
      setLoading(true);
      await tBTC.approve(contractAddress, ethers.parseUnits(amount.toString(), "ether"))
      const tx = await contract.depositBTC(ethers.parseUnits(amount.toString(), "ether"));
      await tx.wait()
      console.log(`Deposited BTC: https://scan.test.btcs.network/tx/${tx.hash}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      toast({
        title: "Depositing BTC failed",
        description: error.reason,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const withdrawBTC = async (amount) => {
    try {
      setError(false);
      setLoading(true);
      const tx = await contract.withdrawBTC(ethers.parseUnits(amount.toString(), "ether"));
      await tx.wait()
      console.log(`Withdraw BTC: https://scan.test.btcs.network/tx/${tx.hash}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      toast({
        title: "Withdrawing BTC failed",
        description: error.reason,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Web3Context.Provider value={{ ethers, account, isConnected, connectToMetaMask, disconnectFromMetaMask, loading, contract, depositCollateral, withdrawCollateral, borrowBTC, repayLoan, depositBTC, withdrawBTC, tBTC, tUSDT, Error}}>
      {children}
    </Web3Context.Provider>
  );
};
