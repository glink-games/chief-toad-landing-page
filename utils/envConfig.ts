const envConfig = {
  MAINNET: process.env.NEXT_PUBLIC_MAINNET === 'true' ? true : false,
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
  MINT_OVER: process.env.NEXT_PUBLIC_MINT_OVER === 'true' ? true : false,
  CONTRACT_DEPLOYED:
    process.env.NEXT_PUBLIC_CONTRACT_DEPLOYED === 'true' ? true : false,
  INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID || '',
  CONTRACT_NAME: process.env.NEXT_PUBLIC_CONTRACT_NAME || '',
  API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  MINT_URL: process.env.NEXT_PUBLIC_MINT_URL || '',
};

export default envConfig;
