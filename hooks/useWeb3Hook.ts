import { useContext } from 'react';
import { Web3Context } from '../context/web3Context';
import { ethers } from 'ethers';

import { SET_WEB3_PROVIDER } from '../context/actionType';

const useWeb3Hook = () => {
  const { appDispatch } = useContext(Web3Context);

  const onConnect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      appDispatch({
        type: SET_WEB3_PROVIDER,
        value: {
          userOnChainId: Number(chainId),
          provider,
          address,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { onConnect };
};

export default useWeb3Hook;
