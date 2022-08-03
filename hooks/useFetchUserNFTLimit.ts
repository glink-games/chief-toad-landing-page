import { useState, useEffect, useContext } from 'react';
import envConfig from '../utils/envConfig';
import { getContract } from '../utils/contracts';
import { Web3Context } from '../context/web3Context';
import useNetwork from './useNetwork';

interface IData {
  communityMintedAmount: number;
  whitelistMintedAmount: number;
  rizardMintedAmount: number;
  publicMintedAmout: number;
}

const useFetchUserNFTLimit = (account: string | null | undefined) => {
  const { appState: Web3State } = useContext(Web3Context);

  const {
    rightNetwork,
    loading: checkingNetwork,
    error: networkError,
    checkNetworkName,
  } = useNetwork();

  const [data, setData] = useState<IData>({
    communityMintedAmount: 0,
    whitelistMintedAmount: 0,
    rizardMintedAmount: 0,
    publicMintedAmout: 0,
  });
  const [error, setError] = useState<string>('');
  const [responseCode, setResponseCode] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const chainId = checkNetworkName();
      const NFTContract = getContract(envConfig.CONTRACT_NAME, chainId);

      if (!account) {
        setData({
          communityMintedAmount: 0,
          whitelistMintedAmount: 0,
          rizardMintedAmount: 0,
          publicMintedAmout: 0,
        });
        setError('User has yet to connect wallet.');
        return;
      }

      if (!NFTContract) {
        setData({
          communityMintedAmount: 0,
          whitelistMintedAmount: 0,
          rizardMintedAmount: 0,
          publicMintedAmout: 0,
        });
        setError('Contract does not exist.');
        return;
      }

      if (!Web3State.provider) {
        setData({
          communityMintedAmount: 0,
          whitelistMintedAmount: 0,
          rizardMintedAmount: 0,
          publicMintedAmout: 0,
        });
        setError('Provider does not exist.');
        return;
      }

      const contract = NFTContract.connect(Web3State.provider);
      const communityMintedAmount = await contract.communityMintCount(account);
      const whitelistMintedAmount = await contract.whitelistMintCount(account);
      const rizardMintedAmount = await contract.rizardMintCount(account);
      const publicMintedAmount = await contract.publicMintCount(account);

      console.log(`User Minted Data from SC ${envConfig.CONTRACT_ADDRESS}`, {
        communityMintedAmount: Number(communityMintedAmount),
        whitelistMintedAmount: Number(whitelistMintedAmount),
        rizardMintedAmount: Number(rizardMintedAmount),
        publicMintedAmout: Number(publicMintedAmount),
      });

      setData({
        communityMintedAmount: Number(communityMintedAmount),
        whitelistMintedAmount: Number(whitelistMintedAmount),
        rizardMintedAmount: Number(rizardMintedAmount),
        publicMintedAmout: Number(publicMintedAmount),
      });
    } catch (error) {
      console.log('Error from fetchUserNFTLimit', error);
      setData({
        communityMintedAmount: 0,
        whitelistMintedAmount: 0,
        rizardMintedAmount: 0,
        publicMintedAmout: 0,
      });
      setError(
        'Something went wrong with fetching user minting limits. Please refresh the page.'
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      envConfig.CONTRACT_DEPLOYED &&
      !networkError &&
      !checkingNetwork &&
      account &&
      Web3State.provider
    ) {
      fetchData();
    }
  }, [networkError, checkingNetwork, account, Web3State.provider]);

  return { data, error, responseCode, loading, fetchData };
};

export default useFetchUserNFTLimit;
