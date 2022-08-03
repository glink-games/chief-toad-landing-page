import { useEffect, useState } from 'react';
import envConfig from '../utils/envConfig';
import { Contract } from 'ethers';
import { getContract } from '../utils/contracts';

import useNetwork from './useNetwork';

const useContract = () => {
  const { rightNetwork, checkNetworkName } = useNetwork();
  const [contract, setContract] = useState<Contract>();

  const initialFunc = () => {
    const networkName = checkNetworkName();
    const NFTContract = getContract(envConfig.CONTRACT_NAME, networkName);
    setContract(NFTContract);
  };

  useEffect(() => {
    initialFunc();
  }, []);

  return { contract };
};

export default useContract;
