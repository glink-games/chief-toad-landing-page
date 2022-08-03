import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected as MetamaskConnector } from '../connectors';
import useWeb3Hook from './useWeb3Hook';

export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();
  const { onConnect } = useWeb3Hook();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    MetamaskConnector.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(MetamaskConnector, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      onConnect();
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};

export const useInactiveListener = (suppress: boolean = false) => {
  const { active, error, activate } = useWeb3React();
  const { onConnect } = useWeb3Hook();

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = async () => {
        console.log("Handling 'connect' event");
        activate(MetamaskConnector);
        await onConnect();
      };

      ethereum.on('connect', handleConnect);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
        }
      };
    }
  }, [active, error, suppress, activate]);
};
