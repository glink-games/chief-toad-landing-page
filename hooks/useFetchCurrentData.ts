import { useState, useEffect, useContext } from 'react';
import { ethers, utils } from 'ethers';
import envConfig from '../utils/envConfig';
import { getContract, getWsContract } from '../utils/contracts';
import useNetwork from './useNetwork';
import { Web3Context } from '../context/web3Context';
import ResponseCodeEnum from '../utils/constants/responseCode';

export interface IData {
  currentSupply: number;
  totalSupply: number;
  communityMaxSupply: number;

  communityPrice: string;
  publicPrice: string;
  whitelistPrice: string;
  rizardPrice: string;

  communityMaxMintPerWallet: number;
  whitelistMaxMintPerWallet: number;
  rizardMaxMintPerWallet: number;
  publicMaxMintPerWallet: number;

  devMintCount: number;
}

const useFetchCurrentData = () => {
  const { appState: Web3State } = useContext(Web3Context);

  const {
    rightNetwork,
    loading: checkingNetwork,
    error: networkError,
    checkNetworkName,
  } = useNetwork();

  const [data, setData] = useState<IData>({
    currentSupply: 0,
    totalSupply: 10000,
    communityPrice: '0',
    publicPrice: '0',
    whitelistPrice: '0',
    rizardPrice: '0',
    communityMaxMintPerWallet: 0,
    whitelistMaxMintPerWallet: 0,
    rizardMaxMintPerWallet: 0,
    communityMaxSupply: 5000,
    publicMaxMintPerWallet: 0,
    devMintCount: 0,
  });
  const [error, setError] = useState<string>('');
  const [responseCode, setResponseCode] = useState<number>(
    ResponseCodeEnum.NOT_CALLED
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const chainId = checkNetworkName();
      const NFTContract = getContract(envConfig.CONTRACT_NAME, chainId);

      if (!NFTContract) {
        setData({
          currentSupply: 0,
          totalSupply: 10000,
          communityPrice: '0',
          publicPrice: '0',
          whitelistPrice: '0',
          rizardPrice: '0',
          communityMaxMintPerWallet: 0,
          whitelistMaxMintPerWallet: 0,
          rizardMaxMintPerWallet: 0,
          communityMaxSupply: 5000,
          publicMaxMintPerWallet: 0,
          devMintCount: 0,
        });
        setError('Contract does not exist.');
        return;
      }

      if (!Web3State.provider) {
        setData({
          currentSupply: 0,
          totalSupply: 10000,
          communityPrice: '0',
          publicPrice: '0',
          whitelistPrice: '0',
          rizardPrice: '0',
          communityMaxMintPerWallet: 0,
          whitelistMaxMintPerWallet: 0,
          rizardMaxMintPerWallet: 0,
          communityMaxSupply: 5000,
          publicMaxMintPerWallet: 0,
          devMintCount: 0,
        });
        setError('Provider does not exist.');
        return;
      }

      const contract = NFTContract.connect(Web3State.provider);
      const currentSupply = await contract.totalSupply();
      const totalSupply = await contract.totalMaxSupply();

      const communityPrice = await contract.communityMintPrice();
      const publicPrice = await contract.publicMintPrice();
      const whitelistPrice = await contract.whitelistMintPrice();
      const rizardPrice = await contract.rizardMintPrice();

      const communityMaxMintPerWallet =
        await contract.communityMintMaxPerWallet();
      const whitelistMaxMintPerWallet =
        await contract.whitelistMintMaxPerWallet();
      const rizardMaxMintPerWallet = await contract.rizardMintMaxPerWallet();
      const publicMaxMintPerWallet = await contract.publicMintMaxPerWallet();

      const communityMaxSupply = await contract.communityMintMaxSupply();

      const devMintCount = await contract.devMintCount();

      console.log(`Collection Data from SC ${envConfig.CONTRACT_ADDRESS}`, {
        currentSupply: Number(currentSupply),
        totalSupply: Number(totalSupply),
        communityPrice: utils.formatEther(communityPrice.toString()),
        publicPrice: utils.formatEther(publicPrice.toString()),
        whitelistPrice: utils.formatEther(whitelistPrice.toString()),
        rizardPrice: utils.formatEther(rizardPrice.toString()),
        communityMaxMintPerWallet: Number(communityMaxMintPerWallet),
        whitelistMaxMintPerWallet: Number(whitelistMaxMintPerWallet),
        rizardMaxMintPerWallet: Number(rizardMaxMintPerWallet),
        communityMaxSupply: Number(communityMaxSupply),
        publicMaxMintPerWallet: Number(publicMaxMintPerWallet),
        devMintCount: Number(devMintCount),
      });
      setData({
        currentSupply: Number(currentSupply),
        totalSupply: Number(totalSupply),
        communityPrice: utils.formatEther(communityPrice.toString()),
        publicPrice: utils.formatEther(publicPrice.toString()),
        whitelistPrice: utils.formatEther(whitelistPrice.toString()),
        rizardPrice: utils.formatEther(rizardPrice.toString()),
        communityMaxMintPerWallet: Number(communityMaxMintPerWallet),
        whitelistMaxMintPerWallet: Number(whitelistMaxMintPerWallet),
        rizardMaxMintPerWallet: Number(rizardMaxMintPerWallet),
        communityMaxSupply: Number(communityMaxSupply),
        publicMaxMintPerWallet: Number(publicMaxMintPerWallet),
        devMintCount: Number(devMintCount),
      });
      setResponseCode(ResponseCodeEnum.SUCCESS);
      setError('');
    } catch (error) {
      console.log('Error from fetchCurrentData', error);
      setData({
        currentSupply: 0,
        totalSupply: 0,
        communityPrice: '0',
        publicPrice: '0',
        whitelistPrice: '0',
        rizardPrice: '0',
        communityMaxMintPerWallet: 0,
        whitelistMaxMintPerWallet: 0,
        rizardMaxMintPerWallet: 0,
        communityMaxSupply: 0,
        publicMaxMintPerWallet: 0,
        devMintCount: 0,
      });
      setError('Something went wrong. Please refresh the page.');
      setResponseCode(ResponseCodeEnum.INTERNAL_SERVER_ERROR);
    }
    setLoading(false);
    return;
  };

  const fetchLatestSupply = async () => {
    try {
      const chainId = checkNetworkName();
      const NFTContract = getContract(envConfig.CONTRACT_NAME, chainId);

      if (!NFTContract) {
        setData({
          ...data,
          currentSupply: 0,
        });
        setError('Contract does not exist.');
        return;
      }

      if (!Web3State.provider) {
        setData({
          ...data,
          currentSupply: 0,
        });
        setError('Provider does not exist.');
        return;
      }

      const contract = NFTContract.connect(Web3State.provider);

      const currentSupply = await contract.totalSupply();

      setData({
        ...data,
        currentSupply: Number(currentSupply),
      });
    } catch (error) {
      console.log('Error from fetchLatestSupply', error);
      setData({
        ...data,
        currentSupply: 0,
      });
      setError('Something went wrong. Please refresh the page.');
      setResponseCode(ResponseCodeEnum.INTERNAL_SERVER_ERROR);
    }
  };

  // const fetchLatestSupply = async (contract: ethers.Contract) => {
  //   try {
  //     const currentSupply = await contract.totalSupply();

  //     setData({
  //       ...data,
  //       currentSupply: Number(currentSupply),
  //     });
  //   } catch (error) {
  //     console.log('Error from fetchLatestSupply', error);
  //     setData({
  //       ...data,
  //       currentSupply: 0,
  //     });
  //     setError('Something went wrong. Please refresh the page.');
  //     setResponseCode(ResponseCodeEnum.INTERNAL_SERVER_ERROR);
  //   }
  // };

  useEffect(() => {
    if (
      envConfig.CONTRACT_DEPLOYED &&
      !networkError &&
      !checkingNetwork &&
      Web3State.provider
    ) {
      fetchData();
    }
  }, [networkError, checkingNetwork, Web3State.provider]);

  // useEffect(() => {
  //   if (envConfig.CONTRACT_DEPLOYED) {
  //     var wsProvider;

  //     const chainId = checkNetworkName();

  //     switch (chainId) {
  //       case 31337:
  //         wsProvider = new ethers.providers.WebSocketProvider(
  //           'ws://localhost:8545'
  //         );
  //         break;
  //       case 4:
  //         wsProvider = new ethers.providers.WebSocketProvider(
  //           `wss://rinkeby.infura.io/ws/v3/${envConfig.INFURA_ID}`,
  //           'rinkeby'
  //         );
  //         break;
  //       case 1:
  //         wsProvider = new ethers.providers.WebSocketProvider(
  //           `wss://mainnet.infura.io/ws/v3/${envConfig.INFURA_ID}`,
  //           'mainnet'
  //         );
  //         break;
  //       default:
  //         break;
  //     }

  //     if (!wsProvider) return;

  //     const contract = getWsContract(
  //       envConfig.CONTRACT_NAME,
  //       chainId,
  //       wsProvider
  //     );

  //     if (!contract) return;

  //     contract.on('Transfer', async (from, to, value, event) => {
  //       fetchLatestSupply(contract);
  //     });
  //   }
  // }, []);

  return { data, error, responseCode, loading, fetchData, fetchLatestSupply };
};

export default useFetchCurrentData;
