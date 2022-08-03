import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import AnimationContextProvider from '../context/animationContext';
import Web3ContextProvider from '../context/web3Context';

// For Web3 Provider
const getLibrary = (provider: any) => {
  return new Web3(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ContextProvider>
        <AnimationContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AnimationContextProvider>
      </Web3ContextProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
