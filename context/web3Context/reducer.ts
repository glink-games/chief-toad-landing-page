/* eslint-disable no-case-declarations */
import {
  SET_WEB3_PROVIDER,
  SET_ADDRESS,
  RESET_WEB3_PROVIDER,
} from '../actionType';
import { InitialAppContextState, IAppContextState } from '.';

export interface IAction {
  type:
    | typeof SET_WEB3_PROVIDER
    | typeof SET_ADDRESS
    | typeof RESET_WEB3_PROVIDER;
  value: any;
}

const Web3Reducer = (
  state: IAppContextState,
  action: IAction
): IAppContextState => {
  switch (action.type) {
    case SET_WEB3_PROVIDER:
      return {
        ...state,
        userOnChainId: action.value.userOnChainId,
        provider: action.value.provider,
        address: action.value.address,
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.value.address,
      };
    case RESET_WEB3_PROVIDER:
      return InitialAppContextState;
    default:
      return state;
  }
};

export default Web3Reducer;
