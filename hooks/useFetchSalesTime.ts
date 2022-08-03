import { useState, useEffect, useContext } from 'react';
import envConfig from '../utils/envConfig';
import { Web3Context } from '../context/web3Context';
import { getContract } from '../utils/contracts';
import useNetwork from './useNetwork';
import ResponseCodeEnum from '../utils/constants/responseCode';

interface IData {
  stage: number;
}

const useFetchSalesTime = () => {
  const { appState: Web3State } = useContext(Web3Context);
  const {
    rightNetwork,
    loading: checkingNetwork,
    error: networkError,
    checkNetworkName,
  } = useNetwork();

  const [data, setData] = useState<IData>({
    stage: 0,
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
          stage: 0,
        });
        setError('Contract does not exist.');
        return;
      }

      const contract = NFTContract.connect(Web3State.provider);

      const stage = await contract.stage();

      setData({
        stage: Number(stage),
      });

      setResponseCode(ResponseCodeEnum.SUCCESS);
    } catch (error) {
      console.log('Error from fetchSalesTime', error);
      setData({
        stage: 0,
      });
      setError(
        'Something went wrong with fetching sales time. Please refresh the page.'
      );
      setResponseCode(ResponseCodeEnum.INTERNAL_SERVER_ERROR);
    }
    setLoading(false);
    return;
  };

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

  return { data, error, responseCode, loading, fetchData };
};

export default useFetchSalesTime;
