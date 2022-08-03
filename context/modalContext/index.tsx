import React, { Dispatch, createContext, useReducer } from 'react';
import AppReducer, { IAction } from './reducer';

interface IResult {
  ok: boolean;
  txnReceipt: string;
  error: string;
}

export const defaultResult: IResult = {
  ok: false,
  txnReceipt: '',
  error: '',
};

export interface IAppContextState {
  toggleMintingModal: boolean;
  toggleWelcomeModal: boolean;
  mintingResult: IResult;
}

export interface InitialContextProps {
  appState: IAppContextState;
  appDispatch: Dispatch<IAction>;
}

const InitialAppContextState: IAppContextState = {
  toggleMintingModal: false,
  toggleWelcomeModal: true,
  mintingResult: defaultResult,
};

export const ModalContext = createContext({} as InitialContextProps);

const ModalContextProvider: React.FC = ({ children }) => {
  const [appState, appDispatch] = useReducer(
    AppReducer,
    InitialAppContextState
  );

  return (
    <ModalContext.Provider value={{ appState, appDispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
