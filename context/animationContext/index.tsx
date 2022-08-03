import React, { Dispatch, createContext, useReducer } from 'react';
import AppReducer, { IAction } from './reducer';

export interface IAppContextState {
  animationTriggered: boolean;
}

export interface InitialContextProps {
  appState: IAppContextState;
  appDispatch: Dispatch<IAction>;
}

const InitialAppContextState: IAppContextState = {
  animationTriggered: false,
};

export const AnimationContext = createContext({} as InitialContextProps);

const AnimationContextProvider: React.FC = ({ children }) => {
  const [appState, appDispatch] = useReducer(
    AppReducer,
    InitialAppContextState
  );

  return (
    <AnimationContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationContextProvider;
