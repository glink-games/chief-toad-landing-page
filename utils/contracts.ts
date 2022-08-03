import chainMap from './constants/chains';
import { ethers } from 'ethers';
import envConfig from '../utils/envConfig';

/**
 * Gets Deployed Contract from block chain folder
 * @param {*} contractName
 * @param {*} chainId
 * @returns Contract
 */
export const getContract = (contractName: string, chainId: number) => {
  let chain = chainMap[chainId];

  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

  try {
    /* eslint-disable global-require */
    const contract = require(`../contracts/${chain}/${contractName}.json`);
    /* eslint-enable global-require */
    return new ethers.Contract(
      envConfig.CONTRACT_ADDRESS,
      contract.abi,
      undefined
    );
  } catch (error) {
    console.error('Contract does not exist!');
  }
};

export const getWsContract = (
  contractName: string,
  chainId: number,
  wsProvider: any
) => {
  let chain = chainMap[chainId];

  if (!envConfig.CONTRACT_ADDRESS || !envConfig.CONTRACT_DEPLOYED) return;

  try {
    /* eslint-disable global-require */
    const contract = require(`../contracts/${chain}/${contractName}.json`);
    /* eslint-enable global-require */
    return new ethers.Contract(
      envConfig.CONTRACT_ADDRESS,
      contract.abi,
      wsProvider
    );
  } catch (error) {
    console.error('WsContract does not exist!');
  }
};
